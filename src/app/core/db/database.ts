import Dexie, { type EntityTable } from 'dexie';

export interface Decision {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'decided' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface Scenario {
  id: string;
  decisionId: string;
  title: string;
  notes: string;
  outcomes: Record<string, number>;
  confidence: number;
  createdAt: Date;
}

export interface JournalEntry {
  id: string;
  decisionId: string;
  chosenScenarioId: string | null;
  reflection: string;
  regretScore: number | null;
  actualOutcomes: Record<string, number>;
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

    this.version(2).stores({
      decisions: 'id, createdAt, status',
      scenarios: 'id, decisionId, createdAt',
      journal: 'id, decisionId, createdAt',
    }).upgrade(tx => Promise.all([
      tx.table('decisions').toCollection().modify({ status: 'active' }),
      tx.table('scenarios').toCollection().modify({ confidence: 50 }),
      tx.table('journal').toCollection().modify({ regretScore: null, actualOutcomes: {} }),
    ]));
  }
}

export const db = new StratifiDB();
