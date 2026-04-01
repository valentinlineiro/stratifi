import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SwipeDeleteDirective } from '../../../../shared/directives/swipe-delete.directive';
import type { JournalEntry } from '../../../../core/db/database';

export interface EnrichedEntry {
  entry: JournalEntry;
  decisionTitle: string;
  scenarioTitle: string | null;
}

const REGRET_EMOJIS = ['', '😊', '🙂', '😐', '😕', '😔'];
const REGRET_LABELS = ['', 'No regret', 'Minor doubts', 'Mixed feelings', 'Regret it', 'Strong regret'];

@Component({
  selector: 'app-journal-entry-card',
  imports: [DatePipe, SwipeDeleteDirective],
  templateUrl: './journal-entry-card.html',
  styleUrl: './journal-entry-card.scss',
})
export class JournalEntryCardComponent {
  data = input.required<EnrichedEntry>();
  delete = output<string>();

  regretEmoji(score: number): string { return REGRET_EMOJIS[score] ?? ''; }
  regretLabel(score: number): string { return REGRET_LABELS[score] ?? ''; }
}
