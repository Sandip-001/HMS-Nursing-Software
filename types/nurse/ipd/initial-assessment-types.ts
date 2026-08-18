export interface InitialAssessmentFormData {
  chiefComplaint: string;
  historyOfPresentIllness: string;
  pastMedicalHistory: string[];
  pastSurgicalHistory: string;
  allergies: string;
  consciousness: string;
  orientation: string;
  build: string;
  nutrition: string;
  mobility: string;
  language: string;
  fallRisk: boolean;
  pressureInjuryRisk: boolean;
  dvtRisk: boolean;
  suicideRisk: boolean;
  isolationRequired: boolean;
  nursingConcerns: string;
  assessmentStatus: string;
  assessmentDuration: string;
  reviewedByDoctor: string;
  nextStep: string;
  assessmentTime: string;
  assessmentBy: string;
}