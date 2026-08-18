// lib/admission-types.ts
export type AdmissionType = "Elective" | "Emergency" | "Referral";
export type Priority = "Normal" | "Urgent" | "Critical";
export type Gender = "Male" | "Female" | "Other";

export interface PatientInfo {
  uhid: string;
  patientName: string;
  age: string;
  gender: Gender;
  mobile: string;
  opdMrNo: string;
  email?: string;
  address: string;
  bloodGroup: string;
  referredBy?: string;
  department: string;
  admissionType: AdmissionType;
  priority: Priority;
  attendingDoctor: string;
  provisionalDiagnosis: string;
  chiefComplaints?: string;
  medicalHistory?: string;
}

export interface RecentAdmission {
  id: string;
  patientName: string;
  date: string;
  status: "Admitted" | "Pending";
}




export type PaymentMode = "Cash" | "Card" | "UPI" | "Net Banking" | "Cheque" | "Other";
export type AdvanceMode = "percentage" | "fixed";

export interface Package {
  id: string;
  name: string;
  subtitle: string;
  rate: number;
  roomType: string;
  doctorVisit: boolean;
  nursingCare: boolean;
  meals: boolean;
  investigations: string;
  isMostSelected?: boolean;
}

export interface PackageInfo {
  packageId: string;
  packageName: string;
  packageRate: number;
  expectedStayDays: number;
  totalEstimatedAmount: number;
  advanceMode: AdvanceMode;
  advancePercentage: number;
  advanceAmount: number;
  paymentMode: PaymentMode;
  transactionNo: string;
  paymentDate: string;
  receivedBy: string;
}






export type BedStatus = "Available" | "Occupied" | "Reserved" | "Maintenance";

export interface Bed {
  id: string;
  roomNo: string;
  bedNo: string;
  status: BedStatus;
}

export interface RoomGroup {
  roomNo: string;
  beds: Bed[];
}

export interface WardGroup {
  wardName: string; // e.g. "General Ward", "Semi Private Room"
  rooms: RoomGroup[];
}

export interface FloorGroup {
  floor: string; // e.g. "3rd Floor"
  wards: WardGroup[];
}