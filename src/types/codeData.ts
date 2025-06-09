
export interface CodeDataElement {
  GroupID: number;
  ElementID: number;
  ElementName: string;
  Priority: number;
  Definition: string;
}

export interface CodeGroup {
  GroupID: number;
  GroupName: string;
}

export interface CodeDetail {
  id: string;
  code: string;
  title: string;
  category: string;
}

export const CODE_GROUPS: CodeGroup[] = [
  { GroupID: 1, GroupName: "Description & Usage" },
  { GroupID: 2, GroupName: "Documentation & Compliance" },
  { GroupID: 3, GroupName: "Billing & Reimbursement" },
  { GroupID: 4, GroupName: "Crosswalks & References" },
  { GroupID: 5, GroupName: "History & Metadata" }
];

export const CODE_DATA_ELEMENTS: CodeDataElement[] = [
  // Description & Usage (GroupID: 1)
  { GroupID: 1, ElementID: 2, ElementName: "Official CPT Descriptor", Priority: 1, Definition: "The official descriptor as published in the CPT codebook" },
  { GroupID: 1, ElementID: 3, ElementName: "Lay Description", Priority: 2, Definition: "Patient-friendly explanation of the procedure" },
  { GroupID: 1, ElementID: 4, ElementName: "Clinical Vignette", Priority: 3, Definition: "Example clinical scenario demonstrating appropriate use" },
  { GroupID: 1, ElementID: 5, ElementName: "Related Procedure Codes", Priority: 4, Definition: "Similar or commonly bundled procedures" },
  
  // Documentation & Compliance (GroupID: 2)
  { GroupID: 2, ElementID: 1, ElementName: "CCI Edits & Modifier Indicator", Priority: 0, Definition: "Correct Coding Initiative edits and modifier requirements" },
  { GroupID: 2, ElementID: 2, ElementName: "Global Period", Priority: 1, Definition: "Number of days included in global surgical package" },
  { GroupID: 2, ElementID: 3, ElementName: "Inpatient-Only (IPO) Flag", Priority: 2, Definition: "Indicator if procedure must be performed in inpatient setting" },
  { GroupID: 2, ElementID: 4, ElementName: "LCD & NCD Coverage Info", Priority: 3, Definition: "Local and National Coverage Determination information" },
  { GroupID: 2, ElementID: 5, ElementName: "Documentation Tips", Priority: 4, Definition: "Best practices for documentation requirements" },
  { GroupID: 2, ElementID: 6, ElementName: "MUE (Medically Unlikely Edit)", Priority: 5, Definition: "Maximum units that can be billed per date of service" },
  
  // Billing & Reimbursement (GroupID: 3)
  { GroupID: 3, ElementID: 1, ElementName: "Medicare Allowable Fee (POS)", Priority: 0, Definition: "Medicare fee schedule amounts by place of service" },
  { GroupID: 3, ElementID: 2, ElementName: "RVU Breakdown", Priority: 1, Definition: "Work, Practice Expense, and Malpractice RVU components" },
  { GroupID: 3, ElementID: 3, ElementName: "ASC Payment Indicator", Priority: 2, Definition: "Ambulatory Surgery Center payment classification" },
  { GroupID: 3, ElementID: 4, ElementName: "UCR / WC Benchmark Fees", Priority: 3, Definition: "Usual, Customary, and Reasonable / Workers' Compensation fee benchmarks" },
  { GroupID: 3, ElementID: 5, ElementName: "Custom Fee Modeling", Priority: 4, Definition: "Customizable fee schedule modeling tools" },
  { GroupID: 3, ElementID: 6, ElementName: "ASA Base Units & Fee Calc", Priority: 5, Definition: "Anesthesia base units and fee calculation methodology" },
  
  // Crosswalks & References (GroupID: 4)
  { GroupID: 4, ElementID: 1, ElementName: "ICD-10-CM Crosswalks", Priority: 0, Definition: "Mappings to ICD-10-CM diagnosis codes" },
  { GroupID: 4, ElementID: 2, ElementName: "ICD-10-PCS Crosswalk", Priority: 1, Definition: "Mappings to ICD-10-PCS procedure codes" },
  { GroupID: 4, ElementID: 3, ElementName: "HCPCS / Supply Crosswalk", Priority: 2, Definition: "Related HCPCS codes and supply items" },
  { GroupID: 4, ElementID: 4, ElementName: "CPT Assistant Articles", Priority: 3, Definition: "Relevant CPT Assistant clarifications and guidance" },
  { GroupID: 4, ElementID: 5, ElementName: "AHA Coding Clinic", Priority: 4, Definition: "American Hospital Association Coding Clinic references" },
  
  // History & Metadata (GroupID: 5)
  { GroupID: 5, ElementID: 1, ElementName: "Code History & Valuation", Priority: 0, Definition: "Historical changes and valuation updates" },
  { GroupID: 5, ElementID: 2, ElementName: "Visual Icons / Alerts", Priority: 1, Definition: "Visual indicators for important code characteristics" },
  { GroupID: 5, ElementID: 3, ElementName: "Real-Time Claim Scrubber", Priority: 2, Definition: "Real-time validation and claim scrubbing results" }
];

export const SAMPLE_CODES: CodeDetail[] = [
  { id: "93005", code: "93005", title: "Electrocardiogram, routine ECG with at least 12 leads; tracing only, without interpretation and report", category: "Cardiology" },
  { id: "29888", code: "29888", title: "Arthroscopically aided anterior cruciate ligament repair/augmentation or reconstruction", category: "Musculoskeletal" },
  { id: "99213", code: "99213", title: "Office or other outpatient visit for evaluation and management", category: "E/M" },
  { id: "45378", code: "45378", title: "Colonoscopy, flexible; diagnostic", category: "Gastroenterology" },
  { id: "70553", code: "70553", title: "Magnetic resonance imaging, brain", category: "Radiology" }
];
