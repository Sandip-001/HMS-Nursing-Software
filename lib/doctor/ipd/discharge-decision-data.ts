import type { DischargeDecisionPageData } from "@/types/doctor/ipd/discharge-decision-types";

export const DISCHARGE_DECISION_DATA: Record<string, DischargeDecisionPageData> = {
  UHID12345685: {
    clinicalStable: true,
    vitalsNormal: true,
    primaryDiagnosisControlled: true,
    labParametersAcceptable: true,
    activityIndependent: true,
    patientWilling: true,
    dischargeDecision: "Discharge to Home",
    dischargeDateTime: "2024-05-20T16:00",
    dischargeMode: "Walk Out",
    accompaniedBy: "Son",
    instructionsGivenBy: "Dr. Amit Verma",
    followUpDate: "2024-05-27",
    followUpWith: "Dr. Amit Verma (Cardiology)",
    visitType: "OPD Follow-up",
    remarks: "Review in OPD with ECG and lipid profile.",
    notes: "Enter any additional notes for discharge...",
    medications: [
      { id: "DM1", medicineName: "Tab. Aspirin", dose: "75 mg", frequency: "Once daily", duration: "30 Days" },
      { id: "DM2", medicineName: "Tab. Atorvastatin", dose: "20 mg", frequency: "Once at night", duration: "30 Days" },
      { id: "DM3", medicineName: "Tab. Metoprolol", dose: "25 mg", frequency: "Twice daily", duration: "30 Days" },
      { id: "DM4", medicineName: "Tab. Pantoprazole", dose: "40 mg", frequency: "Once daily (Before food)", duration: "15 Days" },
    ],
  },
};

export function getDischargeDecisionData(uhid: string) {
  return DISCHARGE_DECISION_DATA[uhid] ?? DISCHARGE_DECISION_DATA.UHID12345685;
}