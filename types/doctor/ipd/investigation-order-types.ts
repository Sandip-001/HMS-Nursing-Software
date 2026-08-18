//types/doctor/ipd/investigation-order-types.ts
export type InvestigationDepartment = "Pathology" | "Radiology";

export type InvestigationStatus =
  | "Pending"
  | "Ordered"
  | "Sample Collected"
  | "Processing"
  | "Report Ready";

export type InvestigationPriority = "Normal" | "Urgent";

export type PathologyResultStatus =
  | "Normal"
  | "High"
  | "Low"
  | "Borderline"
  | "Critical";

export interface PathologyResultItem {
  parameter: string;
  result: string;
  unit: string;
  referenceRange: string;
  status: PathologyResultStatus;
}

export interface InvestigationOrderItem {
  id: string;

  investigationName: string;

  /**
   * Pathology = blood, urine, microbiology and biochemistry tests.
   * Radiology = X-ray, CT, MRI, USG, ECG etc.
   */
  department: InvestigationDepartment;

  /**
   * Existing display grouping such as Hematology, Biochemistry,
   * Radiology, Cardiology or Microbiology.
   */
  category: string;

  priority: InvestigationPriority;

  sample: string;

  orderDate: string;
  orderedBy: string;

  status: InvestigationStatus;

  indication: string;
  additionalInstructions: string;

  expectedReportTime: string;

  /**
   * Available after Pathology report is ready.
   */
  pathologyResults?: PathologyResultItem[];

  /**
   * Human-readable report summary.
   */
  reportSummary?: string;

  /**
   * Uploaded by pathology/radiology department.
   * Replace with a real secure storage URL after API integration.
   */
  reportFileName?: string;
  reportFileUrl?: string;

  reportUploadedOn?: string;
  reportUploadedBy?: string;
}

export interface InvestigationOrdersPageData {
  items: InvestigationOrderItem[];
  indication: string;
  instructions: string;
}