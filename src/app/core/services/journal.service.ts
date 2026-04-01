import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { liveQuery } from 'dexie';
import { from } from 'rxjs';
import { db, type JournalEntry } from '../db/database';

@Injectable({ providedIn: 'root' })
export class JournalService {
  readonly entries = toSignal(
    from(liveQuery(() => db.journal.orderBy('createdAt').reverse().toArray())),
    { initialValue: [] as JournalEntry[] }
  );

  async add(
    decisionId: string,
    reflection: string,
    chosenScenarioId: string | null,
    regretScore: number | null = null,
    actualOutcomes: Record<string, number> = {}
  ): Promise<void> {
    await db.journal.add({
      id: crypto.randomUUID(),
      decisionId,
      chosenScenarioId,
      reflection: reflection.trim(),
      regretScore,
      actualOutcomes,
      createdAt: new Date(),
    });
  }

  async remove(id: string): Promise<void> {
    await db.journal.delete(id);
  }
}
