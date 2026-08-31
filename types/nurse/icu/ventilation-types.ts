// types/nurse/icu/ventilation-types.ts

export type VentilationType = "Invasive Mechanical Ventilation" | "Non-Invasive Ventilation" | "CPAP" | "BiPAP" | "Other";
export type AirwayType = "Endotracheal tube" | "Tracheostomy" | "Other" | "None";
export type VentilatorMode = "Volume Control" | "Pressure Control" | "SIMV" | "PSV" | "CPAP" | "BiPAP" | "Other";
export type VentilationOrderStatus = "Active" | "Modified" | "Discontinued";
export type OrderedByRole = "Doctor" | "RMO";
export type PatientVentStatus = "Stable" | "Needs Review" | "Deteriorating";
export type WeaningPlan = "Continue current support" | "Weaning assessment" | "Weaning trial" | "Continue ventilation" | "Extubation assessment" | "Extubation decision" | "Other";

// ── 1. ORDER (Doctor/RMO prescribes) ──────────────────────────────
export interface VentilatorOrder {
  id: string;
  uhid: string;
  icuBed: string;
  ventilationType: VentilationType;
  airwayType?: AirwayType;
  airwayDetails?: string; // e.g. tube size, location
  ventilatorName?: string; // e.g. "Ventilator-ICU-03"
  mode: VentilatorMode;
  // Mode-specific prescribed settings — stored as a flexible object, validated per mode in UI
  prescribedSettings: Record<string, number | string>;
  // Clinical targets / instructions
  oxygenationTarget?: string; // e.g. "SpO2 94-98%"
  ventilationTarget?: string; // e.g. "pCO2 35-45 mmHg"
  specialInstructions?: string;
  monitoringFrequency?: string; // e.g. "Hourly", "Continuous"
  weaningPlan?: WeaningPlan;
  weaningPlanOther?: string;
  status: VentilationOrderStatus;
  orderedBy: string;
  orderedByRole: OrderedByRole;
  orderedAt: string;
  // Modification trail
  supersedes?: string; // id of previous VentilatorOrder this one replaces
  discontinuedBy?: string;
  discontinuedAt?: string;
  discontinuedReason?: string;
}

// ── 2. ADMINISTRATION (Nurse confirms ventilator setup/active) ───
export interface VentilatorAdministration {
  id: string;
  orderId: string;
  uhid: string;
  actualSettings: Record<string, number | string>; // what's actually set on the device
  confirmedBy: string; // nurse name
  confirmedAt: string;
  isActive: boolean;
  stoppedBy?: string;
  stoppedAt?: string;
}

// ── 3. OBSERVATION (Nurse records ventilator + patient parameters) ──
export interface VentilatorObservation {
  id: string;
  orderId: string;
  uhid: string;
  administrationId: string;
  // Ventilator parameters (actual readings/settings at time of observation)
  ventilatorParameters: Record<string, number | string>;
  // Patient parameters
  spo2?: number;
  respiratoryRate?: number;
  heartRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  temperature?: number;
  consciousness?: string; // e.g. "Alert", "Sedated", "Comatose"
  respiratoryEffort?: string; // e.g. "Comfortable", "Increased work of breathing"
  patientVentilatorSynchrony?: string; // e.g. "Good", "Fighting ventilator"
  secretions?: string; // e.g. "Minimal", "Moderate", "Profuse"
  // Clinical assessment
  patientStatus: PatientVentStatus;
  remarks?: string;
  recordedBy: string;
  recordedAt: string;
  // Escalation trail — if observed differs from prescribed
  hasDifference: boolean;
  differenceNote?: string;
  doctorNotified?: boolean;
  doctorNotifiedAt?: string;
  doctorNotifiedBy?: string;
  escalationReason?: "Doctor order changed" | "Temporary clinical instruction" | "Device/clinical issue" | "Other";
}

export interface VentilatorPermissions {
  nurseCanAdjustWithoutOrder: boolean; // facility-configurable, per your doc point 17
}