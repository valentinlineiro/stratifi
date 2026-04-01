import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'decisions', pathMatch: 'full' },
  {
    path: 'decisions',
    loadComponent: () =>
      import('./pages/decisions/decisions').then((m) => m.DecisionsPage),
  },
  {
    path: 'scenarios',
    loadComponent: () =>
      import('./pages/scenarios/scenarios').then((m) => m.ScenariosPage),
  },
  {
    path: 'journal',
    loadComponent: () =>
      import('./pages/journal/journal').then((m) => m.JournalPage),
  },
  { path: '**', redirectTo: 'decisions' },
];
