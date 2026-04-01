import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-decision-sheet',
  imports: [FormsModule],
  templateUrl: './new-decision-sheet.html',
  styleUrl: './new-decision-sheet.scss',
})
export class NewDecisionSheetComponent {
  confirm = output<{ title: string; description: string }>();
  cancel = output<void>();

  title = signal('');
  description = signal('');

  submit(): void {
    if (!this.title().trim()) return;
    this.confirm.emit({ title: this.title(), description: this.description() });
    this.title.set('');
    this.description.set('');
  }
}
