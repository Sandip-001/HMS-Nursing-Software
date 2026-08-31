// types/nurse/icu/oxygen-therapy-types.ts

export type OxygenIndication = "Hypoxemia" | "Respiratory distress" | "Post-procedure" | "Other";
export type OxygenDevice = "Nasal Cannula" | "Simple Face Mask" | "Venturi Mask" | "Non-Rebreather/Reservoir Mask" | "HFNC" | "NIV" | "Other";
export type MonitoringFrequency = "Continuous" | "As required" | "Hourly" | "Every 2 hours" | "Every 4 hours" | "Other";
export type OxygenOrderStatus = "Active" | "Modified" | "Discontinued";
export type PatientCondition = "Comfortable" | "Mild distress" | "Moderate distress" | "Severe distress";
export type OxygenResponse = "Stable" | "Improving" | "Deteriorating";
export type OrderedByRole = "Doctor" | "RMO";

// Device-specific settings — kept separate so we don't create one giant 50-field form
export interface NasalCannulaSettings {
  device: "Nasal Cannula";
  flowLpm: number;
}
export interface SimpleFaceMaskSettings {
  device: "Simple Face Mask";
  flowLpm: number;
}
export interface VenturiMaskSettings {
  device: "Venturi Mask";
  flowLpm: number;
  fiO2Percent: number;
}
export interface NonRebreatherSettings {
  device: "Non-Rebreather/Reservoir Mask";
  flowLpm: number;
}
export interface HfncSettings {
  device: "HFNC";
  flowLpm: number;
  fiO2Percent: number;
  temperatureCelsius?: number;
}
export interface NivSettings {
  device: "NIV";
  mode: string; // e.g. "BiPAP", "CPAP"
  ipapCmH2O: number;
  epapCmH2O: number;
  fiO2Percent: number;
}
export interface OtherDeviceSettings {
  device: "Other";
  description: string;
}

export type OxygenDeviceSettings =
  | NasalCannulaSettings | SimpleFaceMaskSettings | VenturiMaskSettings
  | NonRebreatherSettings | HfncSettings | NivSettings | OtherDeviceSettings;

// ── 1. ORDER (Doctor/RMO prescribes) ──────────────────────────────
export interface OxygenOrder {
  id: string;
  uhid: string;
  icuBed: string;
  indication: OxygenIndication;
  indicationOther?: string;
  settings: OxygenDeviceSettings;
  targetSpo2Min: number;
  targetSpo2Max: number;
  monitoringFrequency: MonitoringFrequency;
  monitoringFrequencyOther?: string;
  startDateTime: string;
  durationType: "Until discontinued" | "Specific duration";
  durationValue?: string; // e.g. "48 hours"
  specialInstructions?: string;
  status: OxygenOrderStatus;
  orderedBy: string;
  orderedByRole: OrderedByRole;
  orderedAt: string;
  // Modification trail — previous order is preserved, never overwritten
  supersedes?: string; // id of previous OxygenOrder this one replaces
  discontinuedBy?: string;
  discontinuedAt?: string;
  discontinuedReason?: string;
}

// ── 2. ADMINISTRATION (Nurse confirms therapy started / currently running) ──
export interface OxygenAdministration {
  id: string;
  orderId: string;
  uhid: string;
  actualSettings: OxygenDeviceSettings;
  startedBy: string; // nurse name
  startedAt: string;
  isActive: boolean;
  stoppedBy?: string;
  stoppedAt?: string;
}

// ── 3. MONITORING (Nurse records observations over time) ──────────
export interface OxygenObservation {
  id: string;
  orderId: string;
  uhid: string;
  administrationId: string;
  spo2: number;
  respiratoryRate: number;
  heartRate: number;
  patientCondition: PatientCondition;
  oxygenResponse: OxygenResponse;
  remarks?: string;
  recordedBy: string;
  recordedAt: string;
  // Escalation trail
  belowTarget: boolean;
  doctorNotified?: boolean;
  doctorNotifiedAt?: string;
  doctorNotifiedBy?: string;
  escalationNote?: string;
}

export interface OxygenPermissions {
  nurseCanInitiateOrAdjust: boolean; // facility/jurisdiction-configurable, per your doc point 12
}