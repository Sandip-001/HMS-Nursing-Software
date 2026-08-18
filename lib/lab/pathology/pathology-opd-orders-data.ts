// lib/lab/pathology/pathology-opd-orders-data.ts
import type {
  PathologyOPDOrder,
  ResultFlag,
  TestReferenceRange,
} from "@/types/lab/pathology/pathology-opd-types";

export const PATHOLOGY_OPD_ORDERS: PathologyOPDOrder[] = [
  {
    id: "PATH-OPD-2026-001",
    appointmentId: "OPD-260818-042",
    orderedAt: "18 Aug 2026, 10:40 AM",
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
        id: "TEST-001",
        testName: "Complete Blood Count (CBC)",
        category: "Hematology",
        sampleType: "EDTA Whole Blood",
        price: 350,
        status: "Ordered",
        referenceRange: {
          unit: "g/dL",
          normalMin: 12,
          normalMax: 16,
          lowThreshold: 12,
          highThreshold: 16,
          normalText: "12.0 - 16.0 g/dL",
        },
      },
      {
        id: "TEST-002",
        testName: "Fasting Blood Sugar",
        category: "Biochemistry",
        sampleType: "Fluoride Plasma",
        price: 120,
        status: "Sample Collected",
        sampleCollectedAt: "18 Aug 2026, 11:05 AM",
        referenceRange: {
          unit: "mg/dL",
          normalMin: 70,
          normalMax: 110,
          lowThreshold: 70,
          highThreshold: 110,
          normalText: "70 - 110 mg/dL",
        },
      },
      {
        id: "TEST-003",
        testName: "HbA1c",
        category: "Biochemistry",
        sampleType: "EDTA Whole Blood",
        price: 550,
        status: "Processing",
        sampleCollectedAt: "18 Aug 2026, 11:05 AM",
        processingStartedAt: "18 Aug 2026, 11:20 AM",
        referenceRange: {
          unit: "%",
          normalMin: 4,
          normalMax: 5.6,
          lowThreshold: 4,
          highThreshold: 6.4,
          normalText: "4.0 - 5.6 %",
        },
      },
    ],
  },
  {
    id: "PATH-OPD-2026-002",
    appointmentId: "OPD-260818-043",
    orderedAt: "18 Aug 2026, 11:20 AM",
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
    paidAt: "18 Aug 2026, 11:25 AM",
    tests: [
      {
        id: "TEST-004",
        testName: "Lipid Profile",
        category: "Biochemistry",
        sampleType: "Serum",
        price: 700,
        status: "Report Ready",
        sampleCollectedAt: "18 Aug 2026, 11:30 AM",
        processingStartedAt: "18 Aug 2026, 11:45 AM",
        reportReadyAt: "18 Aug 2026, 01:15 PM",
        resultValue: "124",
        resultFlag: "High",
        reportImageName: "Lipid_Profile_Rajesh_Kumar.jpg",
        referenceRange: {
          unit: "mg/dL",
          normalMin: 0,
          normalMax: 100,
          highThreshold: 100,
          normalText: "LDL: Less than 100 mg/dL",
        },
      },
      {
        id: "TEST-005",
        testName: "Kidney Function Test",
        category: "Biochemistry",
        sampleType: "Serum",
        price: 650,
        status: "Report Ready",
        sampleCollectedAt: "18 Aug 2026, 11:30 AM",
        processingStartedAt: "18 Aug 2026, 11:50 AM",
        reportReadyAt: "18 Aug 2026, 01:20 PM",
        resultValue: "1.0",
        resultFlag: "Normal",
        reportImageName: "KFT_Rajesh_Kumar.jpg",
        referenceRange: {
          unit: "mg/dL",
          normalMin: 0.6,
          normalMax: 1.2,
          lowThreshold: 0.6,
          highThreshold: 1.2,
          normalText: "Creatinine: 0.6 - 1.2 mg/dL",
        },
      },
    ],
  },
  {
    id: "PATH-OPD-2026-003",
    appointmentId: "OPD-260817-039",
    orderedAt: "17 Aug 2026, 04:15 PM",
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
    paidAt: "17 Aug 2026, 04:40 PM",
    tests: [
      {
        id: "TEST-006",
        testName: "Total IgE",
        category: "Immunology",
        sampleType: "Serum",
        price: 900,
        status: "Report Ready",
        sampleCollectedAt: "17 Aug 2026, 04:30 PM",
        processingStartedAt: "17 Aug 2026, 05:10 PM",
        reportReadyAt: "17 Aug 2026, 06:20 PM",
        resultValue: "180",
        resultFlag: "High",
        reportImageName: "Total_IgE_Amit_Das.jpg",
        referenceRange: {
          unit: "IU/mL",
          normalMin: 0,
          normalMax: 100,
          highThreshold: 100,
          normalText: "0 - 100 IU/mL",
        },
      },
    ],
  },
];

export function getTotalTestValue(order: PathologyOPDOrder) {
  return order.tests.reduce((sum, test) => sum + test.price, 0);
}
export function getAggregateStatus(order: PathologyOPDOrder) {
  const statuses = order.tests.map((test) => test.status);
  if (statuses.every((status) => status === "Report Ready"))
    return "Report Ready";
  if (statuses.some((status) => status === "Processing")) return "Processing";
  if (statuses.some((status) => status === "Sample Collected"))
    return "Sample Collected";
  return "Ordered";
}
export function getResultFlag(
  value: string,
  range: TestReferenceRange,
): ResultFlag | undefined {
  const numeric = Number(value);
  if (!value || Number.isNaN(numeric)) return undefined;
  if (range.lowThreshold !== undefined && numeric < range.lowThreshold)
    return "Low";
  if (range.highThreshold !== undefined && numeric > range.highThreshold)
    return "High";
  if (
    range.normalMin !== undefined &&
    range.normalMax !== undefined &&
    (numeric < range.normalMin || numeric > range.normalMax)
  )
    return "Borderline";
  return "Normal";
}
export const PATHOLOGY_DOCTORS = Array.from(
  new Set(PATHOLOGY_OPD_ORDERS.map((order) => order.doctor.name)),
);
export const PATHOLOGY_CATEGORIES = Array.from(
  new Set(
    PATHOLOGY_OPD_ORDERS.flatMap((order) =>
      order.tests.map((test) => test.category),
    ),
  ),
);
