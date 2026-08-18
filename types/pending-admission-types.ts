// types/pending-admission-types.ts
export type PendingStep = "Awaiting Package & Payment" | "Awaiting Bed Allocation" | "Awaiting Review & Confirm";
export type PendingPriority = "Low" | "Medium" | "High";

export interface PendingAdmissionRecord {
  admissionId: string;
  admissionDateTime: string;
  uhid: string;
  patientName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  department: string;
  currentStep: PendingStep;
  pendingSinceDateTime: string;
  pendingDuration: string;
  priority: PendingPriority;
  attendingDoctor: string;
}