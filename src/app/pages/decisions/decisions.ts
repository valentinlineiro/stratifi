import { Component, inject, signal } from '@angular/core';
import { DecisionService } from '../../core/services/decision.service';
import { DecisionCardComponent } from './components/decision-card/decision-card';
import { NewDecisionSheetComponent } from './components/new-decision-sheet/new-decision-sheet';

@Component({
  selector: 'app-decisions',
  imports: [DecisionCardComponent, NewDecisionSheetComponent],
  templateUrl: './decisions.html',
  styleUrl: './decisions.scss',
})
export class DecisionsPage {
  private readonly decisionService = inject(DecisionService);

  readonly decisions = this.decisionService.decisions;
  readonly showSheet = signal(false);

  async onAdd(data: { title: string; description: string }): Promise<void> {
    await this.decisionService.add(data.title, data.description);
    this.showSheet.set(false);
  }

  async onDelete(id: string): Promise<void> {
    await this.decisionService.remove(id);
  }
}
