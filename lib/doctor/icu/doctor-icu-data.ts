// lib/doctor/icu/doctor-icu-data.ts
import type { MedicineDraft, LabTestItem } from "@/types/doctor/icu/doctor-icu-types";

export const CURRENT_DOCTOR = { name: "Dr. Amit Verma", role: "ICU Consultant", staffId: "DOC-ICU-001" };

export const ROUTE_OPTIONS = ["Oral", "IV", "IM", "SC", "Topical", "Inhalation", "PR", "SL", "NGT", "PEG"];

export const FREQUENCY_OPTIONS = ["OD", "BD", "TDS", "QID", "Q4H", "Q6H", "Q8H", "Q12H", "HS", "PRN", "Stat"];

export const MEDICINE_CATALOG: Array<{
  code: string;
  name: string;
  strength: string;
  route: string;
  defaultDose?: string;
  defaultFrequency?: string;
  defaultDuration?: string;
  defaultInstructions?: string;
}> = [
  { code: "MED-001", name: "Tab. Aspirin", strength: "75 mg", route: "Oral", defaultDose: "75 mg", defaultFrequency: "OD", defaultDuration: "Until discontinued", defaultInstructions: "After breakfast" },
  { code: "MED-002", name: "Tab. Metoprolol", strength: "25 mg", route: "Oral", defaultDose: "25 mg", defaultFrequency: "BD", defaultDuration: "Until discontinued", defaultInstructions: "After food" },
  { code: "MED-003", name: "Tab. Atorvastatin", strength: "40 mg", route: "Oral", defaultDose: "40 mg", defaultFrequency: "HS", defaultDuration: "Until discontinued", defaultInstructions: "At bedtime" },
  { code: "MED-004", name: "Inj. Piperacillin-Tazobactam", strength: "4.5 g", route: "IV", defaultDose: "4.5 g", defaultFrequency: "Q8H", defaultDuration: "7 days", defaultInstructions: "As per nursing schedule" },
  { code: "MED-005", name: "Inj. Furosemide", strength: "40 mg/4mL", route: "IV", defaultDose: "40 mg", defaultFrequency: "OD", defaultDuration: "3 days", defaultInstructions: "Slow IV push" },
  { code: "MED-006", name: "Tab. Paracetamol", strength: "650 mg", route: "Oral", defaultDose: "650 mg", defaultFrequency: "TDS", defaultDuration: "5 days", defaultInstructions: "After food" },
  { code: "MED-007", name: "Inj. Noradrenaline", strength: "4 mg/4mL", route: "IV", defaultDose: "0.1 mcg/kg/min", defaultFrequency: "Continuous", defaultDuration: "Until discontinued", defaultInstructions: "Continuous infusion" },
  { code: "MED-008", name: "Cap. Pantoprazole", strength: "40 mg", route: "Oral", defaultDose: "40 mg", defaultFrequency: "OD", defaultDuration: "Until discontinued", defaultInstructions: "Before breakfast" },
];

export const LAB_TEST_CATALOG: LabTestItem[] = [
  { id: "LAB-001", code: "CBC", name: "Complete Blood Count", category: "Pathology", description: "Hemogram with differential count" },
  { id: "LAB-002", code: "LFT", name: "Liver Function Test", category: "Pathology", description: "Liver enzymes and function panel" },
  { id: "LAB-003", code: "KFT", name: "Kidney Function Test", category: "Pathology", description: "Renal function panel with electrolytes" },
  { id: "LAB-004", code: "ABG", name: "Arterial Blood Gas", category: "Pathology", description: "pH, pCO2, pO2, HCO3, lactate" },
  { id: "LAB-005", code: "PT-INR", name: "Prothrombin Time with INR", category: "Pathology", description: "Coagulation profile" },
  { id: "LAB-006", code: "XRAY-CHEST", name: "X-Ray Chest PA View", category: "Radiology", description: "Chest X-ray for lung fields and heart" },
  { id: "LAB-007", code: "USG-ABDOMEN", name: "Ultrasound Abdomen", category: "Radiology", description: "Complete abdominal ultrasound" },
  { id: "LAB-008", code: "CT-CHEST", name: "CT Chest", category: "Radiology", description: "CT scan of chest with contrast" },
  { id: "LAB-009", code: "ECHO", name: "Echocardiography", category: "Radiology", description: "2D Echo with Doppler" },
  { id: "LAB-010", code: "TROPONIN", name: "Cardiac Troponin I", category: "Pathology", description: "Cardiac biomarker for MI" },
];