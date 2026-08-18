//lib/doctor/ipd/lab-results-data.ts
import type { LabTestResult, CriticalAlert, TestHistoryEntry } from "@/types/doctor/ipd/lab-results-types";

export const LAB_RESULTS: Record<string, LabTestResult[]> = {
  UHID12345685: [
    { id: "L1", testName: "Complete Blood Count (CBC)", category: "Hematology", testDateTime: "20 May 2024, 08:00 AM", result: "", unit: "-", referenceRange: "-", status: "Normal", isReport: true, reportUrl: "#" },
    { id: "L2", testName: "Hemoglobin (Hb)", category: "Hematology", testDateTime: "20 May 2024, 08:00 AM", result: "13.2", unit: "g/dL", referenceRange: "13.5 - 17.5", status: "Low", isReport: false, interpretation: "Mild anemia likely due to reduced dietary intake or chronic blood loss.", performedBy: "Lab Tech Sunil", verifiedBy: "Dr. Kavita Rao", labRemarks: "Recommend follow-up CBC in 1 week.", trend: [{ date: "17 May", value: 13.8 }, { date: "18 May", value: 13.5 }, { date: "19 May", value: 13.4 }, { date: "20 May", value: 13.2 }] },
    { id: "L3", testName: "Total WBC Count", category: "Hematology", testDateTime: "20 May 2024, 08:00 AM", result: "7,400", unit: "/µL", referenceRange: "4,000 - 11,000", status: "Normal", isReport: false, performedBy: "Lab Tech Sunil", verifiedBy: "Dr. Kavita Rao" },
    { id: "L4", testName: "Platelet Count", category: "Hematology", testDateTime: "20 May 2024, 08:00 AM", result: "2.15", unit: "Lakh/µL", referenceRange: "1.50 - 4.50", status: "Normal", isReport: false, performedBy: "Lab Tech Sunil", verifiedBy: "Dr. Kavita Rao" },
    { id: "L5", testName: "Neutrophils", category: "Hematology", testDateTime: "20 May 2024, 08:00 AM", result: "62", unit: "%", referenceRange: "40 - 70", status: "Normal", isReport: false, performedBy: "Lab Tech Sunil", verifiedBy: "Dr. Kavita Rao" },
    { id: "L6", testName: "Lymphocytes", category: "Hematology", testDateTime: "20 May 2024, 08:00 AM", result: "28", unit: "%", referenceRange: "20 - 40", status: "Normal", isReport: false, performedBy: "Lab Tech Sunil", verifiedBy: "Dr. Kavita Rao" },
    { id: "L7", testName: "Blood Urea", category: "Biochemistry", testDateTime: "20 May 2024, 08:00 AM", result: "32", unit: "mg/dL", referenceRange: "15 - 40", status: "Normal", isReport: false, performedBy: "Lab Tech Ramesh", verifiedBy: "Dr. Kavita Rao" },
    { id: "L8", testName: "Serum Creatinine", category: "Biochemistry", testDateTime: "20 May 2024, 08:00 AM", result: "1.1", unit: "mg/dL", referenceRange: "0.6 - 1.2", status: "Normal", isReport: false, performedBy: "Lab Tech Ramesh", verifiedBy: "Dr. Kavita Rao" },
    { id: "L9", testName: "Sodium (Na+)", category: "Biochemistry", testDateTime: "20 May 2024, 08:00 AM", result: "138", unit: "mEq/L", referenceRange: "135 - 145", status: "Normal", isReport: false, performedBy: "Lab Tech Ramesh", verifiedBy: "Dr. Kavita Rao" },
    { id: "L10", testName: "Potassium (K+)", category: "Biochemistry", testDateTime: "20 May 2024, 08:00 AM", result: "4.2", unit: "mEq/L", referenceRange: "3.5 - 5.1", status: "Normal", isReport: false, performedBy: "Lab Tech Ramesh", verifiedBy: "Dr. Kavita Rao" },
    { id: "L11", testName: "Fasting Blood Sugar", category: "Biochemistry", testDateTime: "20 May 2024, 08:00 AM", result: "124", unit: "mg/dL", referenceRange: "70 - 110", status: "High", isReport: false, interpretation: "Impaired fasting glucose, consistent with early insulin resistance.", performedBy: "Lab Tech Ramesh", verifiedBy: "Dr. Kavita Rao", labRemarks: "Correlate with HbA1c and dietary history.", trend: [{ date: "17 May", value: 108 }, { date: "18 May", value: 112 }, { date: "19 May", value: 118 }, { date: "20 May", value: 124 }] },
    { id: "L12", testName: "Lipid Profile", category: "Biochemistry", testDateTime: "19 May 2024, 07:30 AM", result: "", unit: "-", referenceRange: "-", status: "Borderline", isReport: true, reportUrl: "#" },
    { id: "L13", testName: "LDL Cholesterol", category: "Biochemistry", testDateTime: "19 May 2024, 07:30 AM", result: "118", unit: "mg/dL", referenceRange: "< 100", status: "Borderline", isReport: false, interpretation: "Borderline high LDL; consider dietary modification.", performedBy: "Lab Tech Ramesh", verifiedBy: "Dr. Kavita Rao" },
    { id: "L14", testName: "HDL Cholesterol", category: "Biochemistry", testDateTime: "19 May 2024, 07:30 AM", result: "42", unit: "mg/dL", referenceRange: "> 40", status: "Normal", isReport: false, performedBy: "Lab Tech Ramesh", verifiedBy: "Dr. Kavita Rao" },
    { id: "L15", testName: "HIV (ELISA)", category: "Serology", testDateTime: "18 May 2024, 08:15 AM", result: "Non-Reactive", unit: "-", referenceRange: "Non-Reactive", status: "Normal", isReport: false, performedBy: "Lab Tech Sunil", verifiedBy: "Dr. Kavita Rao" },
    { id: "L16", testName: "HBsAg", category: "Serology", testDateTime: "18 May 2024, 08:15 AM", result: "Negative", unit: "-", referenceRange: "Negative", status: "Normal", isReport: false, performedBy: "Lab Tech Sunil", verifiedBy: "Dr. Kavita Rao" },
    { id: "L17", testName: "Urine Culture", category: "Microbiology", testDateTime: "18 May 2024, 08:15 AM", result: "No Growth", unit: "-", referenceRange: "No Growth", status: "Normal", isReport: false, performedBy: "Lab Tech Sunil", verifiedBy: "Dr. Kavita Rao" },
    { id: "L18", testName: "Sputum AFB", category: "Microbiology", testDateTime: "18 May 2024, 08:15 AM", result: "-", unit: "-", referenceRange: "-", status: "Pending", isReport: false },
  ],
};

export const CRITICAL_ALERTS: Record<string, CriticalAlert[]> = {
  UHID12345685: [
    { testName: "Hemoglobin (Hb)", value: "13.2", unit: "g/dL", referenceRange: "13.5 - 17.5 g/dL", direction: "low" },
    { testName: "Fasting Blood Sugar", value: "124", unit: "mg/dL", referenceRange: "70 - 110 mg/dL", direction: "high" },
    { testName: "LDL Cholesterol", value: "118", unit: "mg/dL", referenceRange: "< 100 mg/dL", direction: "borderline" },
  ],
};

export const TEST_HISTORY: Record<string, TestHistoryEntry[]> = {
  UHID12345685: [
    { dateTime: "20 May 2024, 08:00 AM", testCount: 18 },
    { dateTime: "19 May 2024, 07:30 AM", testCount: 12 },
    { dateTime: "18 May 2024, 08:15 AM", testCount: 10 },
  ],
};

export function getLabResultsForPatient(uhid: string) {
  return LAB_RESULTS[uhid] ?? LAB_RESULTS.UHID12345685;
}
export function getCriticalAlertsForPatient(uhid: string) {
  return CRITICAL_ALERTS[uhid] ?? [];
}
export function getTestHistoryForPatient(uhid: string) {
  return TEST_HISTORY[uhid] ?? [];
}