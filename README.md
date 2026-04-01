# Stratifi

A mobile-first PWA for simulating life decisions. Model a decision, branch into scenarios, and keep a journal of how it played out.

## Getting started

```bash
npm install
npm start        # dev server at http://localhost:4200
npm run build    # production build → dist/stratifi
ng test          # unit tests (Vitest)
```

## What it does

1. **Decisions** — capture a major life decision with a title and context
2. **Scenarios** — create "what if" branches for each decision (accept the offer, stay and negotiate, etc.)
3. **Journal** — log a reflection after the fact, optionally linking it to the scenario you actually chose

All data is stored locally in IndexedDB via [Dexie.js](https://dexie.org/). No account, no backend, works offline.

## Tech

- Angular 21 · standalone components · signals
- `@angular/pwa` — installable, offline-first service worker
- Dexie.js — IndexedDB wrapper with reactive `liveQuery`
- SCSS — dark theme via CSS custom properties
