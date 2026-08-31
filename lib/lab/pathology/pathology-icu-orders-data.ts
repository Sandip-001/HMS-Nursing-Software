// lib/lab/pathology/pathology-icu-orders-data.ts
import type { PathologyIpdOrder } from "@/types/lab/pathology/pathology-ipd-types";
import { getResultFlag } from "@/lib/lab/pathology/pathology-opd-orders-data";

/**
 * Hospital-wide pathology ICU billing configuration.
 * Controlled from the Super Admin panel per hospital.
 *
 * true  -> Pathology department can collect payment directly from
 *          the patient/attendant (Cash / UPI / Card / Net Banking).
 * false -> Pathology department only delivers reports; billing is
 *          always sent to the ICU Billing Department instead.
 */
export const PATHOLOGY_ICU_DIRECT_PAYMENT_ENABLED = false;

export const PATHOLOGY_ICU_ORDERS: PathologyIpdOrder[] = [
  {
    id: "PATH-ICU-2026-001",
    ipdId: "ICU-2026-001",
    orderedAt: "27 Aug 2026, 09:35 AM",
    patient: {
      name: "Ravi Sharma",
      uhid: "UHID12345685",
      age: 48,
      gender: "Male",
      ward: "ICU-A",
      room: "Room-1",
      bed: "ICU-A-01",
      allergies: ["Penicillin"],
      diagnosis: "Acute Myocardial Infarction - Post PCI",
    },
    doctor: {
      name: "Dr. Amit Verma",
      specialty: "Cardiology",
      registrationNumber: "WBMC-2016-30214",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "ICU-TEST-001",
        testName: "Troponin I (Repeat)",
        category: "Cardiac Markers",
        sampleType: "Serum",
        price: 850,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 09:40 AM",
        processingStartedAt: "27 Aug 2026, 09:45 AM",
        reportReadyAt: "27 Aug 2026, 10:05 AM",
        resultValue: "1.2",
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
        id: "ICU-TEST-002",
        testName: "Complete Blood Count (CBC)",
        category: "Hematology",
        sampleType: "EDTA Whole Blood",
        price: 350,
        status: "Processing",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 09:40 AM",
        processingStartedAt: "27 Aug 2026, 09:50 AM",
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
        id: "ICU-TEST-003",
        testName: "Lipid Profile",
        category: "Biochemistry",
        sampleType: "Serum",
        price: 500,
        status: "Ordered",
        urgency: "Routine",
        referenceRange: {
          unit: "mg/dL",
          normalMin: 0,
          normalMax: 200,
          highThreshold: 200,
          normalText: "< 200 mg/dL",
        },
      },
    ],
  },
  {
    id: "PATH-ICU-2026-002",
    ipdId: "ICU-2026-002",
    orderedAt: "27 Aug 2026, 11:20 AM",
    patient: {
      name: "Rahul Roy",
      uhid: "UHID12398211",
      age: 30,
      gender: "Male",
      ward: "ICU-B",
      room: "Room-3",
      bed: "ICU-B-03",
      allergies: [],
      diagnosis: "Multiple Traumatic Injuries - Post Splenectomy",
    },
    doctor: {
      name: "Dr. Rahul Mehta",
      specialty: "Trauma Surgery",
      registrationNumber: "WBMC-2015-20988",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "ICU-TEST-004",
        testName: "Blood Grouping & Cross-Matching",
        category: "Blood Bank",
        sampleType: "EDTA Whole Blood",
        price: 500,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 11:25 AM",
        processingStartedAt: "27 Aug 2026, 11:28 AM",
        reportReadyAt: "27 Aug 2026, 11:40 AM",
        resultValue: "O Positive",
        resultFlag: "Normal",
        reportImageName: "BloodGroup_Rahul_Roy.jpg",
        referenceRange: { unit: "-", normalText: "N/A" },
      },
      {
        id: "ICU-TEST-005",
        testName: "Hemoglobin (Repeat)",
        category: "Hematology",
        sampleType: "EDTA Whole Blood",
        price: 200,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 11:25 AM",
        processingStartedAt: "27 Aug 2026, 11:28 AM",
        reportReadyAt: "27 Aug 2026, 11:38 AM",
        resultValue: "9.1",
        resultFlag: "Critical",
        reportImageName: "Hemoglobin_Rahul_Roy.jpg",
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
        id: "ICU-TEST-006",
        testName: "Coagulation Profile (PT/INR)",
        category: "Hematology",
        sampleType: "Citrated Plasma",
        price: 600,
        status: "Sample Collected",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 11:26 AM",
        referenceRange: {
          unit: "seconds",
          normalMin: 11,
          normalMax: 13.5,
          lowThreshold: 11,
          highThreshold: 13.5,
          normalText: "11 - 13.5 sec",
        },
      },
      {
        id: "ICU-TEST-007",
        testName: "Serum Creatinine",
        category: "Biochemistry",
        sampleType: "Serum",
        price: 300,
        status: "Ordered",
        urgency: "Urgent",
        referenceRange: {
          unit: "mg/dL",
          normalMin: 0.6,
          normalMax: 1.3,
          lowThreshold: 0.6,
          highThreshold: 1.3,
          normalText: "0.6 - 1.3 mg/dL",
        },
      },
    ],
  },
  {
    id: "PATH-ICU-2026-003",
    ipdId: "ICU-2026-003",
    orderedAt: "27 Aug 2026, 10:50 AM",
    patient: {
      name: "Meera Joshi",
      uhid: "UHID12345750",
      age: 30,
      gender: "Female",
      ward: "ICU-A",
      room: "Room-2",
      bed: "ICU-A-02",
      allergies: [],
      diagnosis: "Drug Overdose - Suicide Attempt",
    },
    doctor: {
      name: "Dr. Priya Nair",
      specialty: "Emergency Medicine",
      registrationNumber: "WBMC-2018-45872",
    },
    paymentStatus: "Unpaid",
    tests: [
      {
        id: "ICU-TEST-008",
        testName: "Liver Function Test (LFT)",
        category: "Biochemistry",
        sampleType: "Serum",
        price: 550,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 10:55 AM",
        processingStartedAt: "27 Aug 2026, 11:10 AM",
        reportReadyAt: "27 Aug 2026, 11:35 AM",
        resultValue: "SGPT 38 U/L",
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
        id: "ICU-TEST-009",
        testName: "Toxicology Screen (Paracetamol Level)",
        category: "Toxicology",
        sampleType: "Serum",
        price: 900,
        status: "Report Ready",
        urgency: "Urgent",
        sampleCollectedAt: "27 Aug 2026, 10:55 AM",
        processingStartedAt: "27 Aug 2026, 11:10 AM",
        reportReadyAt: "27 Aug 2026, 11:35 AM",
        resultValue: "12",
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
        id: "ICU-TEST-010",
        testName: "Arterial Blood Gas (ABG)",
        category: "Clinical Pathology",
        sampleType: "Arterial Blood",
        price: 700,
        status: "Ordered",
        urgency: "Urgent",
        referenceRange: { unit: "-", normalText: "pH 7.35 - 7.45" },
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

export const PATHOLOGY_ICU_DOCTORS = Array.from(
  new Set(PATHOLOGY_ICU_ORDERS.map((order) => order.doctor.name)),
);

export const PATHOLOGY_ICU_CATEGORIES = Array.from(
  new Set(
    PATHOLOGY_ICU_ORDERS.flatMap((order) =>
      order.tests.map((test) => test.category),
    ),
  ),
);