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
    db/database.ts                        # Dexie DB — Decision, Scenario, JournalEntry tables
    services/
      decision.service.ts                 # CRUD + liveQuery signal for decisions
      scenario.service.ts                 # CRUD + liveQuery signal for scenarios
      journal.service.ts                  # CRUD + liveQuery signal for journal entries
      header.service.ts                   # Signals for dynamic header title + back path
  pages/
    decisions/
      decisions.ts/html/scss              # Decisions list page
      decision-detail/                    # Detail page (/decisions/:id)
      components/
        decision-card/                    # Card with routerLink body + delete button
        new-decision-sheet/               # Bottom sheet for creating a decision
    scenarios/
      scenarios.ts/html/scss              # Scenarios grouped by decision
      components/
        scenario-card/                    # Compact card with left accent bar
        new-scenario-sheet/               # Bottom sheet (supports preselectedDecisionId)
    journal/
      journal.ts/html/scss                # Journal entries enriched with decision/scenario titles
      components/
        journal-entry-card/               # Date-column card with scenario chip
        new-entry-sheet/                  # Bottom sheet (supports preselectedDecisionId)
  shared/
    components/bottom-nav/                # Fixed bottom navigation (Decisions / Scenarios / Journal)
    styles/
      _sheet.scss                         # Shared bottom sheet styles + animations
      _fields.scss                        # Shared form fields, selects, btn-ghost, btn-primary
  pages/_page.scss                        # Shared page layout (header, empty state, btn-icon)
```

## Data Model

| Table     | Key fields                                                       |
|-----------|------------------------------------------------------------------|
| decisions | id, title, description, createdAt, updatedAt                     |
| scenarios | id, decisionId, title, notes, outcomes (JSON), createdAt         |
| journal   | id, decisionId, chosenScenarioId, reflection, createdAt          |

## Routes

| Path              | Component           | Notes                          |
|-------------------|---------------------|--------------------------------|
| `/decisions`      | `DecisionsPage`     | List of all decisions          |
| `/decisions/:id`  | `DecisionDetailPage`| Scenarios + journal for one decision |
| `/scenarios`      | `ScenariosPage`     | All scenarios grouped by decision |
| `/journal`        | `JournalPage`       | All journal entries            |

## Conventions

- Services expose a reactive signal via `toSignal(from(liveQuery(...)))` — no manual refresh needed
- Pages use `computed()` for derived/enriched state (grouping, joining titles)
- All pages are lazy-loaded via `loadComponent` in `app.routes.ts`
- Bottom sheets are toggled with `@if (showSheet())` in the page template; `cancel`/`confirm` outputs close them
- Sheets accept an optional `preselectedDecisionId` input — when set, the decision dropdown is hidden and the ID is pre-loaded in `ngOnInit`
- `HeaderService` is set/reset in detail page `ngOnInit`/`ngOnDestroy` to drive the back arrow and title
- Shared SCSS partials (`_sheet.scss`, `_fields.scss`, `_page.scss`) are `@use`d — never duplicated
