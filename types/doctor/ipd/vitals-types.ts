
export interface VitalRecordEntry {
  dateTime: string;
  bp: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  respRate: number;
  spo2: number;
  temp: number;
  pain: number;
  recordedBy: string;
}

export interface VitalAlert {
  type: "Blood Pressure" | "SpO2" | "Pulse" | "Temperature";
  message: string;
  dateTime: string;
}

export interface NormalRange {
  label: string;
  range: string;
}