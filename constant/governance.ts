export const GOVERNANCE_CATEGORIES = [
  { link: "policies-disclosure" },
  { link: "regulations" },
  { link: "financial-statements" },
  { link: "program-reports" },
  { link: "annual-documents" },
  { link: "general-meetings" },
  { link: "board-minutes" },
  { link: "general-members" },
  { link: "beneficiary-satisfaction-survey" },
  { link: "supporter-satisfaction-survey" },
  { link: "employee-volunteer-satisfaction-survey" },
  { link: "membership-candidacy-survey" },
  { link: "stakeholder-satisfaction-results" },
  { link: "new-board-election-program" },
  { link: "association-staff" },
] as const;

export type GovernanceCategory = (typeof GOVERNANCE_CATEGORIES)[number]["link"];
