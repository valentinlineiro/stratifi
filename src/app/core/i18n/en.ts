export interface Translations {
  app: {
    name: string;
    installBanner: string;
    installBtn: string;
  };
  nav: {
    decisions: string;
    scenarios: string;
    journal: string;
  };
  common: {
    cancel: string;
    all: string;
    none: string;
    addedOn: string;
    selectDecision: string;
  };
  status: {
    active: string;
    decided: string;
    archived: string;
  };
  decisions: {
    pageTitle: string;
    newTitle: string;
    question: string;
    questionPlaceholder: string;
    context: string;
    contextPlaceholder: string;
    createBtn: string;
    emptyTitle: string;
    emptySub: string;
    emptyCta: string;
    noFilterResult: string;
    exportTitle: string;
    importTitle: string;
    importError: string;
  };
  scenarios: {
    pageTitle: string;
    newTitle: string;
    decision: string;
    question: string;
    questionPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    outcomeScores: string;
    confidenceLabel: string;
    addBtn: string;
    emptyTitle: string;
    emptySub: string;
    emptyCta: string;
    noDecisionsTitle: string;
    noDecisionsSub: string;
    sectionEmpty: string;
  };
  outcomes: {
    financial: string;
    lifestyle: string;
    risk: string;
    alignment: string;
    actualTitle: string;
  };
  journal: {
    pageTitle: string;
    newTitle: string;
    chosenScenario: string;
    reflectionLabel: string;
    reflectionPlaceholder: string;
    regretPrompt: string;
    feelingLabel: string;
    saveBtn: string;
    emptyTitle: string;
    emptySub: string;
    emptyCta: string;
    noDecisionsTitle: string;
    noDecisionsSub: string;
    sectionEmpty: string;
  };
  regret: {
    none: string;
    minor: string;
    mixed: string;
    regret: string;
    strong: string;
  };
}
