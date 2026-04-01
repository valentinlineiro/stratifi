import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav';
import { InstallPromptComponent } from './shared/components/install-prompt/install-prompt';
import { HeaderService } from './core/services/header.service';
import { InstallPromptService } from './core/services/install-prompt.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, BottomNavComponent, InstallPromptComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly header = inject(HeaderService);
  // Eagerly instantiate so the beforeinstallprompt listener registers immediately
  constructor() { inject(InstallPromptService); }
}
