export interface VitalReading {
  bp: string;
  pulse: string;
  temp: string;
  rr: string;
  spo2: string;
  pain: string;
  recordedOn: string;
}

export interface LabHighlight {
  name: string;
  value: string;
  date: string;
}

export interface MedicineOrder {
  id: string;
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  status: "Given" | "Pending" | "Held" | "Discontinued";
  scheduledTime: string;
  givenBy?: string;
  givenAt?: string;
  orderedBy: string;
}

export interface LabReportOrder {
  id: string;
  testName: string;
  category: string;
  status: "Ordered" | "Sample Collected" | "In Progress" | "Result Ready" | "Reviewed";
  orderedOn: string;
  resultOn?: string;
  result?: string;
  isAbnormal?: boolean;
  orderedBy: string;
}

export interface ClinicalLogEntry {
  id: string;
  type: "Vitals" | "Medicine" | "Lab" | "Note" | "Diagnosis" | "Nursing" | "Doctor Round";
  title: string;
  description: string;
  timestamp: string;
  recordedBy: string;
}

export interface WardRoundPatient {
  uhid: string;
  patientName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  status: "Stable" | "Critical" | "Under Observation";
  wardRoomBed: string;
  department: string;
  admittingDoctor: string;
  admissionDateTime: string;
  allergies: string[];
  ipdId: string;
  vitals: VitalReading;
  labHighlights: LabHighlight[];
  currentDiagnosis: string;
  diagnosisCode: string;
  // Extended fields for Clinical Overview
  contactNumber?: string;
  guardianName?: string;
  vitalsHistory?: VitalReading[];
  medicines?: MedicineOrder[];
  labReports?: LabReportOrder[];
  clinicalLogs?: ClinicalLogEntry[];
  expectedDischarge?: string;
  daysAdmitted?: number;
}