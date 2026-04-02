import { Component, computed, inject, signal } from '@angular/core';
import { DecisionService } from '../../core/services/decision.service';
import { DataService } from '../../core/services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { DecisionCardComponent } from './components/decision-card/decision-card';
import { NewDecisionSheetComponent } from './components/new-decision-sheet/new-decision-sheet';
import type { Decision } from '../../core/db/database';

type StatusFilter = 'all' | Decision['status'];

@Component({
  selector: 'app-decisions',
  imports: [DecisionCardComponent, NewDecisionSheetComponent],
  templateUrl: './decisions.html',
  styleUrl: './decisions.scss',
})
export class DecisionsPage {
  private readonly decisionService = inject(DecisionService);
  readonly dataService = inject(DataService);
  readonly t = inject(I18nService).t;

  readonly decisions = this.decisionService.decisions;
  readonly showSheet = signal(false);
  readonly statusFilter = signal<StatusFilter>('all');

  readonly filters = computed<{ value: StatusFilter; label: string }[]>(() => [
    { value: 'all',      label: this.t().common.all      },
    { value: 'active',   label: this.t().status.active   },
    { value: 'decided',  label: this.t().status.decided  },
    { value: 'archived', label: this.t().status.archived },
  ]);

  readonly filteredDecisions = computed(() => {
    const f = this.statusFilter();
    return f === 'all' ? this.decisions() : this.decisions().filter(d => d.status === f);
  });

  getCount(filter: StatusFilter): number {
    return filter === 'all'
      ? this.decisions().length
      : this.decisions().filter(d => d.status === filter).length;
  }

  async onAdd(data: { title: string; description: string }): Promise<void> {
    await this.decisionService.add(data.title, data.description);
    this.showSheet.set(false);
  }

  async onDelete(id: string): Promise<void> {
    await this.decisionService.remove(id);
  }

  async onImport(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      await this.dataService.import(file);
    } catch {
      alert(this.t().decisions.importError);
    }
    (event.target as HTMLInputElement).value = '';
  }
}
