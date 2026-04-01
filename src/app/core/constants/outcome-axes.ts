export interface OutcomeAxis {
  key: string;
  label: string;
}

export const OUTCOME_AXES: OutcomeAxis[] = [
  { key: 'financial', label: 'Financial' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'risk',      label: 'Risk'      },
  { key: 'alignment', label: 'Alignment' },
];
