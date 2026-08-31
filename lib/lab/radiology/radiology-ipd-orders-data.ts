// lib/lab/radiology/radiology-ipd-orders-data.ts
import type { RadiologyIpdOrder } from "@/types/lab/radiology/radiology-ipd-types";

/**
 * Hospital-wide configuration from the Super Admin panel.
 * true: Radiology can collect IPD payment directly.
 * false: All IPD radiology bills are sent to IPD Billing Department.
 */
export const RADIOLOGY_IPD_DIRECT_PAYMENT_ENABLED = false;

export const RADIOLOGY_IPD_ORDERS: RadiologyIpdOrder[] = [
  {
    id: "RAD-IPD-2026-001",
    ipdId: "IPD240818-0001",
    orderedAt: "18 Aug 2026, 09:00 AM",
    patient: { name: "Ravi Sharma", uhid: "UHID12345685", age: 48, gender: "Male", ward: "Semi Private", room: "Room-2", bed: "B-203", allergies: ["Penicillin"], diagnosis: "Stable Angina" },
    doctor: { name: "Dr. Amit Verma", specialty: "Cardiology", registrationNumber: "WBMC-2016-30214" },
    paymentStatus: "Unpaid",
    tests: [
      { id: "RAD-IPD-TEST-001", testName: "2D Echo with Color Doppler", category: "Cardiac Imaging", modality: "Echo", bodyPart: "Heart", price: 2200, status: "Ordered", urgency: "Urgent", instructions: "Ensure ECG leads are available. Patient should be resting for 10 minutes before study." },
      { id: "RAD-IPD-TEST-002", testName: "Chest X-Ray PA View", category: "Chest Imaging", modality: "X-Ray", bodyPart: "Chest", price: 450, status: "Processing", urgency: "Routine", processingStartedAt: "18 Aug 2026, 09:20 AM", instructions: "Remove metallic objects from chest area." },
    ],
  },
  {
    id: "RAD-IPD-2026-002",
    ipdId: "IPD240818-0002",
    orderedAt: "18 Aug 2026, 10:05 AM",
    patient: { name: "Neha Singh", uhid: "UHID12345684", age: 36, gender: "Female", ward: "General Ward", room: "Room-5", bed: "G-108", allergies: [], diagnosis: "Viral Fever" },
    doctor: { name: "Dr. Priya Nair", specialty: "General Medicine", registrationNumber: "WBMC-2018-45872" },
    paymentStatus: "Unpaid",
    tests: [
      { id: "RAD-IPD-TEST-003", testName: "Ultrasound Abdomen & Pelvis", category: "Abdominal Imaging", modality: "Ultrasound", bodyPart: "Abdomen & Pelvis", price: 1200, status: "Report Ready", urgency: "Routine", processingStartedAt: "18 Aug 2026, 10:20 AM", reportReadyAt: "18 Aug 2026, 11:10 AM", reportImageName: "USG_Abdomen_Neha_Singh.jpg", reportRemarks: "Mild hepatomegaly. No focal lesion or free fluid detected.", instructions: "Maintain fasting for at least 6 hours before scan." },
    ],
  },
  {
    id: "RAD-IPD-2026-003",
    ipdId: "IPD240818-0003",
    orderedAt: "18 Aug 2026, 08:10 AM",
    patient: { name: "Suresh Yadav", uhid: "UHID12345683", age: 55, gender: "Male", ward: "ICU", room: "Bed-3", bed: "ICU-03", allergies: ["Sulfa Drugs"], diagnosis: "Post-Op Sepsis" },
    doctor: { name: "Dr. Rahul Mehta", specialty: "General Surgery", registrationNumber: "WBMC-2015-20988" },
    paymentStatus: "Unpaid",
    tests: [
      { id: "RAD-IPD-TEST-004", testName: "CT Brain Plain", category: "Neuro Imaging", modality: "CT Scan", bodyPart: "Brain", price: 3500, status: "Report Ready", urgency: "Urgent", processingStartedAt: "18 Aug 2026, 08:30 AM", reportReadyAt: "18 Aug 2026, 09:35 AM", reportImageName: "CT_Brain_Suresh_Yadav.jpg", reportRemarks: "No acute intracranial hemorrhage. Mild chronic microvascular ischemic changes.", instructions: "Check contrast allergy only if contrast study is requested." },
      { id: "RAD-IPD-TEST-005", testName: "Portable Chest X-Ray", category: "Chest Imaging", modality: "X-Ray", bodyPart: "Chest", price: 650, status: "Processing", urgency: "Urgent", processingStartedAt: "18 Aug 2026, 08:35 AM", instructions: "Portable bedside imaging required in ICU." },
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

export const RADIOLOGY_IPD_DOCTORS = Array.from(
  new Set(RADIOLOGY_IPD_ORDERS.map((order) => order.doctor.name)),
);

export const RADIOLOGY_IPD_CATEGORIES = Array.from(
  new Set(
    RADIOLOGY_IPD_ORDERS.flatMap((order) =>
      order.tests.map((test) => test.category),
    ),
  ),
);