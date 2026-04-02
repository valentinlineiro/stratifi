import { Component, computed, inject, signal } from '@angular/core';
import { DecisionService } from '../../core/services/decision.service';
import { ScenarioService } from '../../core/services/scenario.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { ScenarioCardComponent } from './components/scenario-card/scenario-card';
import { NewScenarioSheetComponent } from './components/new-scenario-sheet/new-scenario-sheet';

@Component({
  selector: 'app-scenarios',
  imports: [ScenarioCardComponent, NewScenarioSheetComponent],
  templateUrl: './scenarios.html',
  styleUrl: './scenarios.scss',
})
export class ScenariosPage {
  private readonly decisionService = inject(DecisionService);
  private readonly scenarioService = inject(ScenarioService);
  readonly t = inject(I18nService).t;

  readonly decisions = this.decisionService.decisions;
  readonly showSheet = signal(false);

  readonly groups = computed(() => {
    const scenarios = this.scenarioService.scenarios();
    return this.decisions()
      .map((d) => ({
        decision: d,
        scenarios: scenarios.filter((s) => s.decisionId === d.id),
      }))
      .filter((g) => g.scenarios.length > 0);
  });

  readonly totalScenarios = computed(() =>
    this.scenarioService.scenarios().length
  );

  async onAdd(data: { decisionId: string; title: string; notes: string; outcomes: Record<string, number>; confidence: number }): Promise<void> {
    await this.scenarioService.add(data.decisionId, data.title, data.notes, data.outcomes, data.confidence);
    this.showSheet.set(false);
  }

  async onDelete(id: string): Promise<void> {
    await this.scenarioService.remove(id);
  }
}
