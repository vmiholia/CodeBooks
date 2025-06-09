
export interface CodeDataElement {
  Group: string;
  Element: string;
  Priority: number;
  Definition: string;
}

export interface CodeDetail {
  id: string;
  code: string;
  title: string;
  category: string;
}

export const CODE_DATA_ELEMENTS: CodeDataElement[] = [
  { Group: "Description & Usage", Element: "Official CPT Descriptor", Priority: 0, Definition: "The official descriptor as published in the CPT codebook" },
  { Group: "Description & Usage", Element: "Lay Description", Priority: 0, Definition: "Patient-friendly explanation of the procedure" },
  { Group: "Description & Usage", Element: "Clinical Vignette", Priority: 1, Definition: "Section: \"Clinical Vignettes\" → Card titled \"Example Scenario\"" },
  
  { Group: "Documentation & Compliance", Element: "CCI Edits & Modifier Indicator", Priority: 0, Definition: "Validator results: Pass/Fail, Edit Rationale, Modifier list" },
  { Group: "Documentation & Compliance", Element: "Global Period", Priority: 1, Definition: "Information Card with large number 0/10/90 + descriptor" },
  { Group: "Documentation & Compliance", Element: "Documentation Requirements", Priority: 2, Definition: "Required documentation elements for proper coding" },
  
  { Group: "Billing & Reimbursement", Element: "Medicare Allowable Fee (POS)", Priority: 0, Definition: "Fee table Facility vs Non-Facility" },
  { Group: "Billing & Reimbursement", Element: "RVU Breakdown", Priority: 1, Definition: "Work RVUs, Practice Expense, Malpractice components" },
  { Group: "Billing & Reimbursement", Element: "Billing Guidelines", Priority: 2, Definition: "Special billing considerations and requirements" },
  
  { Group: "Crosswalks & References", Element: "ICD-10-CM Crosswalks", Priority: 0, Definition: "Table of mappings Source / Target / Relationship" },
  { Group: "Crosswalks & References", Element: "Related Procedures", Priority: 1, Definition: "Similar or commonly bundled procedures" },
  { Group: "Crosswalks & References", Element: "External References", Priority: 2, Definition: "Links to relevant medical literature and guidelines" },
  
  { Group: "History & Metadata", Element: "Code History", Priority: 0, Definition: "Creation date, revisions, and status changes" },
  { Group: "History & Metadata", Element: "Usage Statistics", Priority: 1, Definition: "Frequency of use and trending data" }
];

export const SAMPLE_CODES: CodeDetail[] = [
  { id: "29888", code: "29888", title: "Arthroscopically aided anterior cruciate ligament repair/augmentation or reconstruction", category: "Musculoskeletal" },
  { id: "99213", code: "99213", title: "Office or other outpatient visit for evaluation and management", category: "E/M" },
  { id: "45378", code: "45378", title: "Colonoscopy, flexible; diagnostic", category: "Gastroenterology" },
  { id: "70553", code: "70553", title: "Magnetic resonance imaging, brain", category: "Radiology" },
  { id: "93306", code: "93306", title: "Echocardiography, transthoracic", category: "Cardiology" }
];
