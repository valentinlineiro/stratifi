import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { liveQuery } from 'dexie';
import { from } from 'rxjs';
import { db, type Decision } from '../db/database';

@Injectable({ providedIn: 'root' })
export class DecisionService {
  readonly decisions = toSignal(
    from(liveQuery(() => db.decisions.orderBy('createdAt').reverse().toArray())),
    { initialValue: [] as Decision[] }
  );

  async add(title: string, description: string): Promise<void> {
    await db.decisions.add({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async remove(id: string): Promise<void> {
    await db.transaction('rw', [db.decisions, db.scenarios, db.journal], async () => {
      await db.decisions.delete(id);
      await db.scenarios.where('decisionId').equals(id).delete();
      await db.journal.where('decisionId').equals(id).delete();
    });
  }
}
