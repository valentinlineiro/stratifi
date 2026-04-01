import { Component, computed, inject, signal } from '@angular/core';
import { DecisionService } from '../../core/services/decision.service';
import { ScenarioService } from '../../core/services/scenario.service';
import { JournalService } from '../../core/services/journal.service';
import { JournalEntryCardComponent, type EnrichedEntry } from './components/journal-entry-card/journal-entry-card';
import { NewEntrySheetComponent } from './components/new-entry-sheet/new-entry-sheet';

@Component({
  selector: 'app-journal',
  imports: [JournalEntryCardComponent, NewEntrySheetComponent],
  templateUrl: './journal.html',
  styleUrl: './journal.scss',
})
export class JournalPage {
  private readonly decisionService = inject(DecisionService);
  private readonly scenarioService = inject(ScenarioService);
  private readonly journalService = inject(JournalService);

  readonly decisions = this.decisionService.decisions;
  readonly scenarios = this.scenarioService.scenarios;
  readonly showSheet = signal(false);

  readonly enrichedEntries = computed<EnrichedEntry[]>(() => {
    const decisions = this.decisions();
    const scenarios = this.scenarios();
    return this.journalService.entries().map((entry) => ({
      entry,
      decisionTitle: decisions.find((d) => d.id === entry.decisionId)?.title ?? '—',
      scenarioTitle: entry.chosenScenarioId
        ? (scenarios.find((s) => s.id === entry.chosenScenarioId)?.title ?? null)
        : null,
    }));
  });

  async onAdd(data: {
    decisionId: string;
    reflection: string;
    chosenScenarioId: string | null;
    regretScore: number | null;
    actualOutcomes: Record<string, number>;
  }): Promise<void> {
    await this.journalService.add(data.decisionId, data.reflection, data.chosenScenarioId, data.regretScore, data.actualOutcomes);
    this.showSheet.set(false);
  }

  async onDelete(id: string): Promise<void> {
    await this.journalService.remove(id);
  }
}
