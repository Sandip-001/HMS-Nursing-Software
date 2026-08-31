// types/doctor/icu/doctor-icu-types.ts

export type DoctorOrderStatus = "Active" | "Modified" | "Discontinued" | "Pending";
export type UrgencyLevel = "Routine" | "Urgent" | "Stat" | "Emergency";
export type PatientStatus = "Stable" | "Under Observation" | "Critical" | "Discharge" | "Follow Up OPD" | "Shifted to Ward";

// Medicine Order Types
export interface MedicineDraft {
  medicineName: string;
  medicineCode: string;
  strength: string;
  route: string;
  dose: string;
  frequency: string;
  duration: string;
  instructions: string;
  slot: string;
  scheduledTime: string;
  urgency: UrgencyLevel;
}

export interface DoctorMedicineOrder {
  id: string;
  uhid: string;
  medicines: MedicineDraft[];
  orderedBy: string;
  orderedAt: string;
  status: DoctorOrderStatus;
  notes?: string;
}

// Lab Order Types
export type LabCategory = "Pathology" | "Radiology";
export type LabPriority = "Routine" | "Urgent" | "Stat";

export interface LabDraft {
  category: LabCategory;
  testName: string;
  orderedBy: string;
  priority: LabPriority;
  clinicalNotes: string;
  orderedAt?: string;
  results?: string[];
  resultDate?: string;
}

export interface LabTestItem {
  id: string;
  code: string;
  name: string;
  category: LabCategory;
  description: string;
}

export interface DoctorLabOrder {
  id: string;
  uhid: string;
  orders: LabDraft[];
  orderedBy: string;
  orderedAt: string;
  status: DoctorOrderStatus;
}

// Progress Note Types
export interface DoctorProgressNote {
  id: string;
  uhid: string;
  note: string;
  doctorName: string;
  doctorRole: string;
  createdAt: string;
  type: "Progress" | "Consultation" | "Procedure";
}

// Treatment Plan Types
export interface TreatmentPlanItem {
  id: string;
  uhid: string;
  plan: string;
  category: "Medical" | "Surgical" | "Nursing" | "Therapy" | "Diet";
  priority: "High" | "Medium" | "Low";
  createdBy: string;
  createdAt: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

// Diagnosis Types
export interface DiagnosisItem {
  id: string;
  code: string;
  name: string;
  status: "Active" | "Resolved" | "Chronic" | "Rule Out";
  notedAt: string;
  notedBy: string;
}

// Nurse Assignment Types
export interface NurseAssignment {
  id: string;
  uhid: string;
  nurseName: string;
  nurseId: string;
  shift: "Morning" | "Afternoon" | "Night";
  date: string;
  ward: string;
}

// Discharge Types
export interface DischargeSummary {
  id: string;
  uhid: string;
  dischargeDate: string;
  dischargeTime: string;
  diagnosis: string;
  proceduresDone: string;
  conditionAtDischarge: string;
  dischargeInstructions: string;
  followUpDate?: string;
  followUpLocation?: string;
  dischargeMedicines?: MedicineDraft[];
  dischargedBy: string;
  dischargedAt: string;
}