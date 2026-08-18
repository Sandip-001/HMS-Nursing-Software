// lib/lab/radiology/radiology-opd-orders-data.ts
import type { RadiologyOPDOrder } from "@/types/lab/radiology/radiology-opd-types";

export const RADIOLOGY_OPD_ORDERS: RadiologyOPDOrder[] = [
  {
    id: "RAD-OPD-2026-001",
    appointmentId: "OPD-260818-042",
    orderedAt: "18 Aug 2026, 10:50 AM",
    patient: {
      name: "Mrs. Sushmita Ghosh",
      uhid: "UHID-245812",
      age: 54,
      gender: "Female",
      mobile: "9876543210",
      allergies: ["Penicillin", "Diclofenac"],
      diagnosis: "Acute Bronchitis with Type 2 Diabetes Mellitus",
    },
    doctor: {
      name: "Dr. Arindam Sen",
      specialty: "General Medicine",
      registrationNumber: "WBMC-2018-45872",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "RAD-TEST-001",
        testName: "Chest X-Ray PA View",
        category: "Chest Imaging",
        modality: "X-Ray",
        bodyPart: "Chest",
        price: 450,
        status: "Ordered",
        instructions: "Remove metal objects from chest area before imaging.",
      },
      {
        id: "RAD-TEST-002",
        testName: "ECG 12 Lead",
        category: "Cardiac Imaging",
        modality: "ECG",
        bodyPart: "Heart",
        price: 300,
        status: "Processing",
        processingStartedAt: "18 Aug 2026, 11:10 AM",
        instructions: "Patient to rest for 5 minutes before recording.",
      },
    ],
  },
  {
    id: "RAD-OPD-2026-002",
    appointmentId: "OPD-260818-043",
    orderedAt: "18 Aug 2026, 11:35 AM",
    patient: {
      name: "Mr. Rajesh Kumar",
      uhid: "UHID-198234",
      age: 42,
      gender: "Male",
      mobile: "9123456789",
      allergies: [],
      diagnosis: "Type 2 Diabetes Mellitus",
    },
    doctor: {
      name: "Dr. Arindam Sen",
      specialty: "General Medicine",
      registrationNumber: "WBMC-2018-45872",
    },
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    paidAt: "18 Aug 2026, 11:40 AM",
    tests: [
      {
        id: "RAD-TEST-003",
        testName: "Ultrasound Abdomen & Pelvis",
        category: "Abdominal Imaging",
        modality: "Ultrasound",
        bodyPart: "Abdomen & Pelvis",
        price: 1200,
        status: "Report Ready",
        processingStartedAt: "18 Aug 2026, 11:50 AM",
        reportReadyAt: "18 Aug 2026, 12:40 PM",
        reportImageName: "USG_Abdomen_Rajesh_Kumar.jpg",
        reportRemarks: "Mild fatty liver changes. No focal lesion identified.",
        instructions: "Patient should be fasting for at least 6 hours.",
      },
    ],
  },
  {
    id: "RAD-OPD-2026-003",
    appointmentId: "OPD-260817-039",
    orderedAt: "17 Aug 2026, 04:25 PM",
    patient: {
      name: "Mr. Amit Das",
      uhid: "UHID-445678",
      age: 35,
      gender: "Male",
      mobile: "9012345678",
      allergies: [],
      diagnosis: "Allergic Contact Dermatitis",
    },
    doctor: {
      name: "Dr. Meera Kapoor",
      specialty: "Dermatology",
      registrationNumber: "WBMC-2019-88420",
    },
    paymentStatus: "Paid",
    paymentMethod: "Cash",
    paidAt: "17 Aug 2026, 04:35 PM",
    tests: [
      {
        id: "RAD-TEST-004",
        testName: "X-Ray Hand AP & Lateral",
        category: "Musculoskeletal Imaging",
        modality: "X-Ray",
        bodyPart: "Right Hand",
        price: 550,
        status: "Report Ready",
        processingStartedAt: "17 Aug 2026, 04:40 PM",
        reportReadyAt: "17 Aug 2026, 05:15 PM",
        reportImageName: "XRay_Hand_Amit_Das.jpg",
        reportRemarks: "No acute bony abnormality or fracture seen.",
      },
      {
        id: "RAD-TEST-005",
        testName: "MRI Brain Plain",
        category: "Neuro Imaging",
        modality: "MRI",
        bodyPart: "Brain",
        price: 6500,
        status: "Ordered",
        instructions:
          "Screen for implants, pacemaker, metallic foreign body, and claustrophobia before MRI.",
      },
    ],
  },
];

export function getTotalRadiologyValue(order: RadiologyOPDOrder) {
  return order.tests.reduce((sum, test) => sum + test.price, 0);
}
export function getRadiologyAggregateStatus(order: RadiologyOPDOrder) {
  const statuses = order.tests.map((test) => test.status);
  if (statuses.every((status) => status === "Report Ready"))
    return "Report Ready";
  if (statuses.some((status) => status === "Processing")) return "Processing";
  return "Ordered";
}
export const RADIOLOGY_DOCTORS = Array.from(
  new Set(RADIOLOGY_OPD_ORDERS.map((order) => order.doctor.name)),
);
export const RADIOLOGY_CATEGORIES = Array.from(
  new Set(
    RADIOLOGY_OPD_ORDERS.flatMap((order) =>
      order.tests.map((test) => test.category),
    ),
  ),
);
