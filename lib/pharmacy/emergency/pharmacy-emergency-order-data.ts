// lib/pharmacy/emergency/pharmacy-emergency-order-data.ts
import type {
  CurrentStaffProfile,
  DailyDoseLog,
  PharmacyIpdMedicineItem,
  PharmacyIpdOrder,
} from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";

/**
 * Hospital-wide toggle (same pattern as IPD).
 * true  -> Pharmacy can collect Emergency payment directly.
 * false -> Pharmacy delivers only; billing goes to Billing Department.
 */
export const PHARMACY_EMERGENCY_DIRECT_PAYMENT_ENABLED = true;

export const CURRENT_EMERGENCY_PHARMACY_STAFF: CurrentStaffProfile = {
  name: "Rohit Ghosh",
  role: "Pharmacist",
  staffId: "PHM-STF-014",
};

export function getDefaultBatch(medicine: PharmacyIpdMedicineItem) {
  const inStock = medicine.batches.filter((b) => b.availableQuantity > 0);
  return (
    inStock.sort((a, b) => a.expiryDate.localeCompare(b.expiryDate))[0] ??
    medicine.batches[0] ??
    null
  );
}

export function getMedicineTotalValue(medicine: PharmacyIpdMedicineItem) {
  return medicine.dailyLogs.reduce((sum, log) => sum + log.amount, 0);
}

export function getMedicinesGrossValue(order: PharmacyIpdOrder) {
  return order.medicines.reduce((sum, m) => sum + getMedicineTotalValue(m), 0);
}

export function getReturnsTotalValue(order: PharmacyIpdOrder) {
  return order.returns.reduce((sum, r) => sum + r.refundAmount, 0);
}

export function getDiscountTotalValue(order: PharmacyIpdOrder) {
  return order.discounts.reduce((sum, d) => sum + d.amount, 0);
}

export function getNetPayableValue(order: PharmacyIpdOrder) {
  return Math.max(
    0,
    getMedicinesGrossValue(order) -
      getReturnsTotalValue(order) -
      getDiscountTotalValue(order)
  );
}

export function getTotalPaidValue(order: PharmacyIpdOrder) {
  return order.payments.reduce((sum, p) => sum + p.amount, 0);
}

export function getBalanceDueValue(order: PharmacyIpdOrder) {
  return Math.max(0, getNetPayableValue(order) - getTotalPaidValue(order));
}

export function getMedicineStockStatus(medicine: PharmacyIpdMedicineItem) {
  const totalStock = medicine.batches.reduce(
    (sum, b) => sum + b.availableQuantity,
    0
  );
  if (totalStock === 0) return "Out of Stock" as const;
  if (totalStock < medicine.qtyPerDose) return "Partially Available" as const;
  return "All Available" as const;
}

/**
 * Emergency-specific mock orders shaped exactly like PharmacyIpdOrder.
 * Mapping notes:
 * - id          -> PHM-ER-YYYY-###
 * - ipdId       -> emergencyNumber
 * - ward/room/bed -> collapsed into bedOrBay (stored in ward/bed fields for reuse)
 * - admissionDate -> registeredAt date part (kept as a readable date string)
 * - orderingDoctor -> attendingDoctor
 * - department  -> incidentType (repurposed)
 * - diagnosis   -> currentCondition (repurposed)
 * - allergy     -> allergies (kept as string for simplicity)
 */
export const PHARMACY_EMERGENCY_ORDERS: PharmacyIpdOrder[] = [
  {
    id: "PHM-ER-2026-001",
    ipdId: "ER-20260827-001",
    uhid: "UHID12345685",
    patientName: "Ravi Sharma",
    age: 48,
    gender: "Male",
    ward: "ER-Bay-2",
    room: "-",
    bed: "ER-Bay-2",
    admissionDate: "28 Aug 2026",
    orderingDoctor: "Dr. Amit Verma",
    department: "Chest Pain",
    diagnosis: "Suspected STEMI; ECG ST elevation II, III, aVF",
    allergy: "Penicillin",
    orderDateTime: "28 Aug 2026, 07:10 AM",
    status: "Partially Delivered",
    paymentStatus: "Unpaid",
    payments: [],
    discounts: [],
    returns: [
      {
        id: "RTN-ER-001",
        medicineId: "EM2",
        medicineName: "Inj. Tramadol 50mg",
        batchNumber: "TRM24011",
        returnedQty: 1,
        unitPrice: 12,
        refundAmount: 12,
        returnedBy: "Nurse",
        returnedByName: "Nurse Kavita",
        reason: "Doctor changed order; dose not required",
        returnDate: "28 Aug 2026",
        approvedBy: "Rohit Ghosh",
      },
    ],
    medicines: [
      {
        id: "EM1",
        medicineName: "Tab. Aspirin 75mg",
        strength: "75 mg",
        frequency: "Immediate",
        route: "Oral",
        instructions: "After meal",
        urgency: "Urgent",
        durationDays: 1,
        startDate: "28 Aug 2026",
        endDate: "28 Aug 2026",
        slots: ["Morning"],
        qtyPerDose: 1,
        orderedBy: "Dr. Amit Verma",
        orderedOn: "28 Aug 2026, 07:10 AM",
        selectedBatchId: "B-ASP-01",
        batches: [
          {
            id: "B-ASP-01",
            batchNumber: "ASP24019",
            expiryDate: "2027-05-31",
            availableQuantity: 120,
            unitPrice: 230,
            rackNumber: "A-01",
            shelfNumber: "S-02",
          },
        ],
        dailyLogs: [
          {
            id: "DL-ER-1-1",
            date: "28 Aug 2026",
            slot: "Morning",
            status: "Delivered",
            orderedQtyForDose: 1,
            deliveredQtyForDose: 1,
            batchNumberUsed: "ASP24019",
            unitPriceUsed: 230,
            amount: 220,
            deliveredBy: "Rohit Ghosh",
            deliveredAt: "28 Aug 2026, 07:18 AM",
            wardReceivedAt: "28 Aug 2026, 07:22 AM",
          },
        ],
      },
      {
        id: "EM2",
        medicineName: "Inj. Tramadol 50mg",
        strength: "50 mg",
        frequency: "Immediate",
        route: "IV",
        instructions: "As directed",
        urgency: "Urgent",
        durationDays: 1,
        startDate: "28 Aug 2026",
        endDate: "28 Aug 2026",
        slots: ["Morning"],
        qtyPerDose: 1,
        orderedBy: "Dr. Amit Verma",
        orderedOn: "28 Aug 2026, 07:10 AM",
        selectedBatchId: "B-TRM-01",
        batches: [
          {
            id: "B-TRM-01",
            batchNumber: "TRM24011",
            expiryDate: "2026-12-31",
            availableQuantity: 14,
            unitPrice: 180,
            rackNumber: "C-03",
            shelfNumber: "S-01",
          },
        ],
        dailyLogs: [
          {
            id: "DL-ER-2-1",
            date: "28 Aug 2026",
            slot: "Morning",
            status: "Pending",
            orderedQtyForDose: 1,
            deliveredQtyForDose: 0,
            amount: 0,
          },
        ],
      },
      {
        id: "EM3",
        medicineName: "Inj. Ceftriaxone 1g",
        strength: "1 g",
        frequency: "Immediate",
        route: "IV",
        instructions: "As directed",
        urgency: "Urgent",
        durationDays: 1,
        startDate: "28 Aug 2026",
        endDate: "28 Aug 2026",
        slots: ["Afternoon"],
        qtyPerDose: 1,
        orderedBy: "Dr. Amit Verma",
        orderedOn: "28 Aug 2026, 07:40 AM",
        selectedBatchId: null,
        batches: [
          {
            id: "B-CEF-01",
            batchNumber: "CEF23110",
            expiryDate: "2026-10-15",
            availableQuantity: 0,
            unitPrice: 45,
            rackNumber: "D-01",
            shelfNumber: "S-02",
          },
        ],
        dailyLogs: [
          {
            id: "DL-ER-3-1",
            date: "28 Aug 2026",
            slot: "Afternoon",
            status: "Out of Stock",
            orderedQtyForDose: 1,
            deliveredQtyForDose: 0,
            amount: 0,
            remarks: "Batch CEF23110 exhausted",
            doctorNotified: true,
            doctorNotifiedAt: "28 Aug 2026, 07:30 AM",
          },
        ],
      },
    ],
  },
  {
    id: "PHM-ER-2026-002",
    ipdId: "ER-20260827-002",
    uhid: "UHID12398211",
    patientName: "Unknown Male (RTA)",
    age: 30,
    gender: "Male",
    ward: "ER-Bay-1 (Trauma)",
    room: "-",
    bed: "ER-Bay-1 (Trauma)",
    admissionDate: "28 Aug 2026",
    orderingDoctor: "Dr. Rahul Mehta",
    department: "Accident (RTA)",
    diagnosis: "Unconscious; suspected internal bleeding",
    allergy: "NKDA",
    orderDateTime: "28 Aug 2026, 08:05 AM",
    status: "All Delivered",
    paymentStatus: "Paid",
    payments: [
      {
        id: "PAY-ER-001",
        method: "Cash",
        amount: 500,
        receivedOn: "28 Aug 2026, 08:40 AM",
        receivedBy: "Rohit Ghosh",
        reference: "",
      },
    ],
    discounts: [],
    returns: [],
    medicines: [
      {
        id: "EM4",
        medicineName: "Inj. Adrenaline 1mg",
        strength: "1 mg",
        frequency: "Immediate",
        route: "IV",
        instructions: "As directed",
        urgency: "Urgent",
        durationDays: 1,
        startDate: "28 Aug 2026",
        endDate: "28 Aug 2026",
        slots: ["Morning"],
        qtyPerDose: 1,
        orderedBy: "Dr. Rahul Mehta",
        orderedOn: "28 Aug 2026, 08:05 AM",
        selectedBatchId: "B-ADR-01",
        batches: [
          {
            id: "B-ADR-01",
            batchNumber: "ADR24051",
            expiryDate: "2027-02-28",
            availableQuantity: 60,
            unitPrice: 85,
            rackNumber: "E-02",
            shelfNumber: "S-01",
          },
        ],
        dailyLogs: [
          {
            id: "DL-ER-4-1",
            date: "28 Aug 2026",
            slot: "Morning",
            status: "Delivered",
            orderedQtyForDose: 1,
            deliveredQtyForDose: 1,
            batchNumberUsed: "ADR24051",
            unitPriceUsed: 85,
            amount: 85,
            deliveredBy: "Rohit Ghosh",
            deliveredAt: "28 Aug 2026, 08:13 AM",
            wardReceivedAt: "28 Aug 2026, 08:15 AM",
          },
        ],
      },
    ],
  },
  {
    id: "PHM-ER-2026-003",
    ipdId: "ER-20260827-003",
    uhid: "UHID12345750",
    patientName: "Meera Joshi",
    age: 30,
    gender: "Female",
    ward: "ER-Bay-4",
    room: "-",
    bed: "ER-Bay-4",
    admissionDate: "28 Aug 2026",
    orderingDoctor: "Dr. Priya Nair",
    department: "Suicide Attempt",
    diagnosis: "Alleged consumption of unknown tablets ~2h ago",
    allergy: "NKDA",
    orderDateTime: "28 Aug 2026, 09:00 AM",
    status: "Partially Delivered",
    paymentStatus: "Partially Paid",
    payments: [
      {
        id: "PAY-ER-002",
        method: "UPI",
        amount: 200,
        receivedOn: "28 Aug 2026, 09:35 AM",
        receivedBy: "Rohit Ghosh",
        reference: "UPI-772110043",
      },
    ],
    discounts: [
      {
        id: "DIS-ER-001",
        percentage: 10,
        amount: 22,
        reason: "Family financial hardship",
        givenBy: "Rohit Ghosh",
        givenByRole: "Pharmacist",
        givenOn: "28 Aug 2026, 09:35 AM",
      },
    ],
    returns: [],
    medicines: [
      {
        id: "EM5",
        medicineName: "Tab. Ondansetron 4mg",
        strength: "4 mg",
        frequency: "Immediate",
        route: "Oral",
        instructions: "Before meal",
        urgency: "Routine",
        durationDays: 1,
        startDate: "28 Aug 2026",
        endDate: "28 Aug 2026",
        slots: ["Morning"],
        qtyPerDose: 1,
        orderedBy: "Dr. Priya Nair",
        orderedOn: "28 Aug 2026, 09:15 AM",
        selectedBatchId: "B-OND-01",
        batches: [
          {
            id: "B-OND-01",
            batchNumber: "OND24007",
            expiryDate: "2027-01-31",
            availableQuantity: 200,
            unitPrice: 3,
            rackNumber: "F-01",
            shelfNumber: "S-03",
          },
        ],
        dailyLogs: [
          {
            id: "DL-ER-5-1",
            date: "28 Aug 2026",
            slot: "Morning",
            status: "Delivered",
            orderedQtyForDose: 1,
            deliveredQtyForDose: 1,
            batchNumberUsed: "OND24007",
            unitPriceUsed: 3,
            amount: 3,
            deliveredBy: "Rohit Ghosh",
            deliveredAt: "28 Aug 2026, 09:22 AM",
            wardReceivedAt: "28 Aug 2026, 09:25 AM",
          },
        ],
      },
      {
        id: "EM6",
        medicineName: "Inj. Piperacillin-Tazobactam 4.5g",
        strength: "4.5 g",
        frequency: "Immediate",
        route: "IV",
        instructions: "As directed",
        urgency: "Urgent",
        durationDays: 1,
        startDate: "28 Aug 2026",
        endDate: "28 Aug 2026",
        slots: ["Afternoon"],
        qtyPerDose: 1,
        orderedBy: "Dr. Priya Nair",
        orderedOn: "28 Aug 2026, 09:15 AM",
        selectedBatchId: "B-PIP-02",
        batches: [
          {
            id: "B-PIP-02",
            batchNumber: "PIP24601",
            expiryDate: "2026-11-30",
            availableQuantity: 8,
            unitPrice: 320,
            rackNumber: "G-01",
            shelfNumber: "S-01",
          },
        ],
        dailyLogs: [
          {
            id: "DL-ER-6-1",
            date: "28 Aug 2026",
            slot: "Afternoon",
            status: "Pending",
            orderedQtyForDose: 1,
            deliveredQtyForDose: 0,
            amount: 0,
          },
        ],
      },
    ],
  },
];

export function getPharmacyEmergencyOrders() {
  return PHARMACY_EMERGENCY_ORDERS;
}

export const PHARMACY_EMERGENCY_DOCTORS = Array.from(
  new Set(PHARMACY_EMERGENCY_ORDERS.map((o) => o.orderingDoctor))
);

export const PHARMACY_EMERGENCY_BEDS_OR_BAYS = Array.from(
  new Set(PHARMACY_EMERGENCY_ORDERS.map((o) => o.bed))
);