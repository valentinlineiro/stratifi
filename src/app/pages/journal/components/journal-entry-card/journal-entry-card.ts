import { Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SwipeDeleteDirective } from '../../../../shared/directives/swipe-delete.directive';
import { I18nService } from '../../../../core/i18n/i18n.service';
import type { JournalEntry } from '../../../../core/db/database';

export interface EnrichedEntry {
  entry: JournalEntry;
  decisionTitle: string;
  scenarioTitle: string | null;
}

const REGRET_EMOJIS = ['', '😊', '🙂', '😐', '😕', '😔'];
const REGRET_KEYS = ['', 'none', 'minor', 'mixed', 'regret', 'strong'] as const;

@Component({
  selector: 'app-journal-entry-card',
  imports: [DatePipe, SwipeDeleteDirective],
  templateUrl: './journal-entry-card.html',
  styleUrl: './journal-entry-card.scss',
})
export class JournalEntryCardComponent {
  private readonly i18n = inject(I18nService);
  data = input.required<EnrichedEntry>();
  delete = output<string>();

  regretEmoji(score: number): string { return REGRET_EMOJIS[score] ?? ''; }
  regretLabel(score: number): string {
    const key = REGRET_KEYS[score];
    return key ? this.i18n.t().regret[key] : '';
  }
}
