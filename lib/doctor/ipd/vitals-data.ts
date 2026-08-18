// lib/vitals-data.ts
import type { VitalRecordEntry, VitalAlert, NormalRange } from "@/types/doctor/ipd/vitals-types";

export const VITALS_RECORDS: Record<string, VitalRecordEntry[]> = {
  UHID12345685: [
    { dateTime: "20 May 2024, 08:00 AM", bp: "120/80", systolic: 120, diastolic: 80, pulse: 78, respRate: 18, spo2: 98, temp: 98.4, pain: 2, recordedBy: "Nurse Neha" },
    { dateTime: "19 May 2024, 08:00 PM", bp: "118/78", systolic: 118, diastolic: 78, pulse: 76, respRate: 18, spo2: 98, temp: 99.2, pain: 3, recordedBy: "Nurse Neha" },
    { dateTime: "19 May 2024, 08:00 AM", bp: "124/82", systolic: 124, diastolic: 82, pulse: 80, respRate: 20, spo2: 96, temp: 98.6, pain: 3, recordedBy: "Nurse Ravi" },
    { dateTime: "18 May 2024, 08:00 PM", bp: "126/84", systolic: 126, diastolic: 84, pulse: 82, respRate: 20, spo2: 97, temp: 98.8, pain: 4, recordedBy: "Nurse Ravi" },
    { dateTime: "18 May 2024, 08:00 AM", bp: "122/80", systolic: 122, diastolic: 80, pulse: 78, respRate: 18, spo2: 96, temp: 98.4, pain: 2, recordedBy: "Nurse Pooja" },
    { dateTime: "17 May 2024, 08:00 PM", bp: "120/78", systolic: 120, diastolic: 78, pulse: 76, respRate: 18, spo2: 97, temp: 98.6, pain: 2, recordedBy: "Nurse Pooja" },
  ],
  UHID12345684: [
    { dateTime: "20 May 2024, 08:10 AM", bp: "110/70", systolic: 110, diastolic: 70, pulse: 84, respRate: 20, spo2: 97, temp: 99.1, pain: 2, recordedBy: "Nurse Neha" },
    { dateTime: "19 May 2024, 08:10 PM", bp: "112/72", systolic: 112, diastolic: 72, pulse: 86, respRate: 20, spo2: 97, temp: 99.4, pain: 3, recordedBy: "Nurse Ravi" },
  ],
  UHID12345683: [
    { dateTime: "20 May 2024, 08:15 AM", bp: "90/60", systolic: 90, diastolic: 60, pulse: 110, respRate: 26, spo2: 92, temp: 100.8, pain: 6, recordedBy: "Nurse Pooja" },
    { dateTime: "19 May 2024, 08:15 PM", bp: "94/62", systolic: 94, diastolic: 62, pulse: 106, respRate: 24, spo2: 93, temp: 101.2, pain: 6, recordedBy: "Nurse Neha" },
  ],
};

export const VITALS_ALERTS: Record<string, VitalAlert[]> = {
  UHID12345685: [
    { type: "Blood Pressure", message: "Diastolic BP was high on 18 May 2024, 08:00 PM (84 mmHg)", dateTime: "18 May 2024, 08:00 PM" },
    { type: "SpO2", message: "SpO2 was 97% on 18 May 2024, 08:00 PM", dateTime: "18 May 2024, 08:00 PM" },
  ],
  UHID12345683: [
    { type: "SpO2", message: "SpO2 dropped to 92% on 20 May 2024, 08:15 AM", dateTime: "20 May 2024, 08:15 AM" },
    { type: "Temperature", message: "Temperature spiked to 101.2°F on 19 May 2024, 08:15 PM", dateTime: "19 May 2024, 08:15 PM" },
  ],
  UHID12345684: [],
};

export const NORMAL_RANGES: NormalRange[] = [
  { label: "BP", range: "90/50 - 120/80 mmHg" },
  { label: "Pulse", range: "60 - 100 bpm" },
  { label: "Resp. Rate", range: "12 - 20 /min" },
  { label: "SpO2", range: "95 - 100 %" },
  { label: "Temp.", range: "97.0 - 99.0 °F" },
  { label: "Pain (NRS)", range: "0 - 10 /10" },
];

export function getVitalsForPatient(uhid: string) {
  return VITALS_RECORDS[uhid] ?? VITALS_RECORDS.UHID12345685;
}

export function getAlertsForPatient(uhid: string) {
  return VITALS_ALERTS[uhid] ?? [];
}