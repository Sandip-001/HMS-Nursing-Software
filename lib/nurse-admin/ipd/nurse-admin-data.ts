// lib/nurse-admin/ipd/nurse-admin-data.ts
import type {
  AdmittedPatient, AssignmentStatus, NurseProfile, ShiftDefinition, ShiftName,
} from "@/types/nurse-admin/ipd/nurse-admin-types";

export const SHIFTS: ShiftDefinition[] = [
  { name: "Morning", timeRange: "6:00 AM - 2:00 PM" },
  { name: "Evening", timeRange: "2:00 PM - 10:00 PM" },
  { name: "Night", timeRange: "10:00 PM - 6:00 AM" },
];

export const NURSE_DIRECTORY: NurseProfile[] = [
  { id: "N1", name: "Nurse Kavita", designation: "Staff Nurse", ward: "Semi Private", avatarColor: "from-blue-500 to-cyan-500" },
  { id: "N2", name: "Nurse Priya", designation: "Staff Nurse", ward: "Semi Private", avatarColor: "from-violet-500 to-purple-500" },
  { id: "N3", name: "Nurse Anjali", designation: "ICU Nurse", ward: "ICU", avatarColor: "from-rose-500 to-pink-500" },
  { id: "N4", name: "Nurse Neha", designation: "Staff Nurse", ward: "General Ward", avatarColor: "from-emerald-500 to-teal-500" },
  { id: "N5", name: "Nurse Ravi", designation: "Staff Nurse", ward: "General Ward", avatarColor: "from-amber-500 to-orange-500" },
  { id: "N6", name: "Nurse Pooja", designation: "ICU Nurse", ward: "ICU", avatarColor: "from-sky-500 to-blue-500" },
  { id: "N7", name: "Nurse Ritu", designation: "Staff Nurse", ward: "Semi Private", avatarColor: "from-fuchsia-500 to-pink-500" },
  { id: "N8", name: "Nurse Sunita", designation: "Senior Nurse", ward: "General Ward", avatarColor: "from-indigo-500 to-blue-500" },
];

export function getNurseById(id: string) {
  return NURSE_DIRECTORY.find((n) => n.id === id);
}

// New admissions — not yet assigned any nurse for any date
export const NEW_ADMISSIONS: AdmittedPatient[] = [
  {
    uhid: "UHID12345690", ipdId: "IPD240824-0011", patientName: "Anita Roy", age: 42, gender: "Female", bloodGroup: "A+",
    acuity: "Stable", ward: "Semi Private", room: "Room-4", bed: "B-207", department: "Gynecology",
    admittingDoctor: "Dr. Sanjana Ghosh", admissionDateTime: "24 Aug 2026, 07:20 AM", admittedFrom: "OPD Referral",
    allergies: [], currentDiagnosis: "Post-op Hysterectomy Care", diagnosisCode: "Z48.0",
    contactNumber: "+91 98765 11223", guardianName: "Bimal Roy (Husband)", assignments: [],
  },
  {
    uhid: "UHID12345691", ipdId: "IPD240824-0012", patientName: "Deepak Malhotra", age: 61, gender: "Male", bloodGroup: "O-",
    acuity: "Critical", ward: "ICU", room: "Bed-5", bed: "ICU-05", department: "Cardiology",
    admittingDoctor: "Dr. Amit Verma", admissionDateTime: "24 Aug 2026, 06:15 AM", admittedFrom: "Emergency",
    allergies: ["Aspirin"], currentDiagnosis: "Acute Myocardial Infarction", diagnosisCode: "I21.9",
    contactNumber: "+91 91234 55667", guardianName: "Reema Malhotra (Wife)", assignments: [],
  },
  {
    uhid: "UHID12345692", ipdId: "IPD240824-0013", patientName: "Fatima Sheikh", age: 29, gender: "Female", bloodGroup: "B+",
    acuity: "Under Observation", ward: "General Ward", room: "Room-6", bed: "G-112", department: "General Medicine",
    admittingDoctor: "Dr. Priya Nair", admissionDateTime: "24 Aug 2026, 08:05 AM", admittedFrom: "OPD Referral",
    allergies: ["Penicillin"], currentDiagnosis: "Dengue Fever", diagnosisCode: "A90",
    contactNumber: "+91 99887 33445", assignments: [],
  },
  {
    uhid: "UHID12345693", ipdId: "IPD240824-0014", patientName: "Karan Malhotra", age: 34, gender: "Male", bloodGroup: "AB+",
    acuity: "Stable", ward: "Semi Private", room: "Room-7", bed: "B-210", department: "Orthopedics",
    admittingDoctor: "Dr. Rajesh Iyer", admissionDateTime: "24 Aug 2026, 09:00 AM", admittedFrom: "Planned Surgery",
    allergies: [], currentDiagnosis: "ACL Reconstruction - Post-op", diagnosisCode: "S83.5",
    contactNumber: "+91 90123 44556", assignments: [],
  },
];

// Ward patients — already assigned nurses for at least today
export const WARD_PATIENTS: AdmittedPatient[] = [
  {
    uhid: "UHID12345685", ipdId: "IPD240520-0001", patientName: "Ravi Sharma", age: 48, gender: "Male", bloodGroup: "B+",
    acuity: "Stable", ward: "Semi Private", room: "Room-2", bed: "B-203", department: "Cardiology",
    admittingDoctor: "Dr. Amit Verma", admissionDateTime: "20 May 2024, 11:30 AM", admittedFrom: "OPD Referral",
    allergies: ["Penicillin"], currentDiagnosis: "Stable Angina", diagnosisCode: "I20.8",
    contactNumber: "+91 98765 43210", guardianName: "Sunita Sharma (Wife)",
    assignments: [
      { date: "2026-08-24", shift: "Morning", nurseIds: ["N1"] },
      { date: "2026-08-24", shift: "Evening", nurseIds: ["N2"] },
      { date: "2026-08-24", shift: "Night", nurseIds: ["N7"] },
    ],
  },
  {
    uhid: "UHID12345684", ipdId: "IPD240520-0002", patientName: "Neha Singh", age: 36, gender: "Female", bloodGroup: "O+",
    acuity: "Under Observation", ward: "General Ward", room: "Room-5", bed: "G-108", department: "General Medicine",
    admittingDoctor: "Dr. Priya Nair", admissionDateTime: "20 May 2024, 09:45 AM", admittedFrom: "Emergency",
    allergies: [], currentDiagnosis: "Viral Fever", diagnosisCode: "A99",
    contactNumber: "+91 91234 56789",
    assignments: [
      { date: "2026-08-24", shift: "Morning", nurseIds: ["N4"] },
      { date: "2026-08-24", shift: "Evening", nurseIds: ["N5"] },
    ],
  },
  {
    uhid: "UHID12345683", ipdId: "IPD240520-0003", patientName: "Suresh Yadav", age: 55, gender: "Male", bloodGroup: "A+",
    acuity: "Critical", ward: "ICU", room: "Bed-3", bed: "ICU-03", department: "General Surgery",
    admittingDoctor: "Dr. Rahul Mehta", admissionDateTime: "20 May 2024, 08:50 AM", admittedFrom: "Emergency",
    allergies: ["Sulfa Drugs"], currentDiagnosis: "Post-Op Sepsis", diagnosisCode: "A41.9",
    contactNumber: "+91 99887 76655", guardianName: "Manoj Yadav (Son)",
    assignments: [
      { date: "2026-08-24", shift: "Morning", nurseIds: ["N3", "N6"] },
      { date: "2026-08-24", shift: "Evening", nurseIds: ["N3"] },
      { date: "2026-08-24", shift: "Night", nurseIds: ["N6"] },
      { date: "2026-08-25", shift: "Morning", nurseIds: ["N3"] },
    ],
  },
];

export function getAssignmentStatus(patient: AdmittedPatient, isoDate: string): AssignmentStatus {
  const dayAssignments = patient.assignments.filter((a) => a.date === isoDate && a.nurseIds.length > 0);
  if (dayAssignments.length === 0) return "Unassigned";
  if (dayAssignments.length === SHIFTS.length) return "Fully Assigned";
  return "Partially Assigned";
}

export const NURSE_ADMIN_WARDS = Array.from(new Set([...NEW_ADMISSIONS, ...WARD_PATIENTS].map((p) => p.ward)));
export const NURSE_ADMIN_DEPARTMENTS = Array.from(new Set([...NEW_ADMISSIONS, ...WARD_PATIENTS].map((p) => p.department)));