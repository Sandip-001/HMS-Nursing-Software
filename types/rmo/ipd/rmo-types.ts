// types/rmo/ipd/rmo-types.ts

export type PatientStatus = "Stable" | "Under Observation" | "Critical" | "Discharged";
export type ShiftName = "Morning" | "Evening" | "Night";
export type DoseStatus = "Given" | "Not Given" | "Pending" | "Out of Stock";
export type NoteRole = "Doctor" | "RMO" | "Nurse";
export type TreatmentFollowStatus = "Following" | "Not Following";
export type LabCategory = "Pathology" | "Radiology";
export type PathologyFlag = "Normal" | "Low" | "High" | "Borderline";
export type BillingStatus = "Fully Paid" | "Partially Paid" | "Fully Due";
export type PaymentMethod = "Cash" | "Card" | "UPI" | "Net Banking";

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
}

export interface MedicineOrder {
  id: string;
  medicineName: string;
  medicineCode: string;
  dose: string;
  frequency: string;
  durationDays: number;
  instructions: string;
  startDate: string;
  orderedBy: string;
  orderedAt: string;
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

export interface FluidBalanceEntry {
  id: string;
  date: string;
  dateTime: string;
  direction: "Intake" | "Output";
  route: string;
  description: string;
  volumeMl: number;
  recordedBy: string;
}

export interface TreatmentPlanItem {
  id: string;
  title: string;
  description: string;
  orderedBy: string;
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

export interface StatusChangeLog {
  id: string;
  status: PatientStatus;
  changedBy: string;
  changedAt: string;
  reason?: string;
}

export interface PaymentMethodSplit {
  method: PaymentMethod;
  amount: number;
}

export interface PaymentRecord {
  id: string;
  date: string;
  dateTime: string;
  partyName: string;
  totalAmount: number;
  methods: PaymentMethodSplit[];
  collectedBy: string;
}

export interface BillingSnapshot {
  totalBillTillToday: number;
  totalPaid: number;
  totalPending: number;
  status: BillingStatus;
  payments: PaymentRecord[];
}

export interface DischargeForm {
  currentCondition: string;
  finalDiagnosis: string;
  dischargeInstructions: string;
  followUpDate: string;
  dischargedBy: string;
  dischargedAt: string;
}

export interface RmoPatient {
  uhid: string;
  ipdId: string;
  patientName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  status: PatientStatus;
  ward: string;
  room: string;
  bed: string;
  department: string;
  attendingDoctor: string;
  rmoAssigned: string;
  admissionDateTime: string;
  allergies: string[];
  contactNumber: string;
  guardianName?: string;
  diagnoses: DiagnosisEntry[];
  vitals: VitalRecord[];
  doses: MedicineDose[];
  medicineOrders: MedicineOrder[];
  labReports: LabReport[];
  progressNotes: ProgressNote[];
  fluidBalance: FluidBalanceEntry[];
  treatmentPlans: TreatmentPlanItem[];
  assignedNurses: ShiftAssignment[];
  handovers: ShiftHandoverEntry[];
  statusLog: StatusChangeLog[];
  billing: BillingSnapshot;
  discharge?: DischargeForm;
}

export interface RmoFilters {
  search: string;
  ward: "All" | string;
  status: "All" | PatientStatus;
  department: "All" | string;
}

export interface MedicineCatalogItem {
  code: string;
  name: string;
  strength: string;
  route: string;
}

export interface DiagnosisCatalogItem {
  code: string;
  name: string;
}