import type { InitialAssessmentFormData } from "@/types/nurse/ipd/initial-assessment-types";

export const INITIAL_ASSESSMENT_DATA: Record<string, InitialAssessmentFormData> = {
  UHID12345685: {
    chiefComplaint: "Chest pain and breathlessness since 2 days.",
    historyOfPresentIllness:
      "Patient complains of central chest pain radiating to left arm since 2 days, associated with mild breathlessness.",
    pastMedicalHistory: ["Hypertension", "Diabetes Mellitus"],
    pastSurgicalHistory: "No known surgical history",
    allergies: "No known drug allergies",
    consciousness: "Alert",
    orientation: "Oriented",
    build: "Moderate",
    nutrition: "Normal",
    mobility: "Ambulatory",
    language: "English",
    fallRisk: true,
    pressureInjuryRisk: false,
    dvtRisk: true,
    suicideRisk: false,
    isolationRequired: false,
    nursingConcerns: "Monitor for recurrent chest pain and shortness of breath. Maintain cardiac monitoring as ordered.",
    assessmentStatus: "In Progress",
    assessmentDuration: "00:15 Hrs",
    reviewedByDoctor: "Pending",
    nextStep: "Vitals Recording",
    assessmentTime: "2024-05-20T12:05",
    assessmentBy: "Neha Singh (Staff Nurse)",
  },
};

export function getInitialAssessmentData(uhid: string): InitialAssessmentFormData {
  return INITIAL_ASSESSMENT_DATA[uhid] ?? INITIAL_ASSESSMENT_DATA.UHID12345685;
}