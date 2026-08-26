// lib/lab/pathology/pathology-ipd-orders-data.ts
import type { PathologyIpdOrder } from "@/types/lab/pathology/pathology-ipd-types";
import { getResultFlag } from "@/lib/lab/pathology/pathology-opd-orders-data";

/**
 * Hospital-wide pathology IPD billing configuration.
 * Controlled from the Super Admin panel per hospital.
 *
 * true  -> Pathology department can collect payment directly from
 *          the patient/attendant (Cash / UPI / Card / Net Banking).
 * false -> Pathology department only delivers reports; billing is
 *          always sent to the IPD Billing Department instead.
 */
export const PATHOLOGY_IPD_DIRECT_PAYMENT_ENABLED = false;

export const PATHOLOGY_IPD_ORDERS: PathologyIpdOrder[] = [
  {
    id: "PATH-IPD-2026-001",
    ipdId: "IPD240818-0001",
    orderedAt: "18 Aug 2026, 08:35 AM",
    patient: {
      name: "Ravi Sharma",
      uhid: "UHID12345685",
      age: 48,
      gender: "Male",
      ward: "Semi Private",
      room: "Room-2",
      bed: "B-203",
      allergies: ["Penicillin"],
      diagnosis: "Stable Angina",
    },
    doctor: {
      name: "Dr. Amit Verma",
      specialty: "Cardiology",
      registrationNumber: "WBMC-2016-30214",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "IPD-TEST-001",
        testName: "Troponin-I",
        category: "Cardiac Markers",
        sampleType: "Serum",
        price: 850,
        status: "Ordered",
        urgency: "Urgent",
        referenceRange: {
          unit: "ng/mL",
          normalMin: 0,
          normalMax: 0.04,
          highThreshold: 0.04,
          normalText: "0 - 0.04 ng/mL",
        },
      },
      {
        id: "IPD-TEST-002",
        testName: "Complete Blood Count (CBC)",
        category: "Hematology",
        sampleType: "EDTA Whole Blood",
        price: 350,
        status: "Sample Collected",
        urgency: "Routine",
        sampleCollectedAt: "18 Aug 2026, 08:50 AM",
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
        id: "IPD-TEST-003",
        testName: "Lipid Profile",
        category: "Biochemistry",
        sampleType: "Serum",
        price: 700,
        status: "Processing",
        urgency: "Routine",
        sampleCollectedAt: "18 Aug 2026, 08:50 AM",
        processingStartedAt: "18 Aug 2026, 09:10 AM",
        referenceRange: {
          unit: "mg/dL",
          normalMin: 0,
          normalMax: 100,
          highThreshold: 100,
          normalText: "LDL: Less than 100 mg/dL",
        },
      },
    ],
  },
  {
    id: "PATH-IPD-2026-002",
    ipdId: "IPD240818-0002",
    orderedAt: "18 Aug 2026, 09:15 AM",
    patient: {
      name: "Neha Singh",
      uhid: "UHID12345684",
      age: 36,
      gender: "Female",
      ward: "General Ward",
      room: "Room-5",
      bed: "G-108",
      allergies: [],
      diagnosis: "Viral Fever",
    },
    doctor: {
      name: "Dr. Priya Nair",
      specialty: "General Medicine",
      registrationNumber: "WBMC-2018-45872",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "IPD-TEST-004",
        testName: "Dengue NS1 Antigen",
        category: "Serology",
        sampleType: "Serum",
        price: 600,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "18 Aug 2026, 09:25 AM",
        processingStartedAt: "18 Aug 2026, 09:40 AM",
        reportReadyAt: "18 Aug 2026, 11:10 AM",
        resultValue: "Negative",
        resultFlag: "Normal",
        reportImageName: "Dengue_NS1_Neha_Singh.jpg",
        referenceRange: { unit: "-", normalText: "Negative" },
      },
      {
        id: "IPD-TEST-005",
        testName: "Malaria Antigen",
        category: "Serology",
        sampleType: "EDTA Whole Blood",
        price: 450,
        status: "Sample Collected",
        urgency: "Urgent",
        sampleCollectedAt: "18 Aug 2026, 09:25 AM",
        referenceRange: { unit: "-", normalText: "Negative" },
      },
    ],
  },
  {
    id: "PATH-IPD-2026-003",
    ipdId: "IPD240818-0003",
    orderedAt: "18 Aug 2026, 07:55 AM",
    patient: {
      name: "Suresh Yadav",
      uhid: "UHID12345683",
      age: 55,
      gender: "Male",
      ward: "ICU",
      room: "Bed-3",
      bed: "ICU-03",
      allergies: ["Sulfa Drugs"],
      diagnosis: "Post-Op Sepsis",
    },
    doctor: {
      name: "Dr. Rahul Mehta",
      specialty: "General Surgery",
      registrationNumber: "WBMC-2015-20988",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "IPD-TEST-006",
        testName: "Procalcitonin",
        category: "Sepsis Markers",
        sampleType: "Serum",
        price: 1400,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "18 Aug 2026, 08:05 AM",
        processingStartedAt: "18 Aug 2026, 08:20 AM",
        reportReadyAt: "18 Aug 2026, 09:45 AM",
        resultValue: "4.8",
        resultFlag: "Critical",
        reportImageName: "Procalcitonin_Suresh_Yadav.jpg",
        referenceRange: {
          unit: "ng/mL",
          normalMin: 0,
          normalMax: 0.5,
          highThreshold: 0.5,
          normalText: "0 - 0.5 ng/mL",
        },
      },
      {
        id: "IPD-TEST-007",
        testName: "Lactate",
        category: "Critical Care",
        sampleType: "Arterial Blood",
        price: 500,
        status: "Processing",
        urgency: "Urgent",
        sampleCollectedAt: "18 Aug 2026, 08:05 AM",
        processingStartedAt: "18 Aug 2026, 08:25 AM",
        referenceRange: {
          unit: "mmol/L",
          normalMin: 0.5,
          normalMax: 2.2,
          lowThreshold: 0.5,
          highThreshold: 2.2,
          normalText: "0.5 - 2.2 mmol/L",
        },
      },
    ],
  },
];

export function getTotalIpdTestValue(order: PathologyIpdOrder) {
  return order.tests.reduce((sum, test) => sum + test.price, 0);
}

export function getIpdAggregateStatus(order: PathologyIpdOrder) {
  const statuses = order.tests.map((test) => test.status);
  if (statuses.every((status) => status === "Report Ready")) return "Report Ready";
  if (statuses.some((status) => status === "Processing")) return "Processing";
  if (statuses.some((status) => status === "Sample Collected")) return "Sample Collected";
  return "Ordered";
}

export function hasUrgentTest(order: PathologyIpdOrder) {
  return order.tests.some((test) => test.urgency === "Urgent");
}

export { getResultFlag };

export const PATHOLOGY_IPD_DOCTORS = Array.from(
  new Set(PATHOLOGY_IPD_ORDERS.map((order) => order.doctor.name)),
);

export const PATHOLOGY_IPD_CATEGORIES = Array.from(
  new Set(
    PATHOLOGY_IPD_ORDERS.flatMap((order) =>
      order.tests.map((test) => test.category),
    ),
  ),
);