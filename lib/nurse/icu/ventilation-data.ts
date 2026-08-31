// lib/nurse/icu/ventilation-data.ts
import type { VentilatorAdministration, VentilatorObservation, VentilatorOrder, VentilatorPermissions } from "@/types/nurse/icu/ventilation-types";

export const VENTILATOR_PERMISSIONS: VentilatorPermissions = {
  nurseCanAdjustWithoutOrder: false,
};

export const VENTILATOR_ORDERS: VentilatorOrder[] = [
  {
    id: "VO-001",
    uhid: "UHID12398211",
    icuBed: "ICU-B-03",
    ventilationType: "Invasive Mechanical Ventilation",
    airwayType: "Endotracheal tube",
    airwayDetails: "Size 7.5, depth 22 cm at lips",
    ventilatorName: "Ventilator-ICU-03",
    mode: "Volume Control",
    prescribedSettings: { tidalVolumeMl: 450, respiratoryRate: 18, fiO2Percent: 40, peepCmH2O: 5 },
    oxygenationTarget: "SpO2 92-96%",
    ventilationTarget: "pCO2 35-45 mmHg",
    specialInstructions: "Trauma patient, monitor closely for deterioration.",
    monitoringFrequency: "Continuous",
    status: "Active",
    orderedBy: "Dr. Rahul Mehta",
    orderedByRole: "Doctor",
    orderedAt: "27 Aug 2026, 11:30 AM",
  },
  {
    id: "VO-002",
    uhid: "UHID12345685",
    icuBed: "ICU-A-01",
    ventilationType: "Non-Invasive Ventilation",
    airwayType: "None",
    ventilatorName: "BiPAP-ICU-01",
    mode: "BiPAP",
    prescribedSettings: { ipapCmH2O: 12, epapCmH2O: 6, fiO2Percent: 35, backupRate: 14 },
    oxygenationTarget: "SpO2 94-98%",
    status: "Active",
    orderedBy: "Dr. Amit Verma",
    orderedByRole: "Doctor",
    orderedAt: "27 Aug 2026, 09:45 AM",
  },
];

export const VENTILATOR_ADMINISTRATIONS: VentilatorAdministration[] = [
  {
    id: "VA-001",
    orderId: "VO-001",
    uhid: "UHID12398211",
    actualSettings: { tidalVolumeMl: 450, respiratoryRate: 18, fiO2Percent: 40, peepCmH2O: 5 },
    confirmedBy: "Nurse Anjali",
    confirmedAt: "27 Aug 2026, 11:35 AM",
    isActive: true,
  },
  {
    id: "VA-002",
    orderId: "VO-002",
    uhid: "UHID12345685",
    actualSettings: { ipapCmH2O: 12, epapCmH2O: 6, fiO2Percent: 35, backupRate: 14 },
    confirmedBy: "Nurse Kavita",
    confirmedAt: "27 Aug 2026, 09:50 AM",
    isActive: true,
  },
];

export const VENTILATOR_OBSERVATIONS: VentilatorObservation[] = [
  {
    id: "VOB-001", orderId: "VO-001", uhid: "UHID12345685", administrationId: "VA-001",
    ventilatorParameters: { tidalVolumeMl: 450, respiratoryRate: 18, fiO2Percent: 40, peepCmH2O: 5 },
    spo2: 96, respiratoryRate: 19, heartRate: 110, bloodPressureSystolic: 105, bloodPressureDiastolic: 65,
    patientStatus: "Stable", remarks: "No obvious respiratory distress.", recordedBy: "Nurse Anjali", recordedAt: "27 Aug 2026, 12:00 PM", hasDifference: false,
  },
  {
    id: "VOB-002", orderId: "VO-001", uhid: "UHID12398211", administrationId: "VA-001",
    ventilatorParameters: { tidalVolumeMl: 450, respiratoryRate: 18, fiO2Percent: 40, peepCmH2O: 5 },
    spo2: 93, respiratoryRate: 24, heartRate: 120, bloodPressureSystolic: 98, bloodPressureDiastolic: 60,
    patientStatus: "Needs Review", remarks: "Increased work of breathing noted.", recordedBy: "Nurse Anjali", recordedAt: "27 Aug 2026, 13:00 PM",
    hasDifference: false,
  },
  {
    id: "VOB-003", orderId: "VO-001", uhid: "UHID12398211", administrationId: "VA-001",
    ventilatorParameters: { tidalVolumeMl: 450, respiratoryRate: 18, fiO2Percent: 50, peepCmH2O: 5 }, // FiO2 changed
    spo2: 95, respiratoryRate: 21, heartRate: 112, bloodPressureSystolic: 108, bloodPressureDiastolic: 68,
    patientStatus: "Stable", remarks: "FiO2 increased temporarily due to desaturation.", recordedBy: "Nurse Anjali", recordedAt: "27 Aug 2026, 14:00 PM",
    hasDifference: true, differenceNote: "Ordered FiO2 40%, observed 50% — temporary clinical instruction.",
    doctorNotified: true, doctorNotifiedAt: "27 Aug 2026, 14:05 PM", doctorNotifiedBy: "Nurse Anjali",
    escalationReason: "Temporary clinical instruction",
  },
];

export function getActiveVentilatorOrder(uhid: string): VentilatorOrder | undefined {
  return VENTILATOR_ORDERS.filter((o) => o.uhid === uhid && o.status === "Active").sort((a, b) => b.orderedAt.localeCompare(a.orderedAt))[0];
}
export function getVentilatorOrderHistory(uhid: string): VentilatorOrder[] {
  return VENTILATOR_ORDERS.filter((o) => o.uhid === uhid).sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));
}
export function getActiveVentilatorAdministration(uhid: string): VentilatorAdministration | undefined {
  return VENTILATOR_ADMINISTRATIONS.find((a) => a.uhid === uhid && a.isActive);
}
export function getVentilatorObservations(uhid: string): VentilatorObservation[] {
  return VENTILATOR_OBSERVATIONS.filter((o) => o.uhid === uhid).sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
}
export function getLatestVentilatorObservation(uhid: string): VentilatorObservation | undefined {
  return getVentilatorObservations(uhid)[0];
}

export const VENTILATION_TYPE_OPTIONS = ["Invasive Mechanical Ventilation", "Non-Invasive Ventilation", "CPAP", "BiPAP", "Other"] as const;
export const AIRWAY_TYPE_OPTIONS = ["Endotracheal tube", "Tracheostomy", "Other", "None"] as const;
export const VENTILATOR_MODE_OPTIONS = ["Volume Control", "Pressure Control", "SIMV", "PSV", "CPAP", "BiPAP", "Other"] as const;
export const PATIENT_VENT_STATUS_OPTIONS = ["Stable", "Needs Review", "Deteriorating"] as const;
export const WEANING_PLAN_OPTIONS = ["Continue current support", "Weaning assessment", "Weaning trial", "Continue ventilation", "Extubation assessment", "Extubation decision", "Other"] as const;