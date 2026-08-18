
export interface VitalHistoryItem {
  id: string;
  dateTime: string;
  temperature: string;
  pulse: string;
  respiratoryRate: string;
  bloodPressure: string;
  spo2: string;
  painScore: string;
  recordedBy: string;
}

export interface VitalRecordingForm {
  recordedBy: string;
  recordTime: string;
  temperature: string;
  pulse: string;
  respiratoryRate: string;
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  spo2: string;
  painScore: string;
  bloodSugar: string;
  height: string;
  weight: string;
  bmi: string;
  consciousness: string;
  oxygenTherapy: string;
  remarks: string;
}