// types/nurse-admin/ipd/nurse-admin-types.ts

export type PatientAcuity = "Stable" | "Under Observation" | "Critical";
export type ShiftName = "Morning" | "Evening" | "Night";
export type AssignmentStatus = "Unassigned" | "Partially Assigned" | "Fully Assigned";

export interface NurseProfile {
  id: string;
  name: string;
  designation: string;
  ward: string;
  avatarColor: string;
}

export interface ShiftDefinition {
  name: ShiftName;
  timeRange: string;
}

export interface DailyShiftAssignment {
  date: string;
  shift: ShiftName;
  nurseIds: string[];
}

export interface AdmittedPatient {
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
  admittedFrom: string;
  allergies: string[];
  currentDiagnosis: string;
  diagnosisCode: string;
  contactNumber: string;
  guardianName?: string;
  assignments: DailyShiftAssignment[];
}

export interface NurseAdminPatientFilters {
  search: string;
  ward: "All" | string;
  acuity: "All" | PatientAcuity;
  department: "All" | string;
}