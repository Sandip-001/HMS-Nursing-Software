
import type { VitalsFormData, AbnormalAlert } from "@/types/doctor/ipd/record-vitals-types";

export function calculateBMI(heightCm: string, weightKg: string): string {
  const h = parseFloat(heightCm);
  const w = parseFloat(weightKg);
  if (!h || !w) return "-";
  const heightM = h / 100;
  return (w / (heightM * heightM)).toFixed(1);
}

export function evaluateAbnormalAlerts(data: VitalsFormData): AbnormalAlert[] {
  const systolic = parseFloat(data.systolic);
  const diastolic = parseFloat(data.diastolic);
  const pulse = parseFloat(data.pulse);
  const spo2 = parseFloat(data.spo2);
  const pain = data.painScore;

  const alerts: AbnormalAlert[] = [];

  if (systolic && diastolic) {
    if (systolic > 140 || diastolic > 90) alerts.push({ label: "BP", level: "critical", message: "High" });
    else if (systolic < 90 || diastolic < 60) alerts.push({ label: "BP", level: "mild", message: "Low" });
    else alerts.push({ label: "BP", level: "normal", message: "Within Range" });
  } else {
    alerts.push({ label: "BP", level: "normal", message: "Within Range" });
  }

  if (pulse) {
    if (pulse > 100) alerts.push({ label: "Pulse Rate", level: "critical", message: "Tachycardia" });
    else if (pulse < 60) alerts.push({ label: "Pulse Rate", level: "mild", message: "Bradycardia" });
    else alerts.push({ label: "Pulse Rate", level: "normal", message: "Normal" });
  } else {
    alerts.push({ label: "Pulse Rate", level: "normal", message: "Normal" });
  }

  if (spo2) {
    if (spo2 < 92) alerts.push({ label: "SpO2", level: "critical", message: "Low" });
    else if (spo2 < 95) alerts.push({ label: "SpO2", level: "mild", message: "Slightly Low" });
    else alerts.push({ label: "SpO2", level: "normal", message: "Normal" });
  } else {
    alerts.push({ label: "SpO2", level: "normal", message: "Normal" });
  }

  if (pain >= 7) alerts.push({ label: "Pain Score", level: "critical", message: `Severe (${pain}/10)` });
  else if (pain >= 4) alerts.push({ label: "Pain Score", level: "mild", message: `Moderate (${pain}/10)` });
  else if (pain >= 1) alerts.push({ label: "Pain Score", level: "mild", message: `Mild (${pain}/10)` });
  else alerts.push({ label: "Pain Score", level: "normal", message: "No Pain" });

  return alerts;
}