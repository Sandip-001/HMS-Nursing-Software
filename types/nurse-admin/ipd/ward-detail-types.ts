// types/nurse-admin/ipd/ward-detail-types.ts
import type { AdmittedPatient, ShiftName } from "./nurse-admin-types";

export type PatientStatus = "Stable" | "Under Observation" | "Critical" | "Discharged";
export type BedStatus = "Available" | "Occupied" | "Reserved" | "Maintenance";
export type DoseStatus = "Given" | "Not Given" | "Pending" | "Out of Stock";
export type NoteRole = "Doctor" | "Nurse";
export type TreatmentFollowStatus = "Following" | "Not Following";

export interface VitalRecordFull {
  id: string;
  date: string;
  dateTime: string;
  bp: string;
  pulse: number;
  respRate: number;
  spo2: number;
  temp: number;
  pain: number;
  recordedBy: string;
  recordedByRole: NoteRole;
}

export interface MedicineDoseFull {
  id: string;
  date: string;
  medicineName: string;
  strength: string;
  route: string;
  slot: string;
  scheduledTime: string;
  status: DoseStatus;
  urgency: "Urgent" | "Routine";
  deliveredFromPharmacyAt?: string;
  givenBy?: string;
  givenAt?: string;
  outOfStockRemark?: string;
}

export interface ProgressNoteFull {
  id: string;
  date: string;
  title: string;
  author: string;
  role: NoteRole;
  category: string;
  createdAt: string;
  noteText: string;
}

export interface FluidBalanceFull {
  id: string;
  date: string;
  dateTime: string;
  direction: "Intake" | "Output";
  route: string;
  description: string;
  volumeMl: number;
  recordedBy: string;
}

export interface TreatmentPlanFull {
  id: string;
  title: string;
  description: string;
  orderedBy: string;
  orderedOn: string;
  followStatus: TreatmentFollowStatus;
}

export interface ShiftHandoverFull {
  id: string;
  fromNurse: string;
  fromShift: ShiftName;
  toNurse: string;
  toShift: ShiftName;
  handoverDateTime: string;
  notes?: string;
}

export interface StatusChangeLog {
  id: string;
  status: PatientStatus;
  changedBy: string;
  changedAt: string;
  reason?: string;
}

export interface DischargeDetailsFull {
  finalDiagnosis: string;
  dischargeSummary: string;
  dischargeMedicines: { name: string; dosage: string; duration: string }[];
  followUpDate: string;
  followUpInstructions: string;
  dietInstructions: string;
  dischargedByDoctor: string;
  doctorApprovedAt: string;
  nurseApprovedBy?: string;
  nurseApprovedAt?: string;
  sentToBillingAt?: string;
}

export interface WardPatientFull extends AdmittedPatient {
  status: PatientStatus;
  vitals: VitalRecordFull[];
  medicines: MedicineDoseFull[];
  progressNotes: ProgressNoteFull[];
  fluidBalance: FluidBalanceFull[];
  treatmentPlans: TreatmentPlanFull[];
  handovers: ShiftHandoverFull[];
  statusLog: StatusChangeLog[];
  discharge?: DischargeDetailsFull;
}

export interface BedInfo {
  bedId: string;
  ward: string;
  room: string;
  bedLabel: string;
  status: BedStatus;
  patientUhid?: string;
}

export interface WardDetailFilters {
  search: string;
  ward: "All" | string;
  status: "All" | PatientStatus;
}