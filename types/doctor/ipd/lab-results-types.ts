
export type LabResultStatus = "Normal" | "Low" | "High" | "Borderline" | "Pending";
export type LabCategory = "Hematology" | "Biochemistry" | "Serology" | "Microbiology" | "Others";

export interface LabTestResult {
  id: string;
  testName: string;
  category: LabCategory;
  testDateTime: string;
  result: string;
  unit: string;
  referenceRange: string;
  status: LabResultStatus;
  isReport: boolean;
  reportUrl?: string;
  interpretation?: string;
  performedBy?: string;
  verifiedBy?: string;
  labRemarks?: string;
  trend?: { date: string; value: number }[];
}

export interface CriticalAlert {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  direction: "low" | "high" | "borderline";
}

export interface TestHistoryEntry {
  dateTime: string;
  testCount: number;
}