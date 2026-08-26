// lib/rmo/ipd/rmo-data.ts
import type { DiagnosisCatalogItem, MedicineCatalogItem, RmoPatient } from "@/types/rmo/ipd/rmo-types";

export const CURRENT_RMO = { name: "Dr. Kabir Sen (RMO)", department: "General Medicine" };

export const MEDICINE_CATALOG: MedicineCatalogItem[] = [
  { code: "MED-001", name: "Tab. Aspirin 75mg", strength: "75 mg", route: "Oral" },
  { code: "MED-002", name: "Tab. Metoprolol 25mg", strength: "25 mg", route: "Oral" },
  { code: "MED-003", name: "Tab. Atorvastatin 40mg", strength: "40 mg", route: "Oral" },
  { code: "MED-004", name: "Tab. Clopidogrel 75mg", strength: "75 mg", route: "Oral" },
  { code: "MED-005", name: "Inj. Piperacillin-Tazobactam 4.5g", strength: "4.5 g", route: "IV" },
  { code: "MED-006", name: "Tab. Paracetamol 650mg", strength: "650 mg", route: "Oral" },
  { code: "MED-007", name: "Tab. Amoxiclav 625mg", strength: "625 mg", route: "Oral" },
  { code: "MED-008", name: "Inj. Ceftriaxone 1g", strength: "1 g", route: "IV" },
  { code: "MED-009", name: "Tab. Pantoprazole 40mg", strength: "40 mg", route: "Oral" },
  { code: "MED-010", name: "Syrup Ambroxol", strength: "10 ml", route: "Oral" },
];

export const DIAGNOSIS_CATALOG: DiagnosisCatalogItem[] = [
  { code: "I20.8", name: "Stable Angina" },
  { code: "I21.9", name: "Acute Myocardial Infarction" },
  { code: "A41.9", name: "Sepsis, unspecified organism" },
  { code: "A99", name: "Viral Fever" },
  { code: "A90", name: "Dengue Fever" },
  { code: "J18.9", name: "Community Acquired Pneumonia" },
  { code: "J22", name: "Lower Respiratory Tract Infection" },
  { code: "N17.9", name: "Acute Kidney Injury" },
  { code: "E11.9", name: "Type 2 Diabetes Mellitus" },
  { code: "I10", name: "Essential Hypertension" },
];

export const RMO_PATIENTS: RmoPatient[] = [
  {
    uhid: "UHID12345685", ipdId: "IPD240520-0001", patientName: "Ravi Sharma", age: 48, gender: "Male", bloodGroup: "B+",
    status: "Stable", ward: "Semi Private", room: "Room-2", bed: "B-203", department: "Cardiology",
    attendingDoctor: "Dr. Amit Verma", rmoAssigned: "Dr. Kabir Sen (RMO)", admissionDateTime: "20 Aug 2026, 11:30 AM",
    allergies: ["Penicillin"], contactNumber: "+91 98765 43210", guardianName: "Sunita Sharma (Wife)",
    diagnoses: [
      { id: "DG1", name: "Stable Angina", code: "I20.8", type: "Confirmed", addedBy: "Dr. Amit Verma", addedAt: "20 Aug 2026, 12:00 PM", notes: "ECG changes consistent with ischemia, troponin negative." },
    ],
    vitals: [
      { id: "V1", date: "2026-08-24", dateTime: "24 Aug 2026, 08:00 AM", bp: "120/80", pulse: 78, respRate: 18, spo2: 98, temp: 98.4, pain: 2, recordedBy: "Nurse Kavita", recordedByRole: "Nurse" },
      { id: "V2", date: "2026-08-23", dateTime: "23 Aug 2026, 08:00 PM", bp: "118/78", pulse: 76, respRate: 18, spo2: 98, temp: 99.2, pain: 3, recordedBy: "Nurse Priya", recordedByRole: "Nurse" },
      { id: "V3", date: "2026-08-23", dateTime: "23 Aug 2026, 08:00 AM", bp: "124/82", pulse: 80, respRate: 20, spo2: 96, temp: 98.6, pain: 3, recordedBy: "Dr. Amit Verma", recordedByRole: "Doctor" },
    ],
    doses: [
      { id: "M1", medicineName: "Tab. Aspirin 75mg", medicineCode: "MED-001", strength: "75 mg", route: "Oral", slot: "Morning", scheduledTime: "08:00 AM", date: "2026-08-24", status: "Given", urgency: "Urgent", deliveredFromPharmacyAt: "24 Aug 2026, 06:30 AM", givenBy: "Nurse Kavita", givenAt: "24 Aug 2026, 08:05 AM" },
      { id: "M2", medicineName: "Tab. Metoprolol 25mg", medicineCode: "MED-002", strength: "25 mg", route: "Oral", slot: "Morning", scheduledTime: "08:00 AM", date: "2026-08-24", status: "Given", urgency: "Urgent", deliveredFromPharmacyAt: "24 Aug 2026, 06:30 AM", givenBy: "Nurse Kavita", givenAt: "24 Aug 2026, 08:05 AM" },
      { id: "M3", medicineName: "Tab. Metoprolol 25mg", medicineCode: "MED-002", strength: "25 mg", route: "Oral", slot: "Night", scheduledTime: "08:00 PM", date: "2026-08-24", status: "Pending", urgency: "Urgent", deliveredFromPharmacyAt: "24 Aug 2026, 06:30 AM" },
      { id: "M4", medicineName: "Tab. Clopidogrel 75mg", medicineCode: "MED-004", strength: "75 mg", route: "Oral", slot: "Morning", scheduledTime: "08:00 AM", date: "2026-08-24", status: "Out of Stock", urgency: "Urgent", outOfStockRemark: "Batch exhausted, pharmacy notified" },
    ],
    medicineOrders: [
      { id: "MO1", medicineName: "Tab. Aspirin 75mg", medicineCode: "MED-001", dose: "75 mg", frequency: "Once Daily", durationDays: 7, instructions: "After breakfast", startDate: "2026-08-20", orderedBy: "Dr. Amit Verma", orderedAt: "20 Aug 2026, 12:10 PM" },
      { id: "MO2", medicineName: "Tab. Metoprolol 25mg", medicineCode: "MED-002", dose: "25 mg", frequency: "Twice Daily", durationDays: 7, instructions: "After breakfast and after dinner", startDate: "2026-08-20", orderedBy: "Dr. Amit Verma", orderedAt: "20 Aug 2026, 12:10 PM" },
    ],
    labReports: [
      { id: "L1", date: "2026-08-21", category: "Pathology", testName: "Troponin & CK-MB Panel", orderedBy: "Dr. Amit Verma", reportedAt: "21 Aug 2026, 02:00 PM", pathologyResults: [
        { parameter: "Troponin I", value: "0.008", unit: "ng/mL", refRange: "< 0.04", flag: "Normal" },
        { parameter: "CK-MB", value: "6.8", unit: "ng/mL", refRange: "0.6 - 6.3", flag: "High" },
      ] },
      { id: "L2", date: "2026-08-21", category: "Radiology", testName: "Chest X-Ray PA View", orderedBy: "Dr. Amit Verma", reportedAt: "21 Aug 2026, 03:30 PM", reportImageUrl: "/reports/chest-xray-sample.png", notes: "No cardiomegaly. Lung fields clear. No acute infiltrates." },
    ],
    progressNotes: [
      { id: "PN1", date: "2026-08-24", title: "Morning Ward Round", author: "Dr. Amit Verma", role: "Doctor", category: "Doctor Round", createdAt: "24 Aug 2026, 08:40 AM", noteText: "Patient comfortable at rest. No recurrent chest pain. Continue ACS protocol." },
      { id: "PN2", date: "2026-08-23", title: "Evening Nursing Update", author: "Nurse Priya", role: "Nurse", category: "Nursing Update", createdAt: "23 Aug 2026, 08:00 PM", noteText: "Patient alert and oriented, pain score 1/10." },
    ],
    fluidBalance: [
      { id: "F1", date: "2026-08-24", dateTime: "24 Aug 2026, 08:00 AM", direction: "Intake", route: "Oral", description: "Water + breakfast fluids", volumeMl: 400, recordedBy: "Nurse Kavita" },
      { id: "F2", date: "2026-08-24", dateTime: "24 Aug 2026, 09:00 AM", direction: "Output", route: "Urine", description: "Morning void", volumeMl: 350, recordedBy: "Nurse Kavita" },
    ],
    treatmentPlans: [
      { id: "T1", title: "ACS Protocol Continuation", description: "Continue dual antiplatelet therapy and statin.", orderedBy: "Dr. Amit Verma", orderedOn: "24 Aug 2026, 09:00 AM", followStatus: "Following" },
      { id: "T2", title: "Ambulation Plan", description: "Assist with short supervised walks twice daily.", orderedBy: "Dr. Amit Verma", orderedOn: "24 Aug 2026, 09:00 AM", followStatus: "Not Following" },
    ],
    assignedNurses: [
      { date: "2026-08-24", shift: "Morning", nurseNames: ["Nurse Kavita"] },
      { date: "2026-08-24", shift: "Evening", nurseNames: ["Nurse Priya"] },
      { date: "2026-08-24", shift: "Night", nurseNames: ["Nurse Ritu"] },
      { date: "2026-08-25", shift: "Morning", nurseNames: ["Nurse Kavita"] },
    ],
    handovers: [
      { id: "H1", fromNurse: "Nurse Priya", fromShift: "Night", toNurse: "Nurse Kavita", toShift: "Morning", handoverDateTime: "24 Aug 2026, 06:05 AM", notes: "Slept well, no overnight chest pain." },
    ],
    statusLog: [
      { id: "S1", status: "Stable", changedBy: "Nurse Kavita", changedAt: "24 Aug 2026, 08:10 AM" },
      { id: "S2", status: "Under Observation", changedBy: "Nurse Priya", changedAt: "22 Aug 2026, 09:00 PM", reason: "Mild chest discomfort reported" },
    ],
    billing: {
      totalBillTillToday: 22370, totalPaid: 25000, totalPending: 0, status: "Fully Paid",
      payments: [
        { id: "P1", date: "2026-08-20", dateTime: "20 Aug 2026, 12:15 PM", partyName: "Sunita Sharma", totalAmount: 5000, methods: [{ method: "Cash", amount: 2000 }, { method: "Card", amount: 3000 }], collectedBy: "Front Desk - Priya" },
        { id: "P2", date: "2026-08-24", dateTime: "24 Aug 2026, 09:30 AM", partyName: "Suresh Sharma", totalAmount: 20000, methods: [{ method: "Cash", amount: 10000 }, { method: "Card", amount: 10000 }], collectedBy: "Billing - Ritu Kapoor" },
      ],
    },
  },
  {
    uhid: "UHID12345683", ipdId: "IPD240520-0003", patientName: "Suresh Yadav", age: 55, gender: "Male", bloodGroup: "A+",
    status: "Critical", ward: "ICU", room: "Bay-1", bed: "ICU-03", department: "General Surgery",
    attendingDoctor: "Dr. Rahul Mehta", rmoAssigned: "Dr. Kabir Sen (RMO)", admissionDateTime: "20 Aug 2026, 08:50 AM",
    allergies: ["Sulfa Drugs"], contactNumber: "+91 99887 76655", guardianName: "Manoj Yadav (Son)",
    diagnoses: [{ id: "DG2", name: "Sepsis, unspecified organism", code: "A41.9", type: "Confirmed", addedBy: "Dr. Rahul Mehta", addedAt: "20 Aug 2026, 09:10 AM", notes: "Post-op sepsis with hemodynamic instability." }],
    vitals: [
      { id: "V4", date: "2026-08-24", dateTime: "24 Aug 2026, 08:15 AM", bp: "90/60", pulse: 110, respRate: 26, spo2: 92, temp: 100.8, pain: 6, recordedBy: "Nurse Anjali", recordedByRole: "Nurse" },
      { id: "V5", date: "2026-08-24", dateTime: "24 Aug 2026, 06:00 AM", bp: "88/58", pulse: 114, respRate: 27, spo2: 91, temp: 101.2, pain: 7, recordedBy: "Dr. Rahul Mehta", recordedByRole: "Doctor" },
    ],
    doses: [
      { id: "M5", medicineName: "Inj. Piperacillin-Tazobactam 4.5g", medicineCode: "MED-005", strength: "4.5 g", route: "IV", slot: "Morning", scheduledTime: "08:00 AM", date: "2026-08-24", status: "Given", urgency: "Urgent", deliveredFromPharmacyAt: "24 Aug 2026, 06:00 AM", givenBy: "Nurse Anjali", givenAt: "24 Aug 2026, 08:05 AM" },
      { id: "M6", medicineName: "Inj. Ceftriaxone 1g", medicineCode: "MED-008", strength: "1 g", route: "IV", slot: "Evening", scheduledTime: "06:00 PM", date: "2026-08-24", status: "Pending", urgency: "Urgent" },
    ],
    medicineOrders: [
      { id: "MO3", medicineName: "Inj. Piperacillin-Tazobactam 4.5g", medicineCode: "MED-005", dose: "4.5 g", frequency: "Thrice Daily", durationDays: 5, instructions: "IV infusion over 30 mins", startDate: "2026-08-20", orderedBy: "Dr. Rahul Mehta", orderedAt: "20 Aug 2026, 09:15 AM" },
    ],
    labReports: [
      { id: "L3", date: "2026-08-24", category: "Pathology", testName: "Blood Culture, CBC, CRP", orderedBy: "Dr. Rahul Mehta", reportedAt: "24 Aug 2026, 11:00 AM", pathologyResults: [
        { parameter: "WBC Count", value: "18.2", unit: "x10^3/uL", refRange: "4.0 - 11.0", flag: "High" },
        { parameter: "CRP", value: "142", unit: "mg/L", refRange: "< 10", flag: "High" },
        { parameter: "Platelet Count", value: "98", unit: "x10^3/uL", refRange: "150 - 450", flag: "Low" },
      ] },
    ],
    progressNotes: [{ id: "PN3", date: "2026-08-24", title: "ICU Round Note", author: "Dr. Rahul Mehta", role: "Doctor", category: "Doctor Round", createdAt: "24 Aug 2026, 07:00 AM", noteText: "Patient hemodynamically unstable, on vasopressor support. Sepsis bundle continued." }],
    fluidBalance: [
      { id: "F3", date: "2026-08-24", dateTime: "24 Aug 2026, 08:00 AM", direction: "Intake", route: "IV", description: "NS + antibiotics", volumeMl: 600, recordedBy: "Nurse Anjali" },
      { id: "F4", date: "2026-08-24", dateTime: "24 Aug 2026, 08:30 AM", direction: "Output", route: "Urine", description: "Catheter output", volumeMl: 200, recordedBy: "Nurse Anjali" },
    ],
    treatmentPlans: [{ id: "T3", title: "Sepsis Bundle", description: "IV antibiotics, vasopressor support, hourly monitoring.", orderedBy: "Dr. Rahul Mehta", orderedOn: "24 Aug 2026, 07:00 AM", followStatus: "Following" }],
    assignedNurses: [
      { date: "2026-08-24", shift: "Morning", nurseNames: ["Nurse Anjali", "Nurse Pooja"] },
      { date: "2026-08-24", shift: "Evening", nurseNames: ["Nurse Anjali"] },
      { date: "2026-08-24", shift: "Night", nurseNames: ["Nurse Pooja"] },
    ],
    handovers: [{ id: "H2", fromNurse: "Nurse Pooja", fromShift: "Night", toNurse: "Nurse Anjali", toShift: "Morning", handoverDateTime: "24 Aug 2026, 06:10 AM", notes: "BP trending low, vasopressor titrated overnight." }],
    statusLog: [
      { id: "S3", status: "Critical", changedBy: "Nurse Anjali", changedAt: "24 Aug 2026, 08:20 AM", reason: "Hemodynamic instability, doctor informed" },
      { id: "S4", status: "Under Observation", changedBy: "Nurse Pooja", changedAt: "23 Aug 2026, 10:00 PM" },
    ],
    billing: {
      totalBillTillToday: 44000, totalPaid: 15000, totalPending: 29000, status: "Partially Paid",
      payments: [{ id: "P3", date: "2026-08-21", dateTime: "21 Aug 2026, 05:00 PM", partyName: "Manoj Yadav", totalAmount: 15000, methods: [{ method: "Cash", amount: 15000 }], collectedBy: "Front Desk - Priya" }],
    },
  },
  {
    uhid: "UHID12345684", ipdId: "IPD240520-0002", patientName: "Neha Singh", age: 36, gender: "Female", bloodGroup: "O+",
    status: "Under Observation", ward: "General Ward", room: "Room-5", bed: "G-108", department: "General Medicine",
    attendingDoctor: "Dr. Priya Nair", rmoAssigned: "Dr. Kabir Sen (RMO)", admissionDateTime: "20 Aug 2026, 09:45 AM",
    allergies: [], contactNumber: "+91 91234 56789",
    diagnoses: [{ id: "DG3", name: "Viral Fever", code: "A99", type: "Provisional", addedBy: "Dr. Priya Nair", addedAt: "20 Aug 2026, 10:00 AM" }],
    vitals: [{ id: "V6", date: "2026-08-24", dateTime: "24 Aug 2026, 08:10 AM", bp: "110/70", pulse: 84, respRate: 20, spo2: 97, temp: 99.1, pain: 2, recordedBy: "Nurse Neha", recordedByRole: "Nurse" }],
    doses: [{ id: "M7", medicineName: "Tab. Paracetamol 650mg", medicineCode: "MED-006", strength: "650 mg", route: "Oral", slot: "Morning", scheduledTime: "08:00 AM", date: "2026-08-24", status: "Given", urgency: "Urgent", deliveredFromPharmacyAt: "24 Aug 2026, 07:00 AM", givenBy: "Nurse Neha", givenAt: "24 Aug 2026, 08:10 AM" }],
    medicineOrders: [{ id: "MO4", medicineName: "Tab. Paracetamol 650mg", medicineCode: "MED-006", dose: "650 mg", frequency: "SOS (if fever > 100F)", durationDays: 5, instructions: "After food", startDate: "2026-08-20", orderedBy: "Dr. Priya Nair", orderedAt: "20 Aug 2026, 10:05 AM" }],
    labReports: [{ id: "L4", date: "2026-08-21", category: "Pathology", testName: "Dengue NS1 + CBC", orderedBy: "Dr. Priya Nair", reportedAt: "21 Aug 2026, 01:00 PM", pathologyResults: [
      { parameter: "Dengue NS1 Antigen", value: "Negative", unit: "-", refRange: "Negative", flag: "Normal" },
      { parameter: "Platelet Count", value: "210", unit: "x10^3/uL", refRange: "150 - 450", flag: "Normal" },
    ] }],
    progressNotes: [{ id: "PN4", date: "2026-08-24", title: "Fever Monitoring Note", author: "Nurse Neha", role: "Nurse", category: "Nursing Update", createdAt: "24 Aug 2026, 08:30 AM", noteText: "Temperature settling with antipyretics. Adequate oral intake." }],
    fluidBalance: [],
    treatmentPlans: [{ id: "T4", title: "Antipyretic Protocol", description: "Administer paracetamol for fever above 100F.", orderedBy: "Dr. Priya Nair", orderedOn: "24 Aug 2026, 09:45 AM", followStatus: "Following" }],
    assignedNurses: [
      { date: "2026-08-24", shift: "Morning", nurseNames: ["Nurse Neha"] },
      { date: "2026-08-24", shift: "Evening", nurseNames: ["Nurse Ravi"] },
    ],
    handovers: [],
    statusLog: [{ id: "S5", status: "Under Observation", changedBy: "Nurse Neha", changedAt: "24 Aug 2026, 08:15 AM" }],
    billing: { totalBillTillToday: 3580, totalPaid: 0, totalPending: 3580, status: "Fully Due", payments: [] },
  },
];

export function getRmoPatientByUhid(uhid: string) {
  return RMO_PATIENTS.find((p) => p.uhid === uhid);
}
export const RMO_WARDS = Array.from(new Set(RMO_PATIENTS.map((p) => p.ward)));
export const RMO_DEPARTMENTS = Array.from(new Set(RMO_PATIENTS.map((p) => p.department)));