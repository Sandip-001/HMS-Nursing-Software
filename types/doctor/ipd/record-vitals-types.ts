
export interface VitalsFormData {
  systolic: string;
  diastolic: string;
  pulse: string;
  respRate: string;
  temp: string;
  tempUnit: "°F" | "°C";
  spo2: string;
  painScore: number;
  height: string;
  weight: string;
  levelOfConsciousness: string;
  oxygenSupport: string;
  oxygenFlowRate: string;
  bloodSugar: string;
  doctorRemarks: string;
}

export type AlertLevel = "normal" | "mild" | "critical";

export interface AbnormalAlert {
  label: string;
  level: AlertLevel;
  message: string;
}