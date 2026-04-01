import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  readonly title = signal('stratifi');
  readonly backPath = signal<string | null>(null);

  setDetail(title: string): void {
    this.title.set(title);
    this.backPath.set('/decisions');
  }

  reset(): void {
    this.title.set('stratifi');
    this.backPath.set(null);
  }
}
