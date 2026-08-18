import type { OPDAppointment } from "@/types/doctor/opd/opd-types";

export interface VitalRecord {
  date: string;
  bp: string;
  pulse: string;
  temp: string;
  spo2: string;
  weight: string;
}

export interface ConsultationRecord {
  date: string;
  doctor: string;
  diagnosis: string;
  notes: string;
  medicines: string[];
  labs: string[];
  followUp: string;
}

export interface MedicineRecord {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  startDate: string;
}

export interface LabReportRecord {
  date: string;
  test: string;
  result: string;
  status: string;
  priority: string;
}

export interface PatientFullProfile extends OPDAppointment {
  bloodGroup: string;
  chronicConditions: string[];
  vitalsHistory: VitalRecord[];
  consultationHistory: ConsultationRecord[];
  medicineHistory: MedicineRecord[];
  labHistory: LabReportRecord[];
}

// Master patient dataset - single source of truth for both appointments & consultation pages
export const OPD_PATIENTS: PatientFullProfile[] = [
  {
    id: "1",
    uhid: "UHID245812",
    appointmentNo: "OPD-260813-042",
    patientName: "Mr. Suresh Yadav",
    age: 54,
    gender: "Male",
    patientType: "follow-up",
    visitType: "in-person",
    time: "09:30 AM",
    reason: "Fever with productive cough, 3 days",
    doctor: "Dr. Arindam Sen",
    status: "checked-in",
    vitals: { bp: "138/86", pulse: "96", temp: "101.2", spo2: "95" },
    allergies: ["Penicillin - rash and facial swelling (2022)", "Diclofenac - gastritis (2026)"],
    bloodGroup: "B+",
    chronicConditions: ["Type 2 Diabetes Mellitus", "Essential Hypertension"],
    vitalsHistory: [
      { date: "13 Aug 2026", bp: "138/86", pulse: "96", temp: "101.2", spo2: "95", weight: "68" },
      { date: "21 Jul 2026", bp: "142/88", pulse: "88", temp: "98.6", spo2: "97", weight: "67.4" },
      { date: "15 Jun 2026", bp: "140/85", pulse: "92", temp: "98.4", spo2: "96", weight: "67" },
    ],
    consultationHistory: [
      {
        date: "21 Jul 2026",
        doctor: "Dr. Arindam Sen",
        diagnosis: "Type 2 Diabetes Mellitus - Follow-up",
        notes: "HbA1c review. Continue current medications. Diet and exercise counselling provided.",
        medicines: ["Metformin 500mg BD", "Telmisartan 40mg OD"],
        labs: ["HbA1c", "Lipid Profile"],
        followUp: "21 Oct 2026",
      },
      {
        date: "15 Jun 2026",
        doctor: "Dr. Arindam Sen",
        diagnosis: "Essential Hypertension",
        notes: "BP monitoring. Lifestyle modifications advised.",
        medicines: ["Amlodipine 5mg OD", "Telmisartan 40mg OD"],
        labs: ["ECG", "Kidney Function Test"],
        followUp: "15 Jul 2026",
      },
    ],
    medicineHistory: [
      { name: "Metformin 500mg", dosage: "500 mg PO", frequency: "BD", duration: "30 days", startDate: "21 Jul 2026" },
      { name: "Telmisartan 40mg", dosage: "40 mg PO", frequency: "OD", duration: "30 days", startDate: "15 Jun 2026" },
      { name: "Amlodipine 5mg", dosage: "5 mg PO", frequency: "OD", duration: "30 days", startDate: "15 Jun 2026" },
    ],
    labHistory: [
      { date: "21 Jul 2026", test: "HbA1c", result: "7.8%", status: "High", priority: "routine" },
      { date: "21 Jul 2026", test: "Lipid Profile", result: "Total Cholesterol: 210 mg/dL", status: "Borderline", priority: "routine" },
      { date: "15 Jun 2026", test: "ECG", result: "Normal Sinus Rhythm", status: "Normal", priority: "routine" },
      { date: "15 Jun 2026", test: "Kidney Function Test", result: "eGFR: 76 mL/min", status: "Normal", priority: "routine" },
    ],
  },
  {
    id: "2",
    uhid: "UHID198234",
    appointmentNo: "OPD-260813-043",
    patientName: "Mr. Rajesh Kumar",
    age: 42,
    gender: "Male",
    patientType: "new",
    visitType: "in-person",
    time: "10:00 AM",
    reason: "Diabetes follow-up",
    doctor: "Dr. Arindam Sen",
    status: "waiting",
    bloodGroup: "O+",
    chronicConditions: [],
    allergies: [],
    vitalsHistory: [],
    consultationHistory: [],
    medicineHistory: [],
    labHistory: [],
  },
  {
    id: "3",
    uhid: "UHID312456",
    appointmentNo: "OPD-260813-044",
    patientName: "Ms. Priya Sharma",
    age: 28,
    gender: "Female",
    patientType: "follow-up",
    visitType: "video",
    time: "10:30 AM",
    reason: "Hypertension review",
    doctor: "Dr. Arindam Sen",
    status: "scheduled",
    bloodGroup: "A+",
    chronicConditions: ["Essential Hypertension"],
    allergies: ["Sulfa drugs - hives (2024)"],
    vitalsHistory: [
      { date: "10 Jul 2026", bp: "128/82", pulse: "78", temp: "98.2", spo2: "98", weight: "58" },
    ],
    consultationHistory: [
      {
        date: "10 Jul 2026",
        doctor: "Dr. Arindam Sen",
        diagnosis: "Essential Hypertension - Stable",
        notes: "BP well controlled. Continue current medication.",
        medicines: ["Amlodipine 5mg OD"],
        labs: ["Kidney Function Test"],
        followUp: "10 Oct 2026",
      },
    ],
    medicineHistory: [
      { name: "Amlodipine 5mg", dosage: "5 mg PO", frequency: "OD", duration: "90 days", startDate: "10 Jul 2026" },
    ],
    labHistory: [
      { date: "10 Jul 2026", test: "Kidney Function Test", result: "eGFR: 92 mL/min", status: "Normal", priority: "routine" },
    ],
  },
  {
    id: "4",
    uhid: "UHID445678",
    appointmentNo: "OPD-260813-045",
    patientName: "Mr. Amit Das",
    age: 35,
    gender: "Male",
    patientType: "new",
    visitType: "in-person",
    time: "11:00 AM",
    reason: "Skin rash",
    doctor: "Dr. Arindam Sen",
    status: "completed",
    bloodGroup: "AB+",
    chronicConditions: [],
    allergies: [],
    vitalsHistory: [],
    consultationHistory: [],
    medicineHistory: [],
    labHistory: [],
  },
];

export function getPatientByUhid(uhid: string): PatientFullProfile | undefined {
  return OPD_PATIENTS.find((p) => p.uhid === uhid);
}

export function getAllAppointments(): PatientFullProfile[] {
  return OPD_PATIENTS;
}