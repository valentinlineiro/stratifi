import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';

@Component({
  selector: 'app-new-decision-sheet',
  imports: [FormsModule],
  templateUrl: './new-decision-sheet.html',
  styleUrl: './new-decision-sheet.scss',
})
export class NewDecisionSheetComponent {
  readonly t = inject(I18nService).t;
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
