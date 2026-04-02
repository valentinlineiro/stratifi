import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OUTCOME_AXES } from '../../../../core/constants/outcome-axes';
import { I18nService } from '../../../../core/i18n/i18n.service';
import type { Decision, Scenario } from '../../../../core/db/database';

const REGRET_SCORES = [
  { score: 1, emoji: '😊', key: 'none'   },
  { score: 2, emoji: '🙂', key: 'minor'  },
  { score: 3, emoji: '😐', key: 'mixed'  },
  { score: 4, emoji: '😕', key: 'regret' },
  { score: 5, emoji: '😔', key: 'strong' },
] as const;

@Component({
  selector: 'app-new-entry-sheet',
  imports: [FormsModule],
  templateUrl: './new-entry-sheet.html',
  styleUrl: './new-entry-sheet.scss',
})
export class NewEntrySheetComponent implements OnInit {
  decisions = input.required<Decision[]>();
  scenarios = input.required<Scenario[]>();
  preselectedDecisionId = input('');
  confirm = output<{
    decisionId: string;
    reflection: string;
    chosenScenarioId: string | null;
    regretScore: number | null;
    actualOutcomes: Record<string, number>;
  }>();
  cancel = output<void>();

  readonly t = inject(I18nService).t;
  readonly axes = OUTCOME_AXES;
  readonly scores = [1, 2, 3, 4, 5];
  readonly regretScores = REGRET_SCORES;
  readonly regretOptions = computed(() =>
    REGRET_SCORES.map(r => ({ ...r, label: this.t().regret[r.key] }))
  );

  decisionId = signal('');
  scenarioId = signal('');
  reflection = signal('');
  regretScore = signal<number | null>(null);
  actualOutcomes = signal<Record<string, number>>({});

  readonly availableScenarios = computed(() =>
    this.scenarios().filter(s => s.decisionId === this.decisionId())
  );

  ngOnInit(): void {
    if (this.preselectedDecisionId()) this.decisionId.set(this.preselectedDecisionId());
  }

  onDecisionChange(id: string): void {
    this.decisionId.set(id);
    this.scenarioId.set('');
  }

  setActualOutcome(key: string, value: number): void {
    this.actualOutcomes.update(o => ({ ...o, [key]: value }));
  }

  get isValid(): boolean {
    return !!this.decisionId().trim() && !!this.reflection().trim();
  }

  submit(): void {
    if (!this.isValid) return;
    this.confirm.emit({
      decisionId: this.decisionId(),
      reflection: this.reflection(),
      chosenScenarioId: this.scenarioId() || null,
      regretScore: this.regretScore(),
      actualOutcomes: this.actualOutcomes(),
    });
    this.decisionId.set('');
    this.scenarioId.set('');
    this.reflection.set('');
    this.regretScore.set(null);
    this.actualOutcomes.set({});
  }
}
