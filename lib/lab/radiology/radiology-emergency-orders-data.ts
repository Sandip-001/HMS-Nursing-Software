// lib/lab/radiology/radiology-emergency-orders-data.ts
import type { RadiologyIpdOrder } from "@/types/lab/radiology/radiology-ipd-types";

/**
 * Hospital-wide configuration from the Super Admin panel.
 * true: Radiology can collect Emergency payment directly.
 * false: All Emergency radiology bills are sent to Emergency Billing Department.
 */
export const RADIOLOGY_EMERGENCY_DIRECT_PAYMENT_ENABLED = true;

export const RADIOLOGY_EMERGENCY_ORDERS: RadiologyIpdOrder[] = [
  {
    id: "RAD-ER-2026-001",
    ipdId: "ER-20260827-001",
    orderedAt: "27 Aug 2026, 07:20 AM",
    patient: { name: "Ravi Sharma", uhid: "UHID12345685", age: 48, gender: "Male", ward: "Emergency", room: "-", bed: "ER-Bay-2", allergies: ["Penicillin"], diagnosis: "Acute Myocardial Infarction" },
    doctor: { name: "Dr. Amit Verma", specialty: "Emergency Medicine", registrationNumber: "WBMC-2016-30214" },
    paymentStatus: "Unpaid",
    tests: [
      { id: "RAD-ER-TEST-001", testName: "Chest X-Ray Portable (AP View)", category: "Chest Imaging", modality: "X-Ray", bodyPart: "Chest", price: 550, status: "Report Ready", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 07:25 AM", reportReadyAt: "27 Aug 2026, 07:35 AM", reportImageName: "CXR_Portable_Ravi_Sharma.jpg", reportRemarks: "No pneumothorax. Mild cardiomegaly. No acute pulmonary edema.", instructions: "Portable bedside imaging in ER. Patient on oxygen." },
      { id: "RAD-ER-TEST-002", testName: "2D Echo with Color Doppler (Stat)", category: "Cardiac Imaging", modality: "Echo", bodyPart: "Heart", price: 2200, status: "Processing", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 07:40 AM", instructions: "Ensure ECG leads are available. Patient should be resting for 10 minutes before study." },
    ],
  },
  {
    id: "RAD-ER-2026-002",
    ipdId: "ER-20260827-002",
    orderedAt: "27 Aug 2026, 08:10 AM",
    patient: { name: "Unknown Male (RTA)", uhid: "UHID12398211", age: 30, gender: "Male", ward: "Emergency", room: "-", bed: "ER-Bay-1 (Trauma)", allergies: [], diagnosis: "Multiple Traumatic Injuries (RTA)" },
    doctor: { name: "Dr. Rahul Mehta", specialty: "Trauma Surgery", registrationNumber: "WBMC-2015-20988" },
    paymentStatus: "Unpaid",
    tests: [
      { id: "RAD-ER-TEST-003", testName: "FAST Abdomen Scan (Trauma)", category: "Abdominal Imaging", modality: "Ultrasound", bodyPart: "Abdomen", price: 1400, status: "Report Ready", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 08:12 AM", reportReadyAt: "27 Aug 2026, 08:18 AM", reportImageName: "FAST_Scan_Unknown_Male.jpg", reportRemarks: "Free fluid in Morrison's pouch, suggestive of splenic injury. No pericardial effusion.", instructions: "Trauma protocol. Patient hemodynamically unstable." },
      { id: "RAD-ER-TEST-004", testName: "Chest X-Ray Portable (AP View)", category: "Chest Imaging", modality: "X-Ray", bodyPart: "Chest", price: 550, status: "Report Ready", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 08:15 AM", reportReadyAt: "27 Aug 2026, 08:20 AM", reportImageName: "CXR_Portable_Unknown_Male.jpg", reportRemarks: "No rib fractures visible. No pneumothorax. Mild subcutaneous emphysema.", instructions: "Portable bedside imaging in ER trauma bay." },
      { id: "RAD-ER-TEST-005", testName: "CT Brain Plain (Emergency)", category: "Neuro Imaging", modality: "CT Scan", bodyPart: "Brain", price: 3500, status: "Ordered", urgency: "Urgent", instructions: "Check GCS, ensure airway secured. Patient unconscious on arrival." },
    ],
  },
  {
    id: "RAD-ER-2026-003",
    ipdId: "ER-20260827-003",
    orderedAt: "27 Aug 2026, 09:10 AM",
    patient: { name: "Meera Joshi", uhid: "UHID12345750", age: 30, gender: "Female", ward: "Emergency", room: "-", bed: "ER-Bay-4", allergies: [], diagnosis: "Poisoning, unspecified drug" },
    doctor: { name: "Dr. Priya Nair", specialty: "Emergency Medicine", registrationNumber: "WBMC-2018-45872" },
    paymentStatus: "Unpaid",
    tests: [
      { id: "RAD-ER-TEST-006", testName: "Chest X-Ray PA View", category: "Chest Imaging", modality: "X-Ray", bodyPart: "Chest", price: 450, status: "Report Ready", urgency: "Routine", processingStartedAt: "27 Aug 2026, 09:15 AM", reportReadyAt: "27 Aug 2026, 09:25 AM", reportImageName: "CXR_PA_Meera_Joshi.jpg", reportRemarks: "No acute cardiopulmonary abnormality. No aspiration pneumonia.", instructions: "Remove metallic objects from chest area." },
      { id: "RAD-ER-TEST-007", testName: "Ultrasound Abdomen (Limited)", category: "Abdominal Imaging", modality: "Ultrasound", bodyPart: "Abdomen", price: 1000, status: "Processing", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 09:30 AM", instructions: "Assess liver, gallbladder, kidneys for any abnormalities. Patient conscious, cooperative." },
    ],
  },
];

export function getTotalRadiologyIpdValue(order: RadiologyIpdOrder) {
  return order.tests.reduce((sum, test) => sum + test.price, 0);
}

export function getRadiologyIpdAggregateStatus(order: RadiologyIpdOrder) {
  const statuses = order.tests.map((test) => test.status);
  if (statuses.every((status) => status === "Report Ready")) return "Report Ready";
  if (statuses.some((status) => status === "Processing")) return "Processing";
  return "Ordered";
}

export function hasUrgentRadiologyIpdTest(order: RadiologyIpdOrder) {
  return order.tests.some((test) => test.urgency === "Urgent");
}

export const RADIOLOGY_EMERGENCY_DOCTORS = Array.from(
  new Set(RADIOLOGY_EMERGENCY_ORDERS.map((order) => order.doctor.name)),
);

export const RADIOLOGY_EMERGENCY_CATEGORIES = Array.from(
  new Set(
    RADIOLOGY_EMERGENCY_ORDERS.flatMap((order) =>
      order.tests.map((test) => test.category),
    ),
  ),
);