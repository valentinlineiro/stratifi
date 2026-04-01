import { Injectable } from '@angular/core';
import { db } from '../db/database';

@Injectable({ providedIn: 'root' })
export class DataService {
  async export(): Promise<void> {
    const [decisions, scenarios, journal] = await Promise.all([
      db.decisions.toArray(),
      db.scenarios.toArray(),
      db.journal.toArray(),
    ]);
    const payload = JSON.stringify({ decisions, scenarios, journal }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stratifi-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async import(file: File): Promise<void> {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!data.decisions || !data.scenarios || !data.journal) {
      throw new Error('Invalid backup file');
    }
    const parseDate = (v: unknown) => (v instanceof Date ? v : new Date(v as string));
    const decisions = data.decisions.map((d: any) => ({
      ...d, createdAt: parseDate(d.createdAt), updatedAt: parseDate(d.updatedAt),
    }));
    const scenarios = data.scenarios.map((s: any) => ({
      ...s, createdAt: parseDate(s.createdAt),
    }));
    const journal = data.journal.map((e: any) => ({
      ...e, createdAt: parseDate(e.createdAt),
    }));
    await db.transaction('rw', [db.decisions, db.scenarios, db.journal], async () => {
      await db.decisions.bulkPut(decisions);
      await db.scenarios.bulkPut(scenarios);
      await db.journal.bulkPut(journal);
    });
  }
}
