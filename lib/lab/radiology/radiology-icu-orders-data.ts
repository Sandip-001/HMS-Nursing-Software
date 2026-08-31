// lib/lab/radiology/radiology-icu-orders-data.ts
import type { RadiologyIpdOrder } from "@/types/lab/radiology/radiology-ipd-types";

/**
 * Hospital-wide configuration from the Super Admin panel.
 * true: Radiology can collect ICU payment directly.
 * false: All ICU radiology bills are sent to ICU Billing Department.
 */
export const RADIOLOGY_ICU_DIRECT_PAYMENT_ENABLED = true;

export const RADIOLOGY_ICU_ORDERS: RadiologyIpdOrder[] = [
  {
    id: "RAD-ICU-2026-001",
    ipdId: "ICU-2026-001",
    orderedAt: "27 Aug 2026, 09:45 AM",
    patient: { name: "Ravi Sharma", uhid: "UHID12345685", age: 48, gender: "Male", ward: "ICU-A", room: "Room-1", bed: "ICU-A-01", allergies: ["Penicillin"], diagnosis: "Acute Myocardial Infarction - Post PCI" },
    doctor: { name: "Dr. Amit Verma", specialty: "Cardiology", registrationNumber: "WBMC-2016-30214" },
    paymentStatus: "Unpaid",
    tests: [
      { id: "RAD-ICU-TEST-001", testName: "Chest X-Ray Portable (AP View)", category: "Chest Imaging", modality: "X-Ray", bodyPart: "Chest", price: 550, status: "Report Ready", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 09:50 AM", reportReadyAt: "27 Aug 2026, 10:00 AM", reportImageName: "CXR_Portable_Ravi_Sharma_ICU.jpg", reportRemarks: "No pneumothorax. Mild cardiomegaly. No acute pulmonary edema. Post-PCI status.", instructions: "Portable bedside imaging in ICU. Patient on oxygen and monitoring." },
      { id: "RAD-ICU-TEST-002", testName: "2D Echo with Color Doppler (Stat)", category: "Cardiac Imaging", modality: "Echo", bodyPart: "Heart", price: 2200, status: "Processing", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 10:10 AM", instructions: "Ensure ECG leads are available. Patient should be resting for 10 minutes before study. Post-PCI evaluation." },
      { id: "RAD-ICU-TEST-003", testName: "Carotid Doppler Study", category: "Vascular Imaging", modality: "Ultrasound", bodyPart: "Neck", price: 1800, status: "Ordered", urgency: "Routine", instructions: "Assess carotid arteries for stenosis. Patient on antiplatelet therapy." },
    ],
  },
  {
    id: "RAD-ICU-2026-002",
    ipdId: "ICU-2026-002",
    orderedAt: "27 Aug 2026, 11:30 AM",
    patient: { name: "Rahul Roy", uhid: "UHID12398211", age: 30, gender: "Male", ward: "ICU-B", room: "Room-3", bed: "ICU-B-03", allergies: [], diagnosis: "Multiple Traumatic Injuries - Post Splenectomy" },
    doctor: { name: "Dr. Rahul Mehta", specialty: "Trauma Surgery", registrationNumber: "WBMC-2015-20988" },
    paymentStatus: "Unpaid",
    tests: [
      { id: "RAD-ICU-TEST-004", testName: "Chest X-Ray Portable (AP View)", category: "Chest Imaging", modality: "X-Ray", bodyPart: "Chest", price: 550, status: "Report Ready", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 11:35 AM", reportReadyAt: "27 Aug 2026, 11:45 AM", reportImageName: "CXR_Portable_Rahul_Roy_ICU.jpg", reportRemarks: "No rib fractures visible. No pneumothorax. Mild subcutaneous emphysema resolving.", instructions: "Portable bedside imaging in ICU. Post-operative monitoring." },
      { id: "RAD-ICU-TEST-005", testName: "Ultrasound Abdomen (Post-Op)", category: "Abdominal Imaging", modality: "Ultrasound", bodyPart: "Abdomen", price: 1400, status: "Report Ready", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 11:50 AM", reportReadyAt: "27 Aug 2026, 12:05 PM", reportImageName: "USG_Abdomen_Rahul_Roy.jpg", reportRemarks: "No free fluid in abdomen. Post-splenectomy changes. No collection in splenic bed.", instructions: "Assess for post-operative complications. Patient hemodynamically stable." },
      { id: "RAD-ICU-TEST-006", testName: "CT Brain Plain (Emergency)", category: "Neuro Imaging", modality: "CT Scan", bodyPart: "Brain", price: 3500, status: "Processing", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 12:15 PM", instructions: "Check GCS, ensure airway secured. Patient conscious but drowsy." },
      { id: "RAD-ICU-TEST-007", testName: "X-Ray Left Femur (AP/Lateral)", category: "Musculoskeletal Imaging", modality: "X-Ray", bodyPart: "Left Femur", price: 650, status: "Ordered", urgency: "Routine", instructions: "Assess for fracture healing. Patient on traction." },
    ],
  },
  {
    id: "RAD-ICU-2026-003",
    ipdId: "ICU-2026-003",
    orderedAt: "27 Aug 2026, 11:00 AM",
    patient: { name: "Meera Joshi", uhid: "UHID12345750", age: 30, gender: "Female", ward: "ICU-A", room: "Room-2", bed: "ICU-A-02", allergies: [], diagnosis: "Drug Overdose - Suicide Attempt" },
    doctor: { name: "Dr. Priya Nair", specialty: "Emergency Medicine", registrationNumber: "WBMC-2018-45872" },
    paymentStatus: "Unpaid",
    tests: [
      { id: "RAD-ICU-TEST-008", testName: "Chest X-Ray PA View", category: "Chest Imaging", modality: "X-Ray", bodyPart: "Chest", price: 450, status: "Report Ready", urgency: "Routine", processingStartedAt: "27 Aug 2026, 11:05 AM", reportReadyAt: "27 Aug 2026, 11:15 AM", reportImageName: "CXR_PA_Meera_Joshi_ICU.jpg", reportRemarks: "No acute cardiopulmonary abnormality. No aspiration pneumonia. Clear lung fields.", instructions: "Remove metallic objects from chest area. Patient cooperative." },
      { id: "RAD-ICU-TEST-009", testName: "Ultrasound Abdomen (Limited)", category: "Abdominal Imaging", modality: "Ultrasound", bodyPart: "Abdomen", price: 1000, status: "Report Ready", urgency: "Urgent", processingStartedAt: "27 Aug 2026, 11:20 AM", reportReadyAt: "27 Aug 2026, 11:35 AM", reportImageName: "USG_Abdomen_Meera_Joshi.jpg", reportRemarks: "Liver, gallbladder, kidneys appear normal. No free fluid. No organomegaly.", instructions: "Assess liver, gallbladder, kidneys for any abnormalities. Patient conscious, cooperative." },
      { id: "RAD-ICU-TEST-010", testName: "CT Abdomen with Contrast", category: "Abdominal Imaging", modality: "CT Scan", bodyPart: "Abdomen", price: 4500, status: "Ordered", urgency: "Urgent", instructions: "Check renal function before contrast. Assess for any organ damage from toxicity." },
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

export const RADIOLOGY_ICU_DOCTORS = Array.from(
  new Set(RADIOLOGY_ICU_ORDERS.map((order) => order.doctor.name)),
);

export const RADIOLOGY_ICU_CATEGORIES = Array.from(
  new Set(
    RADIOLOGY_ICU_ORDERS.flatMap((order) =>
      order.tests.map((test) => test.category),
    ),
  ),
);