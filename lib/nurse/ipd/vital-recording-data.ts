
import type { VitalHistoryItem, VitalRecordingForm } from "@/types/nurse/ipd/vital-recording-types";

export const VITAL_HISTORY_DATA: Record<string, VitalHistoryItem[]> = {
  UHID12345685: [
    {
      id: "VH1",
      dateTime: "20 May 2024, 10:45 AM",
      temperature: "98.4",
      pulse: "80",
      respiratoryRate: "18",
      bloodPressure: "126/78",
      spo2: "98",
      painScore: "2",
      recordedBy: "Neha Singh",
    },
    {
      id: "VH2",
      dateTime: "20 May 2024, 08:30 AM",
      temperature: "98.2",
      pulse: "78",
      respiratoryRate: "16",
      bloodPressure: "124/76",
      spo2: "97",
      painScore: "1",
      recordedBy: "Neha Singh",
    },
    {
      id: "VH3",
      dateTime: "20 May 2024, 06:30 AM",
      temperature: "98.0",
      pulse: "76",
      respiratoryRate: "16",
      bloodPressure: "122/78",
      spo2: "98",
      painScore: "1",
      recordedBy: "Neha Singh",
    },
  ],
};

export const DEFAULT_VITAL_FORM: Record<string, VitalRecordingForm> = {
  UHID12345685: {
    recordedBy: "Neha Singh (Staff Nurse)",
    recordTime: "2024-05-20T12:25",
    temperature: "98.6",
    pulse: "82",
    respiratoryRate: "18",
    bloodPressureSystolic: "128",
    bloodPressureDiastolic: "80",
    spo2: "98",
    painScore: "2",
    bloodSugar: "124",
    height: "172",
    weight: "72.5",
    bmi: "24.5",
    consciousness: "Alert",
    oxygenTherapy: "None",
    remarks: "",
  },
};

export function getVitalHistory(uhid: string): VitalHistoryItem[] {
  return VITAL_HISTORY_DATA[uhid] ?? VITAL_HISTORY_DATA.UHID12345685;
}

export function getDefaultVitalForm(uhid: string): VitalRecordingForm {
  return DEFAULT_VITAL_FORM[uhid] ?? DEFAULT_VITAL_FORM.UHID12345685;
}