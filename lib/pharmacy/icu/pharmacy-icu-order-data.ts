// lib/pharmacy/icu/pharmacy-icu-order-data.ts
import type {
  CurrentStaffProfile, PharmacyIpdMedicineItem, PharmacyIpdOrder,
} from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";

export const PHARMACY_ICU_DIRECT_PAYMENT_ENABLED = true;

export const CURRENT_ICU_PHARMACY_STAFF: CurrentStaffProfile = {
  name: "Rohit Ghosh",
  role: "Pharmacist",
  staffId: "PHM-ICU-014",
};

export function getDefaultBatch(medicine: PharmacyIpdMedicineItem) {
  const inStock = medicine.batches.filter((batch) => batch.availableQuantity > 0);
  return inStock.sort((a, b) => a.expiryDate.localeCompare(b.expiryDate))[0] ?? medicine.batches[0] ?? null;
}

export function getMedicineTotalValue(medicine: PharmacyIpdMedicineItem) {
  return medicine.dailyLogs.reduce((sum, log) => sum + log.amount, 0);
}

export function getMedicinesGrossValue(order: PharmacyIpdOrder) {
  return order.medicines.reduce((sum, medicine) => sum + getMedicineTotalValue(medicine), 0);
}

export function getReturnsTotalValue(order: PharmacyIpdOrder) {
  return order.returns.reduce((sum, entry) => sum + entry.refundAmount, 0);
}

export function getDiscountTotalValue(order: PharmacyIpdOrder) {
  return order.discounts.reduce((sum, entry) => sum + entry.amount, 0);
}

export function getNetPayableValue(order: PharmacyIpdOrder) {
  return Math.max(0, getMedicinesGrossValue(order) - getReturnsTotalValue(order) - getDiscountTotalValue(order));
}

export function getTotalPaidValue(order: PharmacyIpdOrder) {
  return order.payments.reduce((sum, entry) => sum + entry.amount, 0);
}

export function getBalanceDueValue(order: PharmacyIpdOrder) {
  return Math.max(0, getNetPayableValue(order) - getTotalPaidValue(order));
}

export function getMedicineStockStatus(medicine: PharmacyIpdMedicineItem) {
  const totalStock = medicine.batches.reduce((sum, batch) => sum + batch.availableQuantity, 0);
  if (totalStock === 0) return "Out of Stock" as const;
  if (totalStock < medicine.qtyPerDose) return "Partially Available" as const;
  return "All Available" as const;
}

export const PHARMACY_ICU_ORDERS: PharmacyIpdOrder[] = [
  {
    id: "PHM-ICU-2026-001",
    ipdId: "ICU-2026-001",
    uhid: "UHID12345685",
    patientName: "Ravi Sharma",
    age: 48,
    gender: "Male",
    ward: "ICU-A",
    room: "Room-1",
    bed: "ICU-A-01",
    admissionDate: "27 Aug 2026",
    orderingDoctor: "Dr. Amit Verma",
    department: "Cardiology",
    diagnosis: "Acute Myocardial Infarction - Post PCI",
    allergy: "Penicillin",
    orderDateTime: "27 Aug 2026, 09:30 AM",
    status: "Active",
    paymentStatus: "Unpaid",
    payments: [],
    discounts: [],
    returns: [],
    medicines: [
      {
        id: "M1",
        medicineName: "Tab. Aspirin 75mg",
        strength: "75 mg",
        frequency: "Once daily",
        route: "Oral",
        instructions: "After breakfast",
        urgency: "Urgent",
        durationDays: 5,
        startDate: "27 Aug 2026",
        endDate: "31 Aug 2026",
        slots: ["Morning"],
        qtyPerDose: 1,
        orderedBy: "Dr. Amit Verma",
        orderedOn: "27 Aug 2026, 09:30 AM",
        selectedBatchId: "B-ASP-01",
        batches: [
          { id: "B-ASP-01", batchNumber: "ASP24019", expiryDate: "2027-09-30", availableQuantity: 55, unitPrice: 2, rackNumber: "A-01", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L1-1", date: "27 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "ASP24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 09:40 AM", wardReceivedAt: "27 Aug 2026, 10:00 AM" },
          { id: "L1-2", date: "28 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "ASP24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 08:10 AM", wardReceivedAt: "28 Aug 2026, 08:30 AM" },
          { id: "L1-3", date: "29 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "ASP24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 08:05 AM", wardReceivedAt: "29 Aug 2026, 08:25 AM" },
          { id: "L1-4", date: "30 Aug 2026", slot: "Morning", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L1-5", date: "31 Aug 2026", slot: "Morning", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
        ],
      },
      {
        id: "M2",
        medicineName: "Tab. Metoprolol 25mg",
        strength: "25 mg",
        frequency: "Twice daily",
        route: "Oral",
        instructions: "After food",
        urgency: "Urgent",
        durationDays: 5,
        startDate: "27 Aug 2026",
        endDate: "31 Aug 2026",
        slots: ["Morning", "Night"],
        qtyPerDose: 1,
        orderedBy: "Dr. Amit Verma",
        orderedOn: "27 Aug 2026, 09:30 AM",
        selectedBatchId: "B-MET-01",
        batches: [
          { id: "B-MET-01", batchNumber: "MET24072", expiryDate: "2026-10-15", availableQuantity: 40, unitPrice: 3, rackNumber: "B-02", shelfNumber: "S-03" },
        ],
        dailyLogs: [
          { id: "L2-1", date: "27 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 09:40 AM", wardReceivedAt: "27 Aug 2026, 10:00 AM" },
          { id: "L2-2", date: "27 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 08:15 PM", wardReceivedAt: "27 Aug 2026, 08:35 PM" },
          { id: "L2-3", date: "28 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 08:10 AM", wardReceivedAt: "28 Aug 2026, 08:30 AM" },
          { id: "L2-4", date: "28 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 08:10 PM", wardReceivedAt: "28 Aug 2026, 08:30 PM" },
          { id: "L2-5", date: "29 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 08:05 AM", wardReceivedAt: "29 Aug 2026, 08:25 AM" },
          { id: "L2-6", date: "29 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 08:10 PM", wardReceivedAt: "29 Aug 2026, 08:30 PM" },
          { id: "L2-7", date: "30 Aug 2026", slot: "Morning", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L2-8", date: "30 Aug 2026", slot: "Night", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L2-9", date: "31 Aug 2026", slot: "Morning", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L2-10", date: "31 Aug 2026", slot: "Night", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
        ],
      },
      {
        id: "M3",
        medicineName: "Tab. Atorvastatin 40mg",
        strength: "40 mg",
        frequency: "Once at night",
        route: "Oral",
        instructions: "At bedtime",
        urgency: "Routine",
        durationDays: 5,
        startDate: "27 Aug 2026",
        endDate: "31 Aug 2026",
        slots: ["Night"],
        qtyPerDose: 1,
        orderedBy: "Dr. Amit Verma",
        orderedOn: "27 Aug 2026, 09:30 AM",
        selectedBatchId: "B-ATV-01",
        batches: [
          { id: "B-ATV-01", batchNumber: "ATV23980", expiryDate: "2026-12-31", availableQuantity: 34, unitPrice: 5, rackNumber: "B-04", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L3-1", date: "27 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "ATV23980", unitPriceUsed: 5, amount: 5, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 08:15 PM", wardReceivedAt: "27 Aug 2026, 08:35 PM" },
          { id: "L3-2", date: "28 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "ATV23980", unitPriceUsed: 5, amount: 5, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 08:10 PM", wardReceivedAt: "28 Aug 2026, 08:30 PM" },
          { id: "L3-3", date: "29 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "ATV23980", unitPriceUsed: 5, amount: 5, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 08:10 PM", wardReceivedAt: "29 Aug 2026, 08:30 PM" },
          { id: "L3-4", date: "30 Aug 2026", slot: "Night", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L3-5", date: "31 Aug 2026", slot: "Night", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
        ],
      },
    ],
  },
  {
    id: "PHM-ICU-2026-002",
    ipdId: "ICU-2026-002",
    uhid: "UHID12398211",
    patientName: "Rahul Roy",
    age: 30,
    gender: "Male",
    ward: "ICU-B",
    room: "Room-3",
    bed: "ICU-B-03",
    admissionDate: "27 Aug 2026",
    orderingDoctor: "Dr. Rahul Mehta",
    department: "Trauma Surgery",
    diagnosis: "Multiple Traumatic Injuries - Post Splenectomy",
    allergy: "NKDA",
    orderDateTime: "27 Aug 2026, 11:15 AM",
    status: "Active",
    paymentStatus: "Partially Paid",
    payments: [
      { id: "PAY-101", method: "Cash", amount: 5000, receivedOn: "27 Aug 2026, 02:10 PM", receivedBy: "Rohit Ghosh" },
    ],
    discounts: [],
    returns: [],
    medicines: [
      {
        id: "M4",
        medicineName: "Inj. Piperacillin-Tazobactam 4.5g",
        strength: "4.5 g",
        frequency: "Three times daily",
        route: "IV",
        instructions: "As per nursing schedule",
        urgency: "Urgent",
        durationDays: 7,
        startDate: "27 Aug 2026",
        endDate: "02 Sep 2026",
        slots: ["Morning", "Afternoon", "Night"],
        qtyPerDose: 1,
        orderedBy: "Dr. Rahul Mehta",
        orderedOn: "27 Aug 2026, 11:15 AM",
        selectedBatchId: "B-PIP-01",
        batches: [
          { id: "B-PIP-01", batchNumber: "PIP24501", expiryDate: "2026-11-30", availableQuantity: 22, unitPrice: 320, rackNumber: "ICU-01", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L4-1", date: "27 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 11:30 AM", wardReceivedAt: "27 Aug 2026, 11:35 AM" },
          { id: "L4-2", date: "27 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 02:00 PM", wardReceivedAt: "27 Aug 2026, 02:05 PM" },
          { id: "L4-3", date: "27 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 08:00 PM", wardReceivedAt: "27 Aug 2026, 08:05 PM" },
          { id: "L4-4", date: "28 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 08:00 AM", wardReceivedAt: "28 Aug 2026, 08:05 AM" },
          { id: "L4-5", date: "28 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 02:00 PM", wardReceivedAt: "28 Aug 2026, 02:05 PM" },
          { id: "L4-6", date: "28 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 08:00 PM", wardReceivedAt: "28 Aug 2026, 08:05 PM" },
          { id: "L4-7", date: "29 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 08:00 AM", wardReceivedAt: "29 Aug 2026, 08:05 AM" },
          { id: "L4-8", date: "29 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 02:00 PM", wardReceivedAt: "29 Aug 2026, 02:05 PM" },
          { id: "L4-9", date: "29 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 08:00 PM", wardReceivedAt: "29 Aug 2026, 08:05 PM" },
          { id: "L4-10", date: "30 Aug 2026", slot: "Morning", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L4-11", date: "30 Aug 2026", slot: "Afternoon", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L4-12", date: "30 Aug 2026", slot: "Night", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L4-13", date: "31 Aug 2026", slot: "Morning", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L4-14", date: "31 Aug 2026", slot: "Afternoon", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L4-15", date: "31 Aug 2026", slot: "Night", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
        ],
      },
      {
        id: "M5",
        medicineName: "Noradrenaline Infusion",
        strength: "0.1 mcg/kg/min",
        frequency: "Continuous",
        route: "IV",
        instructions: "Continuous infusion",
        urgency: "Urgent",
        durationDays: 3,
        startDate: "27 Aug 2026",
        endDate: "29 Aug 2026",
        slots: ["Morning"],
        qtyPerDose: 1,
        orderedBy: "Dr. Rahul Mehta",
        orderedOn: "27 Aug 2026, 11:15 AM",
        selectedBatchId: "B-NOR-01",
        batches: [
          { id: "B-NOR-01", batchNumber: "NOR24001", expiryDate: "2027-01-31", availableQuantity: 10, unitPrice: 450, rackNumber: "ICU-02", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L5-1", date: "27 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "NOR24001", unitPriceUsed: 450, amount: 450, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 11:30 AM", wardReceivedAt: "27 Aug 2026, 11:35 AM" },
          { id: "L5-2", date: "28 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "NOR24001", unitPriceUsed: 450, amount: 450, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 08:00 AM", wardReceivedAt: "28 Aug 2026, 08:05 AM" },
          { id: "L5-3", date: "29 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "NOR24001", unitPriceUsed: 450, amount: 450, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 08:00 AM", wardReceivedAt: "29 Aug 2026, 08:05 AM" },
        ],
      },
    ],
  },
  {
    id: "PHM-ICU-2026-003",
    ipdId: "ICU-2026-003",
    uhid: "UHID12345750",
    patientName: "Meera Joshi",
    age: 30,
    gender: "Female",
    ward: "ICU-A",
    room: "Room-2",
    bed: "ICU-A-02",
    admissionDate: "27 Aug 2026",
    orderingDoctor: "Dr. Priya Nair",
    department: "Emergency Medicine",
    diagnosis: "Drug Overdose - Suicide Attempt",
    allergy: "NKDA",
    orderDateTime: "27 Aug 2026, 10:45 AM",
    status: "Payment Received",
    paymentStatus: "Paid",
    payments: [
      { id: "PAY-201", method: "UPI", amount: 500, receivedOn: "27 Aug 2026, 11:00 AM", receivedBy: "Rohit Ghosh", reference: "UPI-559013822" },
    ],
    discounts: [],
    returns: [],
    medicines: [
      {
        id: "M6",
        medicineName: "Tab. Ondansetron 4mg",
        strength: "4 mg",
        frequency: "Three times daily",
        route: "Oral",
        instructions: "Before meal",
        urgency: "Routine",
        durationDays: 3,
        startDate: "27 Aug 2026",
        endDate: "29 Aug 2026",
        slots: ["Morning", "Afternoon", "Night"],
        qtyPerDose: 1,
        orderedBy: "Dr. Priya Nair",
        orderedOn: "27 Aug 2026, 10:45 AM",
        selectedBatchId: "B-OND-01",
        batches: [
          { id: "B-OND-01", batchNumber: "OND24019", expiryDate: "2027-06-30", availableQuantity: 50, unitPrice: 2, rackNumber: "C-01", shelfNumber: "S-04" },
        ],
        dailyLogs: [
          { id: "L6-1", date: "27 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "OND24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 10:55 AM", wardReceivedAt: "27 Aug 2026, 11:10 AM" },
          { id: "L6-2", date: "27 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "OND24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 01:10 PM", wardReceivedAt: "27 Aug 2026, 01:30 PM" },
          { id: "L6-3", date: "27 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "OND24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "27 Aug 2026, 08:10 PM", wardReceivedAt: "27 Aug 2026, 08:30 PM" },
          { id: "L6-4", date: "28 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "OND24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 08:00 AM", wardReceivedAt: "28 Aug 2026, 08:20 AM" },
          { id: "L6-5", date: "28 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "OND24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 01:05 PM", wardReceivedAt: "28 Aug 2026, 01:25 PM" },
          { id: "L6-6", date: "28 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "OND24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "28 Aug 2026, 08:05 PM", wardReceivedAt: "28 Aug 2026, 08:25 PM" },
          { id: "L6-7", date: "29 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "OND24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 08:00 AM", wardReceivedAt: "29 Aug 2026, 08:20 AM" },
          { id: "L6-8", date: "29 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "OND24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 01:10 PM", wardReceivedAt: "29 Aug 2026, 01:30 PM" },
          { id: "L6-9", date: "29 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "OND24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "29 Aug 2026, 08:05 PM", wardReceivedAt: "29 Aug 2026, 08:25 PM" },
        ],
      },
    ],
  },
];

export function getPharmacyIcuOrders() {
  return PHARMACY_ICU_ORDERS;
}

export const PHARMACY_ICU_DOCTORS = Array.from(new Set(PHARMACY_ICU_ORDERS.map((order) => order.orderingDoctor)));
export const PHARMACY_ICU_WARDS = Array.from(new Set(PHARMACY_ICU_ORDERS.map((order) => order.ward)));