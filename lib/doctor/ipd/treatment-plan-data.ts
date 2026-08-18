
import type { TreatmentPlanPageData } from "@/types/doctor/ipd/treatment-plan-types";

export const TREATMENT_PLAN_DATA: Record<string, TreatmentPlanPageData> = {
  UHID12345685: {
    goals: [
      "Relief of chest pain and associated symptoms",
      "Control blood pressure and maintain within target range",
      "Optimize blood sugar levels",
      "Prevent further cardiac events and complications",
      "Improve functional capacity and quality of life",
    ],
    items: [
      {
        id: "TP1",
        problemDiagnosis: "Stable Angina",
        category: "Medical Management",
        intervention: "Anti-anginal medication, Lifestyle modification",
        targetGoal: "Symptom relief, No angina at rest",
        duration: "Ongoing",
        priority: "High",
        notes: "Avoid exertion, Stress management",
      },
      {
        id: "TP2",
        problemDiagnosis: "Hypertension (Essential)",
        category: "Monitoring",
        intervention: "Antihypertensives, Low salt diet, Monitor BP",
        targetGoal: "BP < 130/80 mmHg",
        duration: "Ongoing",
        priority: "High",
        notes: "Home BP monitoring advised",
      },
      {
        id: "TP3",
        problemDiagnosis: "Type 2 Diabetes Mellitus",
        category: "Diet & Lifestyle",
        intervention: "Oral hypoglycemics, Diet control, Exercise",
        targetGoal: "FBS 80-130 mg/dL, PPBS < 180 mg/dL",
        duration: "Ongoing",
        priority: "Medium",
        notes: "Monitor blood sugar as advised",
      },
    ],
    additionalNotes:
      "Patient hemodynamically stable.\nContinue current management and monitor.\nAdvise to report immediately if chest pain recurs or worsens.",
    reviewAfter: "2 Days",
    nextReviewDate: "2024-05-22",
    reviewFocus: "Symptom relief, BP & Sugar control",
    discussedWithPatient: true,
  },
};

export function getTreatmentPlanData(uhid: string): TreatmentPlanPageData {
  return TREATMENT_PLAN_DATA[uhid] ?? TREATMENT_PLAN_DATA.UHID12345685;
}