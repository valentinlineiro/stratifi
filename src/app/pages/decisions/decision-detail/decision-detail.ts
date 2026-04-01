import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DecisionService } from '../../../core/services/decision.service';
import { ScenarioService } from '../../../core/services/scenario.service';
import { JournalService } from '../../../core/services/journal.service';
import { HeaderService } from '../../../core/services/header.service';
import { ScenarioCardComponent } from '../../scenarios/components/scenario-card/scenario-card';
import { NewScenarioSheetComponent } from '../../scenarios/components/new-scenario-sheet/new-scenario-sheet';
import { JournalEntryCardComponent, type EnrichedEntry } from '../../journal/components/journal-entry-card/journal-entry-card';
import { NewEntrySheetComponent } from '../../journal/components/new-entry-sheet/new-entry-sheet';

@Component({
  selector: 'app-decision-detail',
  imports: [
    DatePipe,
    ScenarioCardComponent,
    NewScenarioSheetComponent,
    JournalEntryCardComponent,
    NewEntrySheetComponent,
  ],
  templateUrl: './decision-detail.html',
  styleUrl: './decision-detail.scss',
})
export class DecisionDetailPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly header = inject(HeaderService);
  private readonly decisionService = inject(DecisionService);
  private readonly scenarioService = inject(ScenarioService);
  private readonly journalService = inject(JournalService);

  readonly decisionId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly decision = computed(() =>
    this.decisionService.decisions().find((d) => d.id === this.decisionId) ?? null
  );

  readonly scenarios = computed(() =>
    this.scenarioService.scenarios().filter((s) => s.decisionId === this.decisionId)
  );

  readonly enrichedEntries = computed<EnrichedEntry[]>(() => {
    const decision = this.decision();
    const allScenarios = this.scenarioService.scenarios();
    return this.journalService.entries()
      .filter((e) => e.decisionId === this.decisionId)
      .map((entry) => ({
        entry,
        decisionTitle: decision?.title ?? '—',
        scenarioTitle: entry.chosenScenarioId
          ? (allScenarios.find((s) => s.id === entry.chosenScenarioId)?.title ?? null)
          : null,
      }));
  });

  readonly decisions = this.decisionService.decisions;
  readonly allScenarios = this.scenarioService.scenarios;

  readonly showScenarioSheet = signal(false);
  readonly showJournalSheet = signal(false);

  ngOnInit(): void {
    const title = this.decision()?.title ?? 'Decision';
    this.header.setDetail(title);
  }

  ngOnDestroy(): void {
    this.header.reset();
  }

  async onAddScenario(data: { decisionId: string; title: string; notes: string }): Promise<void> {
    await this.scenarioService.add(data.decisionId, data.title, data.notes);
    this.showScenarioSheet.set(false);
  }

  async onDeleteScenario(id: string): Promise<void> {
    await this.scenarioService.remove(id);
  }

  async onAddEntry(data: { decisionId: string; reflection: string; chosenScenarioId: string | null }): Promise<void> {
    await this.journalService.add(data.decisionId, data.reflection, data.chosenScenarioId);
    this.showJournalSheet.set(false);
  }

  async onDeleteEntry(id: string): Promise<void> {
    await this.journalService.remove(id);
  }
}
