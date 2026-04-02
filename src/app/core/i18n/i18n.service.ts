import { computed, effect, Injectable, signal } from '@angular/core';
import type { Translations } from './en';

export type Lang = 'en' | 'es';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>((localStorage.getItem('lang') as Lang) ?? 'en');

  private readonly _t = signal<Translations | undefined>(undefined);

  /** Current translations. Defined once the first fetch completes (gated by `ready`). */
  readonly t = computed(() => this._t() as Translations);
  readonly ready = computed(() => this._t() !== undefined);

  constructor() {
    effect(() => {
      const lang = this.lang();
      fetch(`i18n/${lang}.json`)
        .then(r => r.json() as Promise<Translations>)
        .then(data => this._t.set(data));
    });
  }

  toggle(): void {
    const next = this.lang() === 'en' ? 'es' : 'en';
    this.lang.set(next);
    localStorage.setItem('lang', next);
  }
}
