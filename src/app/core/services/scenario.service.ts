import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { liveQuery } from 'dexie';
import { from } from 'rxjs';
import { db, type Scenario } from '../db/database';

@Injectable({ providedIn: 'root' })
export class ScenarioService {
  readonly scenarios = toSignal(
    from(liveQuery(() => db.scenarios.orderBy('createdAt').toArray())),
    { initialValue: [] as Scenario[] }
  );

  async add(decisionId: string, title: string, notes: string): Promise<void> {
    await db.scenarios.add({
      id: crypto.randomUUID(),
      decisionId,
      title: title.trim(),
      notes: notes.trim(),
      outcomes: {},
      createdAt: new Date(),
    });
  }

  async remove(id: string): Promise<void> {
    await db.scenarios.delete(id);
  }
}
