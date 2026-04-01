# Stratifi

A life decision simulator — helping users model, explore, and compare major life decisions through structured analysis and outcome simulation.

## Concept

Stratifi lets users input significant life decisions (career changes, relocations, financial choices, relationships) and simulates potential outcomes across multiple dimensions. The goal is to reduce decision paralysis by making trade-offs visible and comparable.

## Key Principles

- Decisions are multi-dimensional — no single "right" answer, just informed trade-offs
- Uncertainty is first-class — projections should carry confidence ranges, not false precision
- Personal context matters — simulations are calibrated to the user's own values and priorities

## Tech Stack

- **Framework:** Angular 21 (standalone components, signals)
- **PWA:** `@angular/pwa` — service worker, installable, offline-first
- **Database:** Dexie.js (IndexedDB) — `src/app/core/db/database.ts`
- **Styling:** SCSS with CSS custom properties for theming

## Project Structure

```
src/app/
  core/
    db/database.ts              # Dexie DB — Decision, Scenario, JournalEntry tables
    services/
      decision.service.ts       # CRUD + liveQuery signal for decisions
      scenario.service.ts       # CRUD + liveQuery signal for scenarios
      journal.service.ts        # CRUD + liveQuery signal for journal entries
  pages/
    decisions/                  # Decisions list + new-decision bottom sheet
    scenarios/                  # Scenarios grouped by decision + new-scenario sheet
    journal/                    # Journal entries enriched with titles + new-entry sheet
  shared/
    components/bottom-nav/      # Fixed bottom navigation (Decisions / Scenarios / Journal)
    styles/
      _sheet.scss               # Shared bottom sheet styles
      _fields.scss              # Shared form field + button styles
  pages/_page.scss              # Shared page layout (header, empty state, btn-icon)
```

## Data Model

| Table       | Key fields                                                        |
|-------------|-------------------------------------------------------------------|
| decisions   | id, title, description, createdAt, updatedAt                      |
| scenarios   | id, decisionId, title, notes, outcomes (JSON), createdAt          |
| journal     | id, decisionId, chosenScenarioId, reflection, createdAt           |

## Conventions

- Services expose a `decisions`/`scenarios`/`entries` signal via `toSignal(from(liveQuery(...)))` — reactive, no manual refresh needed
- Pages use `computed()` for derived state (grouping, enrichment)
- All pages are lazy-loaded via `loadComponent` in `app.routes.ts`
- Bottom sheets use `@if (showSheet())` in the page template; cancel/confirm outputs close them
- Shared SCSS partials (`_sheet.scss`, `_fields.scss`, `_page.scss`) are `@use`d — never duplicated
