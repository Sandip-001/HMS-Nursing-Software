//lib/doctor/ipd/diagnosis-data.ts
import type { DiagnosisPageData } from "@/types/doctor/ipd/diagnosis-types";

export const DIAGNOSIS_DATA: Record<string, DiagnosisPageData> = {
  UHID12345685: {
    currentDiagnoses: [
      { id: "D1", diagnosis: "Stable Angina", isPrimary: true, type: "Clinical", diagnosedOn: "18 May 2024", status: "Active" },
      { id: "D2", diagnosis: "Hypertension (Essential)", isPrimary: false, type: "Co-morbidity", diagnosedOn: "18 May 2024", status: "Active" },
      { id: "D3", diagnosis: "Type 2 Diabetes Mellitus", isPrimary: false, type: "Co-morbidity", diagnosedOn: "18 May 2024", status: "Active" },
    ],
    resolvedDiagnoses: [
      { id: "R1", diagnosis: "Acute Bronchitis", type: "Past History", diagnosedOn: "10 Apr 2024", resolvedOn: "25 Apr 2024" },
    ],
    clinicalImpression: "Patient has stable angina with risk factors of hypertension and diabetes mellitus.\nSymptoms are controlled with current medication.\nNo signs of acute cardiac event at present.",
  },
};

export const DIAGNOSIS_SUGGESTIONS = [
  "Acute MI", "Heart Failure", "Stable Angina", "Unstable Angina", "Hypertension (Essential)",
  "Type 2 Diabetes Mellitus", "Chronic Kidney Disease", "Atrial Fibrillation", "COPD", "Pneumonia",
];

export function getDiagnosisData(uhid: string): DiagnosisPageData {
  return DIAGNOSIS_DATA[uhid] ?? DIAGNOSIS_DATA.UHID12345685;
}