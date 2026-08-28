// lib/lab/pathology/pathology-emergency-orders-data.ts
import type { PathologyIpdOrder } from "@/types/lab/pathology/pathology-ipd-types";
import { getResultFlag } from "@/lib/lab/pathology/pathology-opd-orders-data";

/**
 * Hospital-wide pathology Emergency billing configuration.
 * Controlled from the Super Admin panel per hospital.
 *
 * true  -> Pathology department can collect payment directly from
 *          the patient/attendant (Cash / UPI / Card / Net Banking).
 * false -> Pathology department only delivers reports; billing is
 *          always sent to the Emergency Billing Department instead.
 */
export const PATHOLOGY_EMERGENCY_DIRECT_PAYMENT_ENABLED = false;

export const PATHOLOGY_EMERGENCY_ORDERS: PathologyIpdOrder[] = [
  {
    id: "PATH-ER-2026-001",
    ipdId: "ER-20260827-001",
    orderedAt: "27 Aug 2026, 07:45 AM",
    patient: {
      name: "Ravi Sharma",
      uhid: "UHID12345685",
      age: 48,
      gender: "Male",
      ward: "Emergency",
      room: "-",
      bed: "ER-Bay-2",
      allergies: ["Penicillin"],
      diagnosis: "Acute Myocardial Infarction",
    },
    doctor: {
      name: "Dr. Amit Verma",
      specialty: "Emergency Medicine",
      registrationNumber: "WBMC-2016-30214",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "ER-TEST-001",
        testName: "Troponin I (Stat)",
        category: "Cardiac Markers",
        sampleType: "Serum",
        price: 850,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 07:42 AM",
        processingStartedAt: "27 Aug 2026, 07:44 AM",
        reportReadyAt: "27 Aug 2026, 07:45 AM",
        resultValue: "1.8",
        resultFlag: "Critical",
        reportImageName: "Troponin_I_Ravi_Sharma.jpg",
        referenceRange: {
          unit: "ng/mL",
          normalMin: 0,
          normalMax: 0.04,
          highThreshold: 0.04,
          normalText: "< 0.04 ng/mL",
        },
      },
      {
        id: "ER-TEST-002",
        testName: "Complete Blood Count (CBC)",
        category: "Hematology",
        sampleType: "EDTA Whole Blood",
        price: 350,
        status: "Processing",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 07:42 AM",
        processingStartedAt: "27 Aug 2026, 07:50 AM",
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
        id: "ER-TEST-003",
        testName: "Electrolytes Panel (Na/K/Cl)",
        category: "Biochemistry",
        sampleType: "Serum",
        price: 450,
        status: "Ordered",
        urgency: "Routine",
        referenceRange: {
          unit: "mmol/L",
          normalMin: 135,
          normalMax: 145,
          lowThreshold: 135,
          highThreshold: 145,
          normalText: "Na: 135 - 145 mmol/L",
        },
      },
    ],
  },
  {
    id: "PATH-ER-2026-002",
    ipdId: "ER-20260827-002",
    orderedAt: "27 Aug 2026, 08:12 AM",
    patient: {
      name: "Unknown Male (RTA)",
      uhid: "UHID12398211",
      age: 30,
      gender: "Male",
      ward: "Emergency",
      room: "-",
      bed: "ER-Bay-1 (Trauma)",
      allergies: [],
      diagnosis: "Multiple Traumatic Injuries (RTA)",
    },
    doctor: {
      name: "Dr. Rahul Mehta",
      specialty: "Trauma Surgery",
      registrationNumber: "WBMC-2015-20988",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "ER-TEST-004",
        testName: "Blood Grouping & Cross-Matching",
        category: "Blood Bank",
        sampleType: "EDTA Whole Blood",
        price: 500,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 08:14 AM",
        processingStartedAt: "27 Aug 2026, 08:16 AM",
        reportReadyAt: "27 Aug 2026, 08:22 AM",
        resultValue: "O Positive",
        resultFlag: "Normal",
        reportImageName: "BloodGroup_Unknown_Male.jpg",
        referenceRange: { unit: "-", normalText: "N/A" },
      },
      {
        id: "ER-TEST-005",
        testName: "Hemoglobin (Stat)",
        category: "Hematology",
        sampleType: "EDTA Whole Blood",
        price: 200,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 08:14 AM",
        processingStartedAt: "27 Aug 2026, 08:16 AM",
        reportReadyAt: "27 Aug 2026, 08:20 AM",
        resultValue: "8.2",
        resultFlag: "Critical",
        reportImageName: "Hemoglobin_Unknown_Male.jpg",
        referenceRange: {
          unit: "g/dL",
          normalMin: 13,
          normalMax: 17,
          lowThreshold: 13,
          highThreshold: 17,
          normalText: "13.0 - 17.0 g/dL",
        },
      },
      {
        id: "ER-TEST-006",
        testName: "Coagulation Profile (PT/INR)",
        category: "Hematology",
        sampleType: "Citrated Plasma",
        price: 600,
        status: "Sample Collected",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 08:15 AM",
        referenceRange: {
          unit: "seconds",
          normalMin: 11,
          normalMax: 13.5,
          lowThreshold: 11,
          highThreshold: 13.5,
          normalText: "11 - 13.5 sec",
        },
      },
    ],
  },
  {
    id: "PATH-ER-2026-003",
    ipdId: "ER-20260827-003",
    orderedAt: "27 Aug 2026, 09:15 AM",
    patient: {
      name: "Meera Joshi",
      uhid: "UHID12345750",
      age: 30,
      gender: "Female",
      ward: "Emergency",
      room: "-",
      bed: "ER-Bay-4",
      allergies: [],
      diagnosis: "Poisoning, unspecified drug",
    },
    doctor: {
      name: "Dr. Priya Nair",
      specialty: "Emergency Medicine",
      registrationNumber: "WBMC-2018-45872",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "ER-TEST-007",
        testName: "Liver Function Test (LFT)",
        category: "Biochemistry",
        sampleType: "Serum",
        price: 550,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 09:20 AM",
        processingStartedAt: "27 Aug 2026, 09:35 AM",
        reportReadyAt: "27 Aug 2026, 10:00 AM",
        resultValue: "SGPT 42 U/L",
        resultFlag: "Normal",
        reportImageName: "LFT_Meera_Joshi.jpg",
        referenceRange: {
          unit: "U/L",
          normalMin: 7,
          normalMax: 56,
          lowThreshold: 7,
          highThreshold: 56,
          normalText: "7 - 56 U/L",
        },
      },
      {
        id: "ER-TEST-008",
        testName: "Toxicology Screen (Paracetamol Level)",
        category: "Toxicology",
        sampleType: "Serum",
        price: 900,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 09:20 AM",
        processingStartedAt: "27 Aug 2026, 09:35 AM",
        reportReadyAt: "27 Aug 2026, 10:00 AM",
        resultValue: "18",
        resultFlag: "High",
        reportImageName: "Toxicology_Meera_Joshi.jpg",
        referenceRange: {
          unit: "mcg/mL",
          normalMin: 0,
          normalMax: 10,
          highThreshold: 10,
          normalText: "< 10 mcg/mL (4hr)",
        },
      },
      {
        id: "ER-TEST-009",
        testName: "Urine Routine Examination",
        category: "Clinical Pathology",
        sampleType: "Urine",
        price: 250,
        status: "Ordered",
        urgency: "Routine",
        referenceRange: { unit: "-", normalText: "No abnormal findings" },
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

export const PATHOLOGY_EMERGENCY_DOCTORS = Array.from(
  new Set(PATHOLOGY_EMERGENCY_ORDERS.map((order) => order.doctor.name)),
);

export const PATHOLOGY_EMERGENCY_CATEGORIES = Array.from(
  new Set(
    PATHOLOGY_EMERGENCY_ORDERS.flatMap((order) =>
      order.tests.map((test) => test.category),
    ),
  ),
);