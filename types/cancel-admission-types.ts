// types/cancel-admission-types.ts
export type CancelledByType = "Patient/Family" | "Admission Desk" | "Others";

export interface HistoryEntry {
  dateTime: string;
  description: string;
}

export interface CancelledAdmissionRecord {
  requestId: string;
  patientName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  uhid: string;
  department: string;
  cancelledOnDateTime: string;
  cancelledBy: CancelledByType;
  cancelledByName: string;
  reason: string;
  remarks: string;
  status: "Patient Cancelled" | "Staff Cancelled" | "Others";
  wardRoom: string;
  bedType: string;
  packageName: string;
  packageAmount: number;
  history: HistoryEntry[];
}