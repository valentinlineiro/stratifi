import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
})
export class BottomNavComponent {
  readonly items: NavItem[] = [
    { label: 'Decisions', path: '/decisions', icon: 'grid_view' },
    { label: 'Scenarios', path: '/scenarios', icon: 'account_tree' },
    { label: 'Journal',   path: '/journal',   icon: 'menu_book' },
  ];
}
