import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecisionService } from '../../../core/services/decision.service';
import { ScenarioService } from '../../../core/services/scenario.service';
import { JournalService } from '../../../core/services/journal.service';
import { HeaderService } from '../../../core/services/header.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { ScenarioCardComponent } from '../../scenarios/components/scenario-card/scenario-card';
import { NewScenarioSheetComponent } from '../../scenarios/components/new-scenario-sheet/new-scenario-sheet';
import { JournalEntryCardComponent, type EnrichedEntry } from '../../journal/components/journal-entry-card/journal-entry-card';
import { NewEntrySheetComponent } from '../../journal/components/new-entry-sheet/new-entry-sheet';
import type { Decision } from '../../../core/db/database';

@Component({
  selector: 'app-decision-detail',
  imports: [
    DatePipe,
    FormsModule,
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
  readonly t = inject(I18nService).t;
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
    this.header.setDetail(this.decision()?.title ?? 'Decision');
  }

  ngOnDestroy(): void {
    this.header.reset();
  }

  async onStatusChange(status: Decision['status']): Promise<void> {
    await this.decisionService.updateStatus(this.decisionId, status);
  }

  async onAddScenario(data: { decisionId: string; title: string; notes: string; outcomes: Record<string, number>; confidence: number }): Promise<void> {
    await this.scenarioService.add(data.decisionId, data.title, data.notes, data.outcomes, data.confidence);
    this.showScenarioSheet.set(false);
  }

  async onDeleteScenario(id: string): Promise<void> {
    await this.scenarioService.remove(id);
  }

  async onAddEntry(data: { decisionId: string; reflection: string; chosenScenarioId: string | null; regretScore: number | null; actualOutcomes: Record<string, number> }): Promise<void> {
    await this.journalService.add(data.decisionId, data.reflection, data.chosenScenarioId, data.regretScore, data.actualOutcomes);
    this.showJournalSheet.set(false);
  }

  async onDeleteEntry(id: string): Promise<void> {
    await this.journalService.remove(id);
  }
}
