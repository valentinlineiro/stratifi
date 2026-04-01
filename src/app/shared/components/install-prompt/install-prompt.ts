import { Component, inject } from '@angular/core';
import { InstallPromptService } from '../../../core/services/install-prompt.service';

@Component({
  selector: 'app-install-prompt',
  templateUrl: './install-prompt.html',
  styleUrl: './install-prompt.scss',
})
export class InstallPromptComponent {
  readonly service = inject(InstallPromptService);
}
