// lib/emergency/emergency-data.ts
// Shared mock data across ALL emergency-module roles.
import type {
  DiagnosisCatalogItem, EmergencyPatient, MedicineCatalogItem,
} from "@/types/emergency/emergency-types";

export const NEAREST_POLICE_STATIONS = ["Sector 14 Police Station", "MG Road Police Station", "City Central Police Station", "Rajpur Police Chowki"];
export const EMERGENCY_NURSES = ["Nurse Kavita", "Nurse Priya", "Nurse Anjali", "Nurse Neha", "Nurse Ravi", "Nurse Pooja", "Nurse Ritu"];
export const EMERGENCY_DOCTORS = ["Dr. Amit Verma", "Dr. Rahul Mehta", "Dr. Priya Nair", "Dr. Sanjana Ghosh"];
export const EMERGENCY_RMOS = ["Dr. Kabir Sen (RMO)", "Dr. Ayesha Khan (RMO)", "Dr. Vivek Rao (RMO)"];

export const ROUTE_OPTIONS = ["Oral", "IV", "IM", "Topical", "Inhalation"] as const;
export const FREQUENCY_OPTIONS = ["OD", "BD", "TDS", "QID", "HS", "PRN"] as const;

export const MEDICINE_CATALOG: MedicineCatalogItem[] = [
  { code: "MED-001", name: "Tab. Aspirin 75mg", strength: "75 mg", route: "Oral", defaultDose: "75 mg", defaultFrequency: "OD", defaultDuration: "10 days", defaultInstructions: "After meal" },
  { code: "MED-005", name: "Inj. Piperacillin-Tazobactam 4.5g", strength: "4.5 g", route: "IV", defaultDose: "4.5 g", defaultFrequency: "TDS", defaultDuration: "7 days", defaultInstructions: "As directed" },
  { code: "MED-006", name: "Tab. Paracetamol 650mg", strength: "650 mg", route: "Oral", defaultDose: "650 mg", defaultFrequency: "TDS", defaultDuration: "5 days", defaultInstructions: "After meal" },
  { code: "MED-008", name: "Inj. Ceftriaxone 1g", strength: "1 g", route: "IV", defaultDose: "1 g", defaultFrequency: "BD", defaultDuration: "7 days", defaultInstructions: "As directed" },
  { code: "MED-011", name: "Inj. Tetanus Toxoid", strength: "0.5 mL", route: "IM", defaultDose: "0.5 mL", defaultFrequency: "OD", defaultDuration: "1 day", defaultInstructions: "As directed" },
  { code: "MED-012", name: "Inj. Tramadol 50mg", strength: "50 mg", route: "IV", defaultDose: "50 mg", defaultFrequency: "PRN", defaultDuration: "3 days", defaultInstructions: "As directed" },
  { code: "MED-013", name: "Inj. Adrenaline 1mg", strength: "1 mg", route: "IV", defaultDose: "1 mg", defaultFrequency: "PRN", defaultDuration: "1 day", defaultInstructions: "As directed" },
  { code: "MED-014", name: "Tab. Ondansetron 4mg", strength: "4 mg", route: "Oral", defaultDose: "4 mg", defaultFrequency: "TDS", defaultDuration: "3 days", defaultInstructions: "Before meal" },
];


export const DIAGNOSIS_CATALOG: DiagnosisCatalogItem[] = [
  { code: "I20.8", name: "Stable Angina" },
  { code: "I21.9", name: "Acute Myocardial Infarction" },
  { code: "I63.9", name: "Acute Ischemic Stroke" },
  { code: "S06.0", name: "Traumatic Brain Injury" },
  { code: "T14.90", name: "Multiple Traumatic Injuries (RTA)" },
  { code: "T39.9", name: "Poisoning, unspecified drug" },
  { code: "X78", name: "Self-harm by sharp object" },
  { code: "I46.9", name: "Cardiac Arrest" },
  { code: "R06.0", name: "Dyspnea / Breathing Difficulty" },
  { code: "G40.9", name: "Seizure Disorder" },
];

export const EMERGENCY_PATIENTS: EmergencyPatient[] = [
  {
    emergencyNumber: "ER-20260827-001", uhid: "UHID12345685", isExistingPatient: true,
    patientName: "Ravi Sharma", dateOfBirth: "1978-04-12", age: 48, gender: "Male",
    mobileNumber: "+91 98765 43210", attendantName: "Sunita Sharma", aadharNumber: "XXXX-XXXX-4521",
    ayushmanCardNumber: "PMJAY-77229981", emergencyContactNumber: "+91 98765 00011", address: "12, MG Colony, Sector 14",
    arrivalMode: "Ambulance", referredFrom: "", incidentType: "Chest Pain", broughtBy: "108 Ambulance Crew",
    policeInformationNeeded: false, registeredAt: "27 Aug 2026, 07:10 AM", registeredBy: "Front Desk - Priya",
    status: "Critical", currentCondition: "Complains of severe chest pain radiating to left arm, diaphoretic.",
    attendingDoctor: "Dr. Amit Verma", assignedRmo: "Dr. Kabir Sen (RMO)", assignedNurse: "Nurse Kavita", bedOrBay: "ER-Bay-2",
    allergies: ["Penicillin"],
    vitals: [
      { id: "V1", date: "2026-08-27", dateTime: "27 Aug 2026, 07:15 AM", bp: "150/95", pulse: 108, respRate: 24, spo2: 94, temp: 99.1, pain: 8, recordedBy: "Nurse Kavita", recordedByRole: "Nurse" },
      { id: "V2", date: "2026-08-27", dateTime: "27 Aug 2026, 07:30 AM", bp: "142/90", pulse: 100, respRate: 22, spo2: 96, temp: 98.9, pain: 6, recordedBy: "Dr. Kabir Sen (RMO)", recordedByRole: "RMO" },
    ],
    diagnoses: [{ id: "DG1", name: "Acute Myocardial Infarction", code: "I21.9", type: "Provisional", addedBy: "Dr. Amit Verma", addedAt: "27 Aug 2026, 07:40 AM", notes: "ECG shows ST elevation in leads II, III, aVF." }],
    doses: [
      { id: "M1", medicineName: "Tab. Aspirin 75mg", medicineCode: "MED-001", strength: "75 mg", route: "Oral", slot: "Immediate", scheduledTime: "07:20 AM", date: "2026-08-27", status: "Given", urgency: "Urgent", deliveredFromPharmacyAt: "27 Aug 2026, 07:18 AM", givenBy: "Nurse Kavita", givenAt: "27 Aug 2026, 07:22 AM", instructions: "After meal" },
      { id: "M2", medicineName: "Inj. Tramadol 50mg", medicineCode: "MED-012", strength: "50 mg", route: "IV", slot: "Immediate", scheduledTime: "07:25 AM", date: "2026-08-27", status: "Pending", urgency: "Urgent" },
    ],
    labReports: [
      { id: "L1", date: "2026-08-27", category: "Pathology", testName: "Troponin I (Stat)", orderedBy: "Dr. Amit Verma", reportedAt: "27 Aug 2026, 07:45 AM", pathologyResults: [{ parameter: "Troponin I", value: "1.8", unit: "ng/mL", refRange: "< 0.04", flag: "High" }] },
      { id: "L2", date: "2026-08-27", category: "Radiology", testName: "Chest X-Ray Portable", orderedBy: "Dr. Amit Verma", reportedAt: "27 Aug 2026, 07:50 AM", reportImageUrl: "/reports/chest-xray-er.png", notes: "No pneumothorax. Mild cardiomegaly." },
    ],
    progressNotes: [{ id: "PN1", date: "2026-08-27", title: "ER Triage Note", author: "Dr. Kabir Sen (RMO)", role: "RMO", category: "Triage", createdAt: "27 Aug 2026, 07:20 AM", noteText: "Patient triaged as Priority 1. ECG and troponin ordered immediately. Cardiology on-call notified." }],
    treatmentPlans: [{ id: "T1", title: "ACS Protocol - Emergency", description: "Aspirin, oxygen, IV access, urgent cardiology consult, prepare for cath lab.", orderedBy: "Dr. Amit Verma", orderedByRole: "Doctor", orderedOn: "27 Aug 2026, 07:40 AM", followStatus: "Following" }],
    assignedNurses: [{ date: "2026-08-27", shift: "Morning", nurseNames: ["Nurse Kavita"] }],
    handovers: [],
    statusLog: [{ id: "S1", status: "Critical", changedBy: "Dr. Kabir Sen (RMO)", changedAt: "27 Aug 2026, 07:20 AM", reason: "Suspected STEMI" }],
    police: { caseType: "None", nearestPoliceStation: "", informed: false },
  },
  {
    emergencyNumber: "ER-20260827-002", uhid: "UHID12398211", isExistingPatient: false,
    patientName: "Unknown Male (RTA)", dateOfBirth: undefined, age: 30, gender: "Male",
    mobileNumber: "", attendantName: "", aadharNumber: "", ayushmanCardNumber: "", emergencyContactNumber: "", address: "",
    arrivalMode: "Police", referredFrom: "", incidentType: "Accident (RTA)", broughtBy: "Traffic Police Constable Rakesh",
    policeInformationNeeded: true, registeredAt: "27 Aug 2026, 08:05 AM", registeredBy: "Front Desk - Priya",
    status: "Shifted to OT", currentCondition: "Unconscious on arrival, multiple lacerations, suspected internal bleeding.",
    attendingDoctor: "Dr. Rahul Mehta", assignedRmo: "Dr. Vivek Rao (RMO)", assignedNurse: "Nurse Anjali", bedOrBay: "ER-Bay-1 (Trauma)",
    allergies: [],
    vitals: [{ id: "V3", date: "2026-08-27", dateTime: "27 Aug 2026, 08:10 AM", bp: "88/56", pulse: 122, respRate: 28, spo2: 90, temp: 97.8, pain: 10, recordedBy: "Nurse Anjali", recordedByRole: "Nurse" }],
    diagnoses: [{ id: "DG2", name: "Multiple Traumatic Injuries (RTA)", code: "T14.90", type: "Confirmed", addedBy: "Dr. Rahul Mehta", addedAt: "27 Aug 2026, 08:20 AM", notes: "FAST scan positive for free fluid, likely splenic injury. Rushed to OT.",  }],
    doses: [{ id: "M3", medicineName: "Inj. Adrenaline 1mg", medicineCode: "MED-013", strength: "1 mg", route: "IV", slot: "Immediate", scheduledTime: "08:12 AM", date: "2026-08-27", status: "Given", urgency: "Urgent", givenBy: "Nurse Anjali", givenAt: "27 Aug 2026, 08:13 AM", instructions: "After meal" }],
    labReports: [{ id: "L3", date: "2026-08-27", category: "Radiology", testName: "FAST Abdomen Scan", orderedBy: "Dr. Rahul Mehta", reportedAt: "27 Aug 2026, 08:18 AM", reportImageUrl: "/reports/fast-scan-er.png", notes: "Free fluid in Morrison's pouch, suggestive of splenic injury." }],
    progressNotes: [{ id: "PN2", date: "2026-08-27", title: "Trauma Team Activation", author: "Dr. Rahul Mehta", role: "Doctor", category: "Trauma", createdAt: "27 Aug 2026, 08:15 AM", noteText: "Trauma protocol activated. Surgery team informed, OT prepared for emergency laparotomy." }],
    treatmentPlans: [{ id: "T2", title: "Emergency Laparotomy", description: "Immediate surgical exploration for suspected splenic injury and internal bleeding.", orderedBy: "Dr. Rahul Mehta", orderedByRole: "Doctor", orderedOn: "27 Aug 2026, 08:20 AM", followStatus: "Following" }],
    assignedNurses: [{ date: "2026-08-27", shift: "Morning", nurseNames: ["Nurse Anjali", "Nurse Pooja"] }],
    handovers: [],
    statusLog: [
      { id: "S2", status: "Critical", changedBy: "Dr. Vivek Rao (RMO)", changedAt: "27 Aug 2026, 08:10 AM" },
      { id: "S3", status: "Shifted to OT", changedBy: "Dr. Rahul Mehta", changedAt: "27 Aug 2026, 08:25 AM", reason: "Emergency laparotomy required" },
    ],
    police: { caseType: "Accident", nearestPoliceStation: "MG Road Police Station", informed: true, informedAt: "27 Aug 2026, 08:15 AM", informedBy: "Front Desk - Priya", firNumber: "FIR-2026-3312", remarks: "Hit and run case, traffic police already at scene." },
  },
  {
    emergencyNumber: "ER-20260827-003", uhid: "UHID12345750", isExistingPatient: false,
    patientName: "Meera Joshi", dateOfBirth: "1995-11-02", age: 30, gender: "Female",
    mobileNumber: "+91 90011 22334", attendantName: "Ramesh Joshi (Father)", aadharNumber: "", ayushmanCardNumber: "",
    emergencyContactNumber: "+91 90011 99887", address: "45, Green Park Extension",
    arrivalMode: "Walk-In", referredFrom: "", incidentType: "Suicide Attempt", broughtBy: "Family Member",
    policeInformationNeeded: true, registeredAt: "27 Aug 2026, 09:00 AM", registeredBy: "Front Desk - Priya",
    status: "Under Observation", currentCondition: "Conscious, drowsy, alleged consumption of unknown tablets ~2 hours ago.",
    attendingDoctor: "Dr. Priya Nair", assignedRmo: "Dr. Ayesha Khan (RMO)", assignedNurse: "Nurse Neha", bedOrBay: "ER-Bay-4",
    allergies: [],
    vitals: [{ id: "V4", date: "2026-08-27", dateTime: "27 Aug 2026, 09:05 AM", bp: "110/70", pulse: 92, respRate: 20, spo2: 97, temp: 98.2, pain: 1, recordedBy: "Nurse Neha", recordedByRole: "Nurse" }],
    diagnoses: [{ id: "DG3", name: "Poisoning, unspecified drug", code: "T39.9", type: "Provisional", addedBy: "Dr. Priya Nair", addedAt: "27 Aug 2026, 09:15 AM", notes: "Gastric lavage performed. Activated charcoal administered." }],
    doses: [{ id: "M4", medicineName: "Tab. Ondansetron 4mg", medicineCode: "MED-014", strength: "4 mg", route: "Oral", slot: "Immediate", scheduledTime: "09:20 AM", date: "2026-08-27", status: "Given", urgency: "Routine", givenBy: "Nurse Neha", givenAt: "27 Aug 2026, 09:22 AM" }],
    labReports: [{ id: "L4", date: "2026-08-27", category: "Pathology", testName: "Liver Function Test + Toxicology Screen", orderedBy: "Dr. Priya Nair", reportedAt: "27 Aug 2026, 10:00 AM", pathologyResults: [{ parameter: "SGPT (ALT)", value: "42", unit: "U/L", refRange: "7 - 56", flag: "Normal" }, { parameter: "Paracetamol Level", value: "18", unit: "mcg/mL", refRange: "< 10 (4hr)", flag: "High" }] }],
    progressNotes: [
      { id: "PN3", date: "2026-08-27", title: "Psychiatric Liaison Note", author: "Dr. Ayesha Khan (RMO)", role: "RMO", category: "Psychiatric Referral", createdAt: "27 Aug 2026, 09:30 AM", noteText: "Patient stable, psychiatry consult requested for risk assessment before discharge." },
    ],
    treatmentPlans: [{ id: "T3", title: "Poisoning Management Protocol", description: "Monitor LFTs, N-acetylcysteine if indicated, psychiatric evaluation mandatory.", orderedBy: "Dr. Priya Nair", orderedByRole: "Doctor", orderedOn: "27 Aug 2026, 09:15 AM", followStatus: "Following" }],
    assignedNurses: [{ date: "2026-08-27", shift: "Morning", nurseNames: ["Nurse Neha"] }],
    handovers: [],
    statusLog: [{ id: "S4", status: "Under Observation", changedBy: "Dr. Ayesha Khan (RMO)", changedAt: "27 Aug 2026, 09:10 AM" }],
    police: { caseType: "Suicide", nearestPoliceStation: "Sector 14 Police Station", informed: true, informedAt: "27 Aug 2026, 09:20 AM", informedBy: "Front Desk - Priya", remarks: "Medico-legal case (MLC) registered as per protocol." },
  },
  {
    emergencyNumber: "ER-20260827-004", uhid: "UHID12345801", isExistingPatient: false,
    patientName: "Arjun Nair", dateOfBirth: "2001-06-18", age: 25, gender: "Male",
    mobileNumber: "+91 99009 88776", attendantName: "Self", aadharNumber: "", ayushmanCardNumber: "",
    emergencyContactNumber: "+91 99009 11223", address: "8, Lake View Apartments",
    arrivalMode: "Private Vehicle", referredFrom: "", incidentType: "High Fever", broughtBy: "Self",
    policeInformationNeeded: false, registeredAt: "27 Aug 2026, 10:15 AM", registeredBy: "Front Desk - Priya",
    status: "Well & Released", currentCondition: "Fever with chills, improved after antipyretics, discharged in stable condition.",
    attendingDoctor: "Dr. Priya Nair", assignedRmo: "Dr. Kabir Sen (RMO)", assignedNurse: "Nurse Ravi", bedOrBay: "ER-Bay-6",
    allergies: [],
    vitals: [
      { id: "V5", date: "2026-08-27", dateTime: "27 Aug 2026, 10:20 AM", bp: "118/76", pulse: 96, respRate: 19, spo2: 98, temp: 102.4, pain: 2, recordedBy: "Nurse Ravi", recordedByRole: "Nurse" },
      { id: "V6", date: "2026-08-27", dateTime: "27 Aug 2026, 11:30 AM", bp: "116/74", pulse: 82, respRate: 18, spo2: 99, temp: 99.0, pain: 0, recordedBy: "Nurse Ravi", recordedByRole: "Nurse" },
    ],
    diagnoses: [{ id: "DG4", name: "Viral Fever with Chills", code: "R50.9", type: "Confirmed", addedBy: "Dr. Priya Nair", addedAt: "27 Aug 2026, 10:35 AM" }],
    doses: [{ id: "M5", medicineName: "Tab. Paracetamol 650mg", medicineCode: "MED-006", strength: "650 mg", route: "Oral", slot: "Immediate", scheduledTime: "10:25 AM", date: "2026-08-27", status: "Given", urgency: "Routine", givenBy: "Nurse Ravi", givenAt: "27 Aug 2026, 10:26 AM" }],
    labReports: [{ id: "L5", date: "2026-08-27", category: "Pathology", testName: "CBC + Malaria Antigen", orderedBy: "Dr. Priya Nair", reportedAt: "27 Aug 2026, 11:00 AM", pathologyResults: [{ parameter: "Malaria Antigen", value: "Negative", unit: "-", refRange: "Negative", flag: "Normal" }, { parameter: "WBC Count", value: "9.8", unit: "x10^3/uL", refRange: "4.0 - 11.0", flag: "Normal" }] }],
    progressNotes: [{ id: "PN4", date: "2026-08-27", title: "Discharge Note", author: "Dr. Priya Nair", role: "Doctor", category: "Discharge", createdAt: "27 Aug 2026, 11:40 AM", noteText: "Fever settled, patient ambulatory and comfortable. Advised rest and follow-up if symptoms recur." }],
    treatmentPlans: [{ id: "T4", title: "Antipyretic + Hydration", description: "Paracetamol SOS, oral rehydration, rest.", orderedBy: "Dr. Priya Nair", orderedByRole: "Doctor", orderedOn: "27 Aug 2026, 10:35 AM", followStatus: "Following" }],
    assignedNurses: [{ date: "2026-08-27", shift: "Morning", nurseNames: ["Nurse Ravi"] }],
    handovers: [],
    statusLog: [
      { id: "S5", status: "Stable", changedBy: "Nurse Ravi", changedAt: "27 Aug 2026, 11:00 AM" },
      { id: "S6", status: "Well & Released", changedBy: "Dr. Priya Nair", changedAt: "27 Aug 2026, 11:45 AM" },
    ],
    police: { caseType: "None", nearestPoliceStation: "", informed: false },
  },
];

export function getEmergencyPatientByEmergencyNumber(emergencyNumber: string) {
  return EMERGENCY_PATIENTS.find((p) => p.emergencyNumber === emergencyNumber);
}
export function findExistingPatientByMobile(mobile: string) {
  return EMERGENCY_PATIENTS.find((p) => p.mobileNumber && p.mobileNumber.replace(/\s/g, "") === mobile.replace(/\s/g, ""));
}
export function generateEmergencyNumber() {
  const today = new Date();
  const datePart = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
  const sequence = String(EMERGENCY_PATIENTS.length + 1).padStart(3, "0");
  return `ER-${datePart}-${sequence}`;
}
export function generateUhid() {
  return `UHID${Math.floor(10000000 + Math.random() * 89999999)}`;
}

export const EMERGENCY_STATUS_OPTIONS = [
  "Under Observation", "Stable", "Critical", "Shifted to IPD", "Shifted to OT",
  "Shifted to ICU", "Well & Released", "Follow-up OPD", "Patient Death",
] as const;

export const ARRIVAL_MODE_OPTIONS = ["Ambulance", "Walk-In", "Police", "Private Vehicle", "Referred Transfer", "Other"] as const;
export const INCIDENT_TYPE_OPTIONS = [
  "Chest Pain", "Stroke", "Accident (RTA)", "Fall Injury", "Burn", "Poisoning",
  "Suicide Attempt", "Assault / Murder Attempt", "Cardiac Arrest", "Breathing Difficulty",
  "Seizure", "High Fever", "Other",
] as const;
export const POLICE_CASE_INCIDENTS = new Set(["Accident (RTA)", "Suicide Attempt", "Assault / Murder Attempt"]);