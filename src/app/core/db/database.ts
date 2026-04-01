import Dexie, { type EntityTable } from 'dexie';

export interface Decision {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Scenario {
  id: string;
  decisionId: string;
  title: string;
  notes: string;
  outcomes: Record<string, unknown>;
  createdAt: Date;
}

export interface JournalEntry {
  id: string;
  decisionId: string;
  chosenScenarioId: string | null;
  reflection: string;
  createdAt: Date;
}

export class StratifiDB extends Dexie {
  decisions!: EntityTable<Decision, 'id'>;
  scenarios!: EntityTable<Scenario, 'id'>;
  journal!: EntityTable<JournalEntry, 'id'>;

  constructor() {
    super('stratifi');
    this.version(1).stores({
      decisions: 'id, createdAt',
      scenarios: 'id, decisionId, createdAt',
      journal: 'id, decisionId, createdAt',
    });
  }
}

export const db = new StratifiDB();
