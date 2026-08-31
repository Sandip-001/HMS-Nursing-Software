// lib/nurse/icu/oxygen-therapy-data.ts
import type { OxygenAdministration, OxygenObservation, OxygenOrder, OxygenPermissions } from "@/types/nurse/icu/oxygen-therapy-types";

// Configurable per hospital protocol — NOT hard-coded permission logic in UI
export const OXYGEN_PERMISSIONS: OxygenPermissions = {
  nurseCanInitiateOrAdjust: false,
};

export const OXYGEN_ORDERS: OxygenOrder[] = [
  {
    id: "OXO-001",
    uhid: "UHID12345685",
    icuBed: "ICU-A-01",
    indication: "Hypoxemia",
    settings: { device: "Nasal Cannula", flowLpm: 4 },
    targetSpo2Min: 94,
    targetSpo2Max: 98,
    monitoringFrequency: "Hourly",
    startDateTime: "27 Aug 2026, 09:30 AM",
    durationType: "Until discontinued",
    specialInstructions: "Wean off oxygen if SpO₂ stable above target range for 24 hours.",
    status: "Active",
    orderedBy: "Dr. Amit Verma",
    orderedByRole: "Doctor",
    orderedAt: "27 Aug 2026, 09:30 AM",
  },
  {
    id: "OXO-002",
    uhid: "UHID12398211",
    icuBed: "ICU-B-03",
    indication: "Respiratory distress",
    settings: { device: "HFNC", flowLpm: 40, fiO2Percent: 60, temperatureCelsius: 37 },
    targetSpo2Min: 92,
    targetSpo2Max: 96,
    monitoringFrequency: "Continuous",
    startDateTime: "27 Aug 2026, 11:20 AM",
    durationType: "Until discontinued",
    specialInstructions: "Trauma patient, monitor closely for deterioration.",
    status: "Active",
    orderedBy: "Dr. Rahul Mehta",
    orderedByRole: "Doctor",
    orderedAt: "27 Aug 2026, 11:20 AM",
  },
];

export const OXYGEN_ADMINISTRATIONS: OxygenAdministration[] = [
  {
    id: "OXA-001",
    orderId: "OXO-001",
    uhid: "UHID12345685",
    actualSettings: { device: "Nasal Cannula", flowLpm: 4 },
    startedBy: "Nurse Kavita",
    startedAt: "27 Aug 2026, 09:35 AM",
    isActive: true,
  },
  {
    id: "OXA-002",
    orderId: "OXO-002",
    uhid: "UHID12398211",
    actualSettings: { device: "HFNC", flowLpm: 40, fiO2Percent: 60, temperatureCelsius: 37 },
    startedBy: "Nurse Anjali",
    startedAt: "27 Aug 2026, 11:25 AM",
    isActive: true,
  },
];

export const OXYGEN_OBSERVATIONS: OxygenObservation[] = [
  {
    id: "OXOB-001", orderId: "OXO-001", uhid: "UHID12345685", administrationId: "OXA-001",
    spo2: 97, respiratoryRate: 18, heartRate: 82, patientCondition: "Comfortable", oxygenResponse: "Stable",
    remarks: "Patient maintaining target saturation.", recordedBy: "Nurse Kavita", recordedAt: "27 Aug 2026, 10:00 AM", belowTarget: false,
  },
  {
    id: "OXOB-002", orderId: "OXO-001", uhid: "UHID12345685", administrationId: "OXA-001",
    spo2: 96, respiratoryRate: 19, heartRate: 84, patientCondition: "Comfortable", oxygenResponse: "Stable",
    remarks: "", recordedBy: "Nurse Kavita", recordedAt: "27 Aug 2026, 11:00 AM", belowTarget: false,
  },
  {
    id: "OXOB-003", orderId: "OXO-002", uhid: "UHID12398211", administrationId: "OXA-002",
    spo2: 89, respiratoryRate: 26, heartRate: 118, patientCondition: "Moderate distress", oxygenResponse: "Deteriorating",
    remarks: "Increased work of breathing noted.", recordedBy: "Nurse Anjali", recordedAt: "27 Aug 2026, 12:00 PM",
    belowTarget: true, doctorNotified: true, doctorNotifiedAt: "27 Aug 2026, 12:05 PM", doctorNotifiedBy: "Nurse Anjali",
    escalationNote: "Doctor informed at 12:05 PM. Awaiting review.",
  },
  {
    id: "OXOB-004", orderId: "OXO-002", uhid: "UHID12398211", administrationId: "OXA-002",
    spo2: 93, respiratoryRate: 23, heartRate: 105, patientCondition: "Mild distress", oxygenResponse: "Improving",
    remarks: "Improved after FiO2 increase by doctor.", recordedBy: "Nurse Anjali", recordedAt: "27 Aug 2026, 12:30 PM", belowTarget: false,
  },
];

export function getActiveOxygenOrder(uhid: string): OxygenOrder | undefined {
  return OXYGEN_ORDERS.filter((o) => o.uhid === uhid && o.status === "Active").sort((a, b) => b.orderedAt.localeCompare(a.orderedAt))[0];
}
export function getOxygenOrderHistory(uhid: string): OxygenOrder[] {
  return OXYGEN_ORDERS.filter((o) => o.uhid === uhid).sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));
}
export function getActiveAdministration(uhid: string): OxygenAdministration | undefined {
  return OXYGEN_ADMINISTRATIONS.find((a) => a.uhid === uhid && a.isActive);
}
export function getOxygenObservations(uhid: string): OxygenObservation[] {
  return OXYGEN_OBSERVATIONS.filter((o) => o.uhid === uhid).sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
}
export function getLatestObservation(uhid: string): OxygenObservation | undefined {
  return getOxygenObservations(uhid)[0];
}

export const INDICATION_OPTIONS = ["Hypoxemia", "Respiratory distress", "Post-procedure", "Other"] as const;
export const DEVICE_OPTIONS = ["Nasal Cannula", "Simple Face Mask", "Venturi Mask", "Non-Rebreather/Reservoir Mask", "HFNC", "NIV", "Other"] as const;
export const FREQUENCY_OPTIONS = ["Continuous", "As required", "Hourly", "Every 2 hours", "Every 4 hours", "Other"] as const;
export const CONDITION_OPTIONS = ["Comfortable", "Mild distress", "Moderate distress", "Severe distress"] as const;
export const RESPONSE_OPTIONS = ["Stable", "Improving", "Deteriorating"] as const;