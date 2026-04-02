import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
})
export class BottomNavComponent {
  private readonly i18n = inject(I18nService);
  readonly t = this.i18n.t;

  readonly items = computed(() => [
    { label: this.t().nav.decisions, path: '/decisions', icon: 'grid_view' },
    { label: this.t().nav.scenarios, path: '/scenarios', icon: 'account_tree' },
    { label: this.t().nav.journal,   path: '/journal',   icon: 'menu_book' },
  ]);
}
