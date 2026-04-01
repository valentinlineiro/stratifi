import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Decision } from '../../../../core/db/database';

@Component({
  selector: 'app-new-scenario-sheet',
  imports: [FormsModule],
  templateUrl: './new-scenario-sheet.html',
  styleUrl: './new-scenario-sheet.scss',
})
export class NewScenarioSheetComponent {
  decisions = input.required<Decision[]>();
  confirm = output<{ decisionId: string; title: string; notes: string }>();
  cancel = output<void>();

  decisionId = signal('');
  title = signal('');
  notes = signal('');

  get isValid(): boolean {
    return !!this.decisionId().trim() && !!this.title().trim();
  }

  submit(): void {
    if (!this.isValid) return;
    this.confirm.emit({
      decisionId: this.decisionId(),
      title: this.title(),
      notes: this.notes(),
    });
    this.title.set('');
    this.notes.set('');
    this.decisionId.set('');
  }
}
