import { getCriticalAlertsForPatient } from "@/lib/doctor/ipd/lab-results-data";
import type { LabAlertMini } from "@/types/doctor/ipd/clinical-examination-types";

function getAlertStatus(
  direction: "low" | "high" | "borderline",
): LabAlertMini["status"] {
  switch (direction) {
    case "high":
      return "High";
    case "low":
      return "Low";
    case "borderline":
      return "Borderline";
  }
}

/**
 * Returns compact abnormal lab results for the shared sidebar
 * Lab Alerts mini component.
 */
export function getLabAlertsMini(uhid: string): LabAlertMini[] {
  const criticalAlerts = getCriticalAlertsForPatient(uhid);

  return criticalAlerts.map((alert) => ({
    testName: alert.testName,
    value: alert.value,
    unit: alert.unit,
    referenceRange: alert.referenceRange,
    status: getAlertStatus(alert.direction),
  }));
}