import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OUTCOME_AXES } from '../../../../core/constants/outcome-axes';
import { I18nService } from '../../../../core/i18n/i18n.service';
import type { Decision } from '../../../../core/db/database';

@Component({
  selector: 'app-new-scenario-sheet',
  imports: [FormsModule],
  templateUrl: './new-scenario-sheet.html',
  styleUrl: './new-scenario-sheet.scss',
})
export class NewScenarioSheetComponent implements OnInit {
  readonly t = inject(I18nService).t;
  decisions = input.required<Decision[]>();
  preselectedDecisionId = input('');
  confirm = output<{ decisionId: string; title: string; notes: string; outcomes: Record<string, number>; confidence: number }>();
  cancel = output<void>();

  readonly axes = OUTCOME_AXES;
  readonly scores = [1, 2, 3, 4, 5];

  decisionId = signal('');
  title = signal('');
  notes = signal('');
  outcomes = signal<Record<string, number>>({});
  confidence = signal(50);

  ngOnInit(): void {
    if (this.preselectedDecisionId()) this.decisionId.set(this.preselectedDecisionId());
  }

  setOutcome(key: string, value: number): void {
    this.outcomes.update(o => ({ ...o, [key]: value }));
  }

  get isValid(): boolean {
    return !!this.decisionId().trim() && !!this.title().trim();
  }

  submit(): void {
    if (!this.isValid) return;
    this.confirm.emit({
      decisionId: this.decisionId(),
      title: this.title(),
      notes: this.notes(),
      outcomes: this.outcomes(),
      confidence: this.confidence(),
    });
    this.title.set('');
    this.notes.set('');
    this.outcomes.set({});
    this.confidence.set(50);
    this.decisionId.set('');
  }
}
