//types/doctor/ipd/discharge-decision-types.ts
export type DischargeMode = "Walk Out" | "Wheel Chair" | "Stretcher";
export type DischargeDecisionType = "Discharge to Home" | "Discharge to Rehab" | "Transfer to Another Facility";

export interface DischargeMedication {
  id: string;
  medicineName: string;
  dose: string;
  frequency: string;
  duration: string;
}

export interface DischargeDecisionPageData {
  clinicalStable: boolean;
  vitalsNormal: boolean;
  primaryDiagnosisControlled: boolean;
  labParametersAcceptable: boolean;
  activityIndependent: boolean;
  patientWilling: boolean;
  dischargeDecision: DischargeDecisionType;
  dischargeDateTime: string;
  dischargeMode: DischargeMode;
  accompaniedBy: string;
  instructionsGivenBy: string;
  followUpDate: string;
  followUpWith: string;
  visitType: string;
  remarks: string;
  notes: string;
  medications: DischargeMedication[];
}