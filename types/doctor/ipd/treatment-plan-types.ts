
export type PlanPriority = "High" | "Medium" | "Low";
export type PlanCategory =
  | "Medical Management"
  | "Monitoring"
  | "Diet & Lifestyle"
  | "Therapy & Rehabilitation"
  | "Patient Education";

export interface TreatmentPlanItem {
  id: string;
  problemDiagnosis: string;
  category: PlanCategory;
  intervention: string;
  targetGoal: string;
  duration: string;
  priority: PlanPriority;
  notes: string;
}

export interface TreatmentPlanPageData {
  goals: string[];
  items: TreatmentPlanItem[];
  additionalNotes: string;
  reviewAfter: string;
  nextReviewDate: string;
  reviewFocus: string;
  discussedWithPatient: boolean;
}