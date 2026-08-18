// lib/admission-list-types.ts
export type AdmissionStatus = "Active" | "Discharged" | "Cancelled" | "Pending";

export interface AdmissionRecord {
  admissionId: string;
  admissionDateTime: string;
  uhid: string;
  patientName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  department: string;
  packageName: string;
  packageDays: number;
  packageRate: number;
  floor: string;
  roomNo: string;
  bedNo: string;
  status: AdmissionStatus;
  expectedDischarge: string;
}


export interface AdmissionDetail extends AdmissionRecord {
  opdMrNo: string;
  attendingDoctor: string;
  admissionType: string;
  priority: string;
  mobile: string;
  email: string;
  address: string;
  admissionSource: string;
  referredBy: string;
  remarks: string;
  advanceAmount: number;
  paymentMode: string;
  transactionNo: string;
  paymentDate: string;
  isolatedBed: boolean;
  specialInstructions: string;
  createdBy: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
  totalUpdates: number;
}