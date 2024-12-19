export const GOVERNANCE_CATEGORIES = [
  { link: "policies-disclosure" },
  { link: "financial-statements" },
  { link: "program-reports" },
  { link: "regulations" },
  { link: "annual-documents" },
  { link: "general-meetings" },
] as const;

export type GovernanceCategory = (typeof GOVERNANCE_CATEGORIES)[number]["link"];
