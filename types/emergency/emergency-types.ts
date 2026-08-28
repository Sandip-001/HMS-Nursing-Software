// types/emergency/emergency-types.ts
// Shared across ALL emergency-module roles: Admission Desk, RMO, Doctor, Nurse, Lab, Pharmacy.

export type EmergencyStatus =
  | "Under Observation" | "Stable" | "Critical" | "Shifted to IPD" | "Shifted to OT"
  | "Shifted to ICU" | "Well & Released" | "Follow-up OPD" | "Patient Death";

export type Gender = "Male" | "Female" | "Other";
export type ArrivalMode = "Ambulance" | "Walk-In" | "Police" | "Private Vehicle" | "Referred Transfer" | "Other";
export type IncidentType =
  | "Chest Pain" | "Stroke" | "Accident (RTA)" | "Fall Injury" | "Burn" | "Poisoning"
  | "Suicide Attempt" | "Assault / Murder Attempt" | "Cardiac Arrest" | "Breathing Difficulty"
  | "Seizure" | "High Fever" | "Other";
export type ShiftName = "Morning" | "Evening" | "Night";
export type NoteRole = "Doctor" | "RMO" | "Nurse";
export type DoseStatus = "Given" | "Not Given" | "Pending" | "Out of Stock";
export type LabCategory = "Pathology" | "Radiology";
export type PathologyFlag = "Normal" | "Low" | "High" | "Borderline";
export type TreatmentFollowStatus = "Following" | "Not Following";
export type PoliceCaseType = "Accident" | "Murder / Assault" | "Suicide" | "None";
export type RouteType = "Oral" | "IV" | "IM" | "Topical" | "Inhalation";
export type FrequencyType = "OD" | "BD" | "TDS" | "QID" | "HS" | "PRN";

export interface VitalRecord {
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

export interface DiagnosisEntry {
  id: string;
  name: string;
  code: string;
  type: "Provisional" | "Confirmed" | "Differential";
  addedBy: string;
  addedAt: string;
  notes?: string;
}

export interface MedicineDose {
  id: string;
  medicineName: string;
  medicineCode: string;
  strength: string;
  route: string;
  slot: string;
  scheduledTime: string;
  date: string;
  status: DoseStatus;
  urgency: "Urgent" | "Routine";
  deliveredFromPharmacyAt?: string;
  givenBy?: string;
  givenAt?: string;
  outOfStockRemark?: string;
  instructions?: string;  // ← Add this line
}

export interface PathologyResult {
  parameter: string;
  value: string;
  unit: string;
  refRange: string;
  flag: PathologyFlag;
}

export interface LabReport {
  id: string;
  date: string;
  category: LabCategory;
  testName: string;
  orderedBy: string;
  reportedAt: string;
  pathologyResults?: PathologyResult[];
  reportImageUrl?: string;
  notes?: string;
}

export interface ProgressNote {
  id: string;
  date: string;
  title: string;
  author: string;
  role: NoteRole;
  category: string;
  createdAt: string;
  noteText: string;
}

export interface TreatmentPlanItem {
  id: string;
  title: string;
  description: string;
  orderedBy: string;
  orderedByRole: "Doctor" | "RMO";
  orderedOn: string;
  followStatus: TreatmentFollowStatus;
}

export interface ShiftAssignment {
  date: string;
  shift: ShiftName;
  nurseNames: string[];
}

export interface ShiftHandoverEntry {
  id: string;
  fromNurse: string;
  fromShift: ShiftName;
  toNurse: string;
  toShift: ShiftName;
  handoverDateTime: string;
  notes?: string;
}

export interface PoliceNotification {
  caseType: PoliceCaseType;
  nearestPoliceStation: string;
  informed: boolean;
  informedAt?: string;
  informedBy?: string;
  firNumber?: string;
  remarks?: string;
}

export interface StatusChangeLog {
  id: string;
  status: EmergencyStatus;
  changedBy: string;
  changedAt: string;
  reason?: string;
}

export interface EmergencyRegistration {
  // Identity
  emergencyNumber: string;
  uhid: string;
  isExistingPatient: boolean;
  patientName?: string;
  dateOfBirth?: string;
  age?: number;
  gender: Gender;
  mobileNumber?: string;
  attendantName?: string;
  aadharNumber?: string;
  ayushmanCardNumber?: string;
  emergencyContactNumber?: string;
  address?: string;

  // Emergency intake details
  arrivalMode: ArrivalMode;
  referredFrom?: string;
  incidentType: IncidentType;
  broughtBy?: string;
  policeInformationNeeded: boolean;

  registeredAt: string;
  registeredBy: string;
}

export interface EmergencyPatient extends EmergencyRegistration {
  status: EmergencyStatus;
  currentCondition: string;
  attendingDoctor: string;
  assignedRmo: string;
  assignedNurse: string;
  bedOrBay: string;
  allergies: string[];

  vitals: VitalRecord[];
  diagnoses: DiagnosisEntry[];
  doses: MedicineDose[];
  labReports: LabReport[];
  progressNotes: ProgressNote[];
  treatmentPlans: TreatmentPlanItem[];
  assignedNurses: ShiftAssignment[];
  handovers: ShiftHandoverEntry[];
  statusLog: StatusChangeLog[];
  police: PoliceNotification;
}

export interface EmergencyFilters {
  search: string;
  status: "All" | EmergencyStatus;
  incidentType: "All" | IncidentType;
}

export interface MedicineCatalogItem {
  code: string;
  name: string;
  strength: string;
  route: RouteType;
  defaultDose?: string;
  defaultFrequency?: FrequencyType;
  defaultDuration?: string;
  defaultInstructions?: string;
}

export interface DiagnosisCatalogItem {
  code: string;
  name: string;
}
