import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import type { JournalEntry } from '../../../../core/db/database';

export interface EnrichedEntry {
  entry: JournalEntry;
  decisionTitle: string;
  scenarioTitle: string | null;
}

@Component({
  selector: 'app-journal-entry-card',
  imports: [DatePipe],
  templateUrl: './journal-entry-card.html',
  styleUrl: './journal-entry-card.scss',
})
export class JournalEntryCardComponent {
  data = input.required<EnrichedEntry>();
  delete = output<string>();
}
