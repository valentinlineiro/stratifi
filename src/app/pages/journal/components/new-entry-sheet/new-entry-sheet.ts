import { Component, computed, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Decision, Scenario } from '../../../../core/db/database';

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
  confirm = output<{ decisionId: string; reflection: string; chosenScenarioId: string | null }>();
  cancel = output<void>();

  decisionId = signal('');
  scenarioId = signal('');
  reflection = signal('');

  readonly availableScenarios = computed(() =>
    this.scenarios().filter((s) => s.decisionId === this.decisionId())
  );

  ngOnInit(): void {
    if (this.preselectedDecisionId()) {
      this.decisionId.set(this.preselectedDecisionId());
    }
  }

  onDecisionChange(id: string): void {
    this.decisionId.set(id);
    this.scenarioId.set('');
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
    });
    this.decisionId.set('');
    this.scenarioId.set('');
    this.reflection.set('');
  }
}
