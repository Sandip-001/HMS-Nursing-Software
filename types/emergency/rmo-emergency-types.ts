// types/emergency/rmo-emergency-types.ts
import type {
  DiagnosisEntry,
  EmergencyPatient,
  EmergencyStatus,
  LabReport,
  MedicineDose,
  NoteRole,
  ProgressNote,
  VitalRecord,
} from "./emergency-types";

export type EmergencyDepartment = "Cardiology" | "Neurology" | "Trauma & Orthopaedics" | "General Medicine" | "Paediatrics" | "Surgery" | "Critical Care";
export type AssignmentRole = "Doctor" | "Nurse";
export type BedUnit = "IPD" | "ICU";

export interface AvailableDoctor {
  id: string;
  name: string;
  department: EmergencyDepartment;
  specialization: string;
  available: boolean;
  currentLoad: number;
  maxLoad: number;
}

export interface AvailableNurse {
  id: string;
  name: string;
  shift: "Morning" | "Evening" | "Night";
  ward: string;
  available: boolean;
  currentPatients: number;
  maxPatients: number;
}

export interface BedOption {
  id: string;
  unit: BedUnit;
  floor: string;
  ward: string;
  room: string;
  bed: string;
  bedType: string;
  status: "Available" | "Occupied" | "Cleaning" | "Reserved";
  gender?: "Male" | "Female" | "Any";
}

export interface CriticalNotification {
  id: string;
  patientEmergencyNumber: string;
  notifiedTo: string;
  note: string;
  notifiedBy: string;
  notifiedAt: string;
}

export interface DeathRecord {
  declaredAt: string;
  declaredBy: string;
  causeOfDeath: string;
  manner: "Natural" | "Accidental" | "Suicidal" | "Homicidal" | "Pending Investigation" | "Unknown";
  lastSeenAliveAt: string;
  resuscitationAttempted: boolean;
  resuscitationSummary?: string;
  attendantName?: string;
  attendantRelationship?: string;
  attendantInformedAt?: string;
  policeInformed: boolean;
  policeInformedAt?: string;
  remarks?: string;
}

export interface RmoEmergencyPatient extends EmergencyPatient {
  department?: EmergencyDepartment;
  doctorAssignment?: { doctorId: string; doctorName: string; department: EmergencyDepartment; assignedBy: string; assignedAt: string };
  nurseAssignment?: { nurseId: string; nurseName: string; shift: string; assignedBy: string; assignedAt: string };
  criticalNotifications: CriticalNotification[];
  deathRecord?: DeathRecord;
}

export interface RmoPatientUpdate {
  patient: RmoEmergencyPatient;
  updateType: "vital" | "medicine" | "lab" | "diagnosis" | "progress-note" | "status" | "doctor" | "nurse" | "bed" | "critical" | "death";
}

export type RmoStatus = Extract<EmergencyStatus, "Under Observation" | "Stable" | "Critical" | "Shifted to IPD" | "Shifted to OT" | "Shifted to ICU" | "Well & Released" | "Follow-up OPD" | "Patient Death">;


export interface MedicineDraft extends Omit<MedicineDose, "id" | "date" | "status"> {
  dose: string;
  frequency: string;   // was FrequencyType
  duration: string;
  instructions: string;
}

export interface LabDraft extends Omit<LabReport, "id" | "date" | "reportedAt"> {
  priority: "Routine" | "Urgent" | "Stat";
  clinicalNotes: string;
}

export interface ProgressNoteDraft extends Omit<ProgressNote, "id" | "date" | "createdAt" | "author" | "role"> {
  priority: "Routine" | "Urgent";
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface RmoAddContext {
  actorName: string;
  actorRole: NoteRole | "RMO";
}