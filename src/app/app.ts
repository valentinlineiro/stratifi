import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav';
import { HeaderService } from './core/services/header.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly header = inject(HeaderService);
}
