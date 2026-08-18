// lib/doctor/ipd/ward-round-data.ts
import { WardRoundPatient } from "@/types/doctor/ipd/ward-round-types";

export const WARD_ROUND_PATIENTS: WardRoundPatient[] = [
  {
    uhid: "UHID12345685",
    patientName: "Ravi Sharma",
    age: 48,
    gender: "Male",
    bloodGroup: "B+",
    status: "Stable",
    wardRoomBed: "Semi Private / Room-2 / B-203",
    department: "Cardiology",
    admittingDoctor: "Dr. Amit Verma",
    admissionDateTime: "20 May 2024, 11:30 AM",
    allergies: ["Penicillin"],
    ipdId: "IPD240520-0001",
    contactNumber: "+91 98765 43210",
    guardianName: "Sunita Sharma (Wife)",
    expectedDischarge: "24 May 2024",
    daysAdmitted: 4,
    vitals: { bp: "120/80", pulse: "78", temp: "98.4", rr: "18", spo2: "98", pain: "0", recordedOn: "20 May 2024, 08:00 AM" },
    vitalsHistory: [
      { bp: "120/80", pulse: "78", temp: "98.4", rr: "18", spo2: "98", pain: "0", recordedOn: "20 May 2024, 08:00 AM" },
      { bp: "124/82", pulse: "80", temp: "98.6", rr: "18", spo2: "97", pain: "1", recordedOn: "19 May 2024, 08:00 PM" },
      { bp: "128/84", pulse: "82", temp: "99.0", rr: "19", spo2: "97", pain: "1", recordedOn: "19 May 2024, 08:00 AM" },
    ],
    labHighlights: [
      { name: "Hb", value: "13.2 g/dL", date: "19 May" },
      { name: "WBC", value: "7,400 /µL", date: "19 May" },
      { name: "Creatinine", value: "1.1 mg/dL", date: "19 May" },
      { name: "Troponin-I", value: "0.02 ng/mL", date: "19 May" },
    ],
    currentDiagnosis: "Stable Angina",
    diagnosisCode: "I20.8",
    medicines: [
      { id: "M1", name: "Aspirin 75mg", dosage: "75mg", route: "Oral", frequency: "OD", status: "Given", scheduledTime: "08:00 AM", givenBy: "Nurse Kavita", givenAt: "08:05 AM", orderedBy: "Dr. Amit Verma" },
      { id: "M2", name: "Atorvastatin 40mg", dosage: "40mg", route: "Oral", frequency: "HS", status: "Pending", scheduledTime: "09:00 PM", orderedBy: "Dr. Amit Verma" },
      { id: "M3", name: "Metoprolol 25mg", dosage: "25mg", route: "Oral", frequency: "BD", status: "Given", scheduledTime: "08:00 AM", givenBy: "Nurse Kavita", givenAt: "08:05 AM", orderedBy: "Dr. Amit Verma" },
      { id: "M4", name: "Metoprolol 25mg", dosage: "25mg", route: "Oral", frequency: "BD", status: "Pending", scheduledTime: "08:00 PM", orderedBy: "Dr. Amit Verma" },
      { id: "M5", name: "Clopidogrel 75mg", dosage: "75mg", route: "Oral", frequency: "OD", status: "Held", scheduledTime: "08:00 AM", orderedBy: "Dr. Amit Verma" },
    ],
    labReports: [
      { id: "L1", testName: "Troponin-I", category: "Cardiac Markers", status: "Reviewed", orderedOn: "19 May 2024, 07:00 AM", resultOn: "19 May 2024, 10:30 AM", result: "0.02 ng/mL", isAbnormal: false, orderedBy: "Dr. Amit Verma" },
      { id: "L2", testName: "Lipid Profile", category: "Biochemistry", status: "Result Ready", orderedOn: "19 May 2024, 07:00 AM", resultOn: "19 May 2024, 11:00 AM", result: "LDL 142 mg/dL (High)", isAbnormal: true, orderedBy: "Dr. Amit Verma" },
      { id: "L3", testName: "2D Echo", category: "Cardiology", status: "In Progress", orderedOn: "20 May 2024, 09:00 AM", orderedBy: "Dr. Amit Verma" },
      { id: "L4", testName: "CBC", category: "Hematology", status: "Ordered", orderedOn: "20 May 2024, 08:30 AM", orderedBy: "Dr. Amit Verma" },
    ],
    clinicalLogs: [
      { id: "C1", type: "Doctor Round", title: "Morning Ward Round", description: "Patient stable, chest pain resolved. Continue current medication plan.", timestamp: "20 May 2024, 09:15 AM", recordedBy: "Dr. Amit Verma" },
      { id: "C2", type: "Vitals", title: "Vitals Recorded", description: "BP 120/80, Pulse 78, SpO2 98%. Within normal range.", timestamp: "20 May 2024, 08:00 AM", recordedBy: "Nurse Kavita" },
      { id: "C3", type: "Medicine", title: "Morning Medication Administered", description: "Aspirin 75mg and Metoprolol 25mg given as scheduled.", timestamp: "20 May 2024, 08:05 AM", recordedBy: "Nurse Kavita" },
      { id: "C4", type: "Lab", title: "2D Echo Ordered", description: "Ordered to assess cardiac function following stable angina diagnosis.", timestamp: "20 May 2024, 09:00 AM", recordedBy: "Dr. Amit Verma" },
      { id: "C5", type: "Nursing", title: "Nursing Assessment", description: "Patient comfortable, no acute distress. Pain score 0/10.", timestamp: "19 May 2024, 08:00 PM", recordedBy: "Nurse Priya" },
    ],
  },
  {
    uhid: "UHID12345684",
    patientName: "Neha Singh",
    age: 36,
    gender: "Female",
    bloodGroup: "O+",
    status: "Under Observation",
    wardRoomBed: "General Ward / Room-5 / G-108",
    department: "General Medicine",
    admittingDoctor: "Dr. Priya Nair",
    admissionDateTime: "20 May 2024, 09:45 AM",
    allergies: [],
    ipdId: "IPD240520-0002",
    contactNumber: "+91 91234 56789",
    guardianName: "Rakesh Singh (Husband)",
    expectedDischarge: "22 May 2024",
    daysAdmitted: 1,
    vitals: { bp: "110/70", pulse: "84", temp: "99.1", rr: "20", spo2: "97", pain: "2", recordedOn: "20 May 2024, 08:10 AM" },
    vitalsHistory: [
      { bp: "110/70", pulse: "84", temp: "99.1", rr: "20", spo2: "97", pain: "2", recordedOn: "20 May 2024, 08:10 AM" },
      { bp: "108/68", pulse: "88", temp: "100.2", rr: "21", spo2: "96", pain: "3", recordedOn: "19 May 2024, 09:00 PM" },
    ],
    labHighlights: [
      { name: "Hb", value: "11.8 g/dL", date: "19 May" },
      { name: "WBC", value: "9,100 /µL", date: "19 May" },
    ],
    currentDiagnosis: "Viral Fever",
    diagnosisCode: "A99",
    medicines: [
      { id: "M1", name: "Paracetamol 650mg", dosage: "650mg", route: "Oral", frequency: "TDS", status: "Given", scheduledTime: "08:00 AM", givenBy: "Nurse Kavita", givenAt: "08:10 AM", orderedBy: "Dr. Priya Nair" },
      { id: "M2", name: "Paracetamol 650mg", dosage: "650mg", route: "Oral", frequency: "TDS", status: "Pending", scheduledTime: "02:00 PM", orderedBy: "Dr. Priya Nair" },
      { id: "M3", name: "ORS Sachets", dosage: "1 sachet", route: "Oral", frequency: "SOS", status: "Given", scheduledTime: "09:00 AM", givenBy: "Nurse Kavita", givenAt: "09:05 AM", orderedBy: "Dr. Priya Nair" },
    ],
    labReports: [
      { id: "L1", testName: "CBC", category: "Hematology", status: "Reviewed", orderedOn: "19 May 2024, 10:00 AM", resultOn: "19 May 2024, 01:00 PM", result: "WBC 9,100 /µL (Normal)", isAbnormal: false, orderedBy: "Dr. Priya Nair" },
      { id: "L2", testName: "Dengue NS1", category: "Serology", status: "Result Ready", orderedOn: "19 May 2024, 10:00 AM", resultOn: "19 May 2024, 03:00 PM", result: "Negative", isAbnormal: false, orderedBy: "Dr. Priya Nair" },
      { id: "L3", testName: "Malaria Antigen", category: "Serology", status: "Sample Collected", orderedOn: "20 May 2024, 08:00 AM", orderedBy: "Dr. Priya Nair" },
    ],
    clinicalLogs: [
      { id: "C1", type: "Doctor Round", title: "Morning Ward Round", description: "Fever persists intermittently. Continue antipyretics, awaiting malaria report.", timestamp: "20 May 2024, 09:30 AM", recordedBy: "Dr. Priya Nair" },
      { id: "C2", type: "Vitals", title: "Vitals Recorded", description: "Temp 99.1F, mild tachycardia. Monitoring advised.", timestamp: "20 May 2024, 08:10 AM", recordedBy: "Nurse Kavita" },
      { id: "C3", type: "Medicine", title: "Morning Medication Administered", description: "Paracetamol 650mg given for fever.", timestamp: "20 May 2024, 08:10 AM", recordedBy: "Nurse Kavita" },
    ],
  },
  {
    uhid: "UHID12345683",
    patientName: "Suresh Yadav",
    age: 55,
    gender: "Male",
    bloodGroup: "A+",
    status: "Critical",
    wardRoomBed: "ICU / Bed-3 / ICU-03",
    department: "General Surgery",
    admittingDoctor: "Dr. Rahul Mehta",
    admissionDateTime: "20 May 2024, 08:50 AM",
    allergies: ["Sulfa Drugs"],
    ipdId: "IPD240520-0003",
    contactNumber: "+91 99887 76655",
    guardianName: "Manoj Yadav (Son)",
    expectedDischarge: "TBD",
    daysAdmitted: 6,
    vitals: { bp: "90/60", pulse: "110", temp: "100.8", rr: "26", spo2: "92", pain: "6", recordedOn: "20 May 2024, 08:15 AM" },
    vitalsHistory: [
      { bp: "90/60", pulse: "110", temp: "100.8", rr: "26", spo2: "92", pain: "6", recordedOn: "20 May 2024, 08:15 AM" },
      { bp: "94/62", pulse: "106", temp: "101.4", rr: "25", spo2: "93", pain: "7", recordedOn: "19 May 2024, 08:00 PM" },
      { bp: "88/58", pulse: "114", temp: "102.0", rr: "27", spo2: "91", pain: "7", recordedOn: "19 May 2024, 02:00 PM" },
    ],
    labHighlights: [{ name: "Hb", value: "9.4 g/dL", date: "19 May" }],
    currentDiagnosis: "Post-Op Sepsis",
    diagnosisCode: "A41.9",
    medicines: [
      { id: "M1", name: "Piperacillin-Tazobactam", dosage: "4.5g", route: "IV", frequency: "QID", status: "Given", scheduledTime: "08:00 AM", givenBy: "Nurse Anjali", givenAt: "08:05 AM", orderedBy: "Dr. Rahul Mehta" },
      { id: "M2", name: "Piperacillin-Tazobactam", dosage: "4.5g", route: "IV", frequency: "QID", status: "Pending", scheduledTime: "02:00 PM", orderedBy: "Dr. Rahul Mehta" },
      { id: "M3", name: "Noradrenaline Infusion", dosage: "0.1 mcg/kg/min", route: "IV", frequency: "Continuous", status: "Given", scheduledTime: "Continuous", givenBy: "Nurse Anjali", givenAt: "Ongoing", orderedBy: "Dr. Rahul Mehta" },
      { id: "M4", name: "Paracetamol IV", dosage: "1g", route: "IV", frequency: "SOS", status: "Pending", scheduledTime: "As needed", orderedBy: "Dr. Rahul Mehta" },
      { id: "M5", name: "Pantoprazole", dosage: "40mg", route: "IV", frequency: "OD", status: "Discontinued", scheduledTime: "08:00 AM", orderedBy: "Dr. Rahul Mehta" },
    ],
    labReports: [
      { id: "L1", testName: "Blood Culture", category: "Microbiology", status: "In Progress", orderedOn: "19 May 2024, 09:00 AM", orderedBy: "Dr. Rahul Mehta" },
      { id: "L2", testName: "Procalcitonin", category: "Sepsis Markers", status: "Result Ready", orderedOn: "19 May 2024, 09:00 AM", resultOn: "19 May 2024, 02:00 PM", result: "4.8 ng/mL (Critical)", isAbnormal: true, orderedBy: "Dr. Rahul Mehta" },
      { id: "L3", testName: "Lactate", category: "Critical Care", status: "Reviewed", orderedOn: "20 May 2024, 07:00 AM", resultOn: "20 May 2024, 07:45 AM", result: "3.2 mmol/L (High)", isAbnormal: true, orderedBy: "Dr. Rahul Mehta" },
      { id: "L4", testName: "CBC with Differential", category: "Hematology", status: "Reviewed", orderedOn: "20 May 2024, 07:00 AM", resultOn: "20 May 2024, 07:45 AM", result: "WBC 18,400 /µL (High)", isAbnormal: true, orderedBy: "Dr. Rahul Mehta" },
    ],
    clinicalLogs: [
      { id: "C1", type: "Doctor Round", title: "ICU Critical Care Round", description: "Patient remains critical. Lactate rising, escalate antibiotic coverage, continue vasopressor support.", timestamp: "20 May 2024, 08:30 AM", recordedBy: "Dr. Rahul Mehta" },
      { id: "C2", type: "Vitals", title: "Vitals Recorded - Critical", description: "BP 90/60, SpO2 92% on supplemental O2. Continuous monitoring in place.", timestamp: "20 May 2024, 08:15 AM", recordedBy: "Nurse Anjali" },
      { id: "C3", type: "Lab", title: "Lactate & CBC Results Reviewed", description: "Lactate 3.2 mmol/L, WBC 18,400 /µL - indicative of ongoing sepsis response.", timestamp: "20 May 2024, 07:45 AM", recordedBy: "Dr. Rahul Mehta" },
      { id: "C4", type: "Medicine", title: "Antibiotic Administered", description: "Piperacillin-Tazobactam 4.5g IV given as per sepsis protocol.", timestamp: "20 May 2024, 08:05 AM", recordedBy: "Nurse Anjali" },
      { id: "C5", type: "Nursing", title: "Hourly ICU Monitoring", description: "Continuous vitals and urine output monitoring. Patient on noradrenaline support.", timestamp: "19 May 2024, 08:00 PM", recordedBy: "Nurse Anjali" },
    ],
  },
];

export function getPatientByUhid(uhid: string) {
  return WARD_ROUND_PATIENTS.find((p) => p.uhid === uhid) ?? WARD_ROUND_PATIENTS[0];
}

export function getAllWardPatients() {
  return WARD_ROUND_PATIENTS;
}

export const DEPARTMENT_OPTIONS = Array.from(new Set(WARD_ROUND_PATIENTS.map((p) => p.department)));
export const STATUS_OPTIONS: Array<WardRoundPatient["status"]> = ["Stable", "Under Observation", "Critical"];