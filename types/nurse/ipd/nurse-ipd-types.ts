// types/nurse/ipd/nurse-ipd-types.ts

export type PatientAcuity = "Stable" | "Under Observation" | "Critical";
export type MedicineUrgency = "Urgent" | "Routine";
export type DoseSlot = "Morning" | "Afternoon" | "Evening" | "Night";
export type DoseStatus = "Given" | "Not Given" | "Pending" | "Out of Stock";
export type FluidRoute = "IV" | "Oral" | "NG Tube" | "Urine" | "Drain" | "Vomitus" | "Stool";
export type FluidDirection = "Intake" | "Output";
export type NoteRole = "Doctor" | "Nurse";
export type NotePriority = "Routine" | "Important" | "Urgent";
export type NoteStatus = "Signed & Locked" | "Draft";
export type TreatmentFollowStatus = "Following" | "Not Following";

export interface NurseIpdPatient {
  uhid: string;
  ipdId: string;
  patientName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  acuity: PatientAcuity;
  ward: string;
  room: string;
  bed: string;
  department: string;
  admittingDoctor: string;
  admissionDateTime: string;
  allergies: string[];
  currentDiagnosis: string;
  diagnosisCode: string;
  assignedNurse: string;
  currentShift: string;
}

export interface VitalRecord {
  id: string;
  dateTime: string;
  bp: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  respRate: number;
  spo2: number;
  temp: number;
  pain: number;
  recordedBy: string;
}

export interface EmarDose {
  id: string;
  medicineName: string;
  strength: string;
  route: string;
  slot: DoseSlot;
  scheduledTime: string;
  qtyRequired: number;
  status: DoseStatus;
  urgency: MedicineUrgency;
  instructions: string;
  givenBy?: string;
  givenAt?: string;
  remarks?: string;
}

export interface FluidBalanceEntry {
  id: string;
  dateTime: string;
  direction: FluidDirection;
  route: FluidRoute;
  description: string;
  volumeMl: number;
  recordedBy: string;
}

export interface ProgressNote {
  id: string;
  uhid: string;
  title: string;
  author: string;
  role: NoteRole;
  category: string;
  priority: NotePriority;
  createdAt: string;
  status: NoteStatus;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
  noteText: string;
}

export interface TreatmentPlanItem {
  id: string;
  title: string;
  description: string;
  orderedBy: string;
  orderedOn: string;
  followStatus: TreatmentFollowStatus;
  lastUpdatedBy?: string;
  lastUpdatedAt?: string;
}

export interface ShiftHandoverEntry {
  id: string;
  fromNurse: string;
  fromShift: string;
  toNurse: string;
  toShift: string;
  handoverDateTime: string;
  notes?: string;
}

export interface DischargeSummaryForm {
  patientConditionOnDischarge: string;
  vitalsStableAtDischarge: boolean;
  woundStatus: string;
  medicationsHandedOver: boolean;
  belongingsReturned: boolean;
  patientEducationGiven: boolean;
  followUpInstructions: string;
  dischargedBy: string;
  dischargeDateTime: string;
  additionalNotes?: string;
}

export interface NurseIpdPatientFilters {
  search: string;
  ward: "All" | string;
  acuity: "All" | PatientAcuity;
  shift: "All" | string;
}