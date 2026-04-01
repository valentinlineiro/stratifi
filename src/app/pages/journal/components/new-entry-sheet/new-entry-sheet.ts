import { Component, computed, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OUTCOME_AXES } from '../../../../core/constants/outcome-axes';
import type { Decision, Scenario } from '../../../../core/db/database';

const REGRET_OPTIONS = [
  { score: 1, emoji: '😊', label: 'None' },
  { score: 2, emoji: '🙂', label: 'Minor' },
  { score: 3, emoji: '😐', label: 'Mixed' },
  { score: 4, emoji: '😕', label: 'Regret' },
  { score: 5, emoji: '😔', label: 'Strong' },
];

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

  readonly axes = OUTCOME_AXES;
  readonly scores = [1, 2, 3, 4, 5];
  readonly regretOptions = REGRET_OPTIONS;

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
