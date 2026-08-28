// lib/pharmacy/ipd/pharmacy-ipd-order-data.ts
import type {
  CurrentStaffProfile, PharmacyIpdMedicineItem, PharmacyIpdOrder,
} from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";

/**
 * Hospital-wide configuration from the Super Admin panel.
 * true  -> Pharmacy can collect IPD payment directly (Cash / UPI / Card / Net Banking / split).
 * false -> Pharmacy only delivers medicines; billing is always sent to the IPD Billing Department.
 */
export const PHARMACY_IPD_DIRECT_PAYMENT_ENABLED = true;

/**
 * Mock of the currently logged-in pharmacy staff member.
 * In production this comes from the auth/session profile — never typed manually by the user.
 */
export const CURRENT_PHARMACY_STAFF: CurrentStaffProfile = {
  name: "Rohit Ghosh",
  role: "Pharmacist",
  staffId: "PHM-STF-014",
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

export function getAdmittedDays(admissionDate: string) {
  const admitted = new Date(`${admissionDate} 00:00:00`);
  const today = new Date();
  const diff = Math.floor((today.getTime() - admitted.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff + 1);
}

export const PHARMACY_IPD_ORDERS: PharmacyIpdOrder[] = [
  {
    id: "PHM-IPD-2026-001",
    ipdId: "IPD-2026-00421",
    uhid: "UHID-100621",
    patientName: "Ravi Sharma",
    age: 48,
    gender: "Male",
    ward: "Semi Private",
    room: "Room-2",
    bed: "B-203",
    admissionDate: "15 Aug 2026",
    orderingDoctor: "Dr. A. Mukherjee",
    department: "Cardiology",
    diagnosis: "Unstable Angina",
    allergy: "NKDA",
    orderDateTime: "17 Aug 2026, 08:00 AM",
    status: "Active",
    paymentStatus: "Unpaid",
    payments: [],
    discounts: [],
    returns: [
      { id: "RTN-001", medicineId: "M2", medicineName: "Tab. Atorvastatin 40mg", batchNumber: "ATV23980", returnedQty: 2, unitPrice: 5, refundAmount: 10, returnedBy: "Nurse", returnedByName: "Nurse Kavita", reason: "Patient discharged dose plan changed by doctor", returnDate: "18 Aug 2026", approvedBy: "Rohit Ghosh" },
      { id: "RTN-002", medicineId: "M1", medicineName: "Tab. Amlodipine 5mg", batchNumber: "AML24019", returnedQty: 1, unitPrice: 2, refundAmount: 2, returnedBy: "Patient Party", returnedByName: "Sunita Sharma (Wife)", reason: "Extra strip returned unopened", returnDate: "19 Aug 2026" },
    ],
    medicines: [
      {
        id: "M1",
        medicineName: "Tab. Amlodipine 5mg",
        strength: "5 mg",
        frequency: "Once daily",
        route: "Oral",
        instructions: "After breakfast",
        urgency: "Routine",
        durationDays: 5,
        startDate: "17 Aug 2026",
        endDate: "21 Aug 2026",
        slots: ["Morning"],
        qtyPerDose: 1,
        orderedBy: "Dr. A. Mukherjee",
        orderedOn: "17 Aug 2026, 08:00 AM",
        selectedBatchId: "B-AML-01",
        batches: [
          { id: "B-AML-01", batchNumber: "AML24019", expiryDate: "2027-09-30", availableQuantity: 55, unitPrice: 2, rackNumber: "A-01", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L1-1", date: "17 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "AML24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 08:10 AM", wardReceivedAt: "17 Aug 2026, 08:40 AM" },
          { id: "L1-2", date: "18 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "AML24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Neha Singh", deliveredAt: "18 Aug 2026, 08:05 AM", wardReceivedAt: "18 Aug 2026, 08:35 AM" },
          { id: "L1-3", date: "19 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "AML24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "19 Aug 2026, 08:00 AM", wardReceivedAt: "19 Aug 2026, 08:30 AM" },
          { id: "L1-4", date: "20 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "AML24019", unitPriceUsed: 2, amount: 2, deliveredBy: "Rohit Ghosh", deliveredAt: "20 Aug 2026, 08:05 AM", wardReceivedAt: "20 Aug 2026, 08:20 AM" },
          { id: "L1-5", date: "21 Aug 2026", slot: "Morning", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
        ],
      },
      {
        id: "M2",
        medicineName: "Tab. Atorvastatin 40mg",
        strength: "40 mg",
        frequency: "Once at night",
        route: "Oral",
        instructions: "After dinner",
        urgency: "Routine",
        durationDays: 5,
        startDate: "17 Aug 2026",
        endDate: "21 Aug 2026",
        slots: ["Night"],
        qtyPerDose: 1,
        orderedBy: "Dr. A. Mukherjee",
        orderedOn: "17 Aug 2026, 08:00 AM",
        selectedBatchId: "B-ATV-01",
        batches: [
          { id: "B-ATV-01", batchNumber: "ATV23980", expiryDate: "2026-12-31", availableQuantity: 34, unitPrice: 5, rackNumber: "B-04", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L2-1", date: "17 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "ATV23980", unitPriceUsed: 5, amount: 5, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 08:15 PM", wardReceivedAt: "17 Aug 2026, 08:45 PM" },
          { id: "L2-2", date: "18 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "ATV23980", unitPriceUsed: 5, amount: 5, deliveredBy: "Neha Singh", deliveredAt: "18 Aug 2026, 08:10 PM", wardReceivedAt: "18 Aug 2026, 08:30 PM" },
          { id: "L2-3", date: "19 Aug 2026", slot: "Night", status: "Not Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0, remarks: "Nurse reported patient refused dose" },
          { id: "L2-4", date: "20 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "ATV23980", unitPriceUsed: 5, amount: 5, deliveredBy: "Rohit Ghosh", deliveredAt: "20 Aug 2026, 08:05 PM", wardReceivedAt: "20 Aug 2026, 08:25 PM" },
          { id: "L2-5", date: "21 Aug 2026", slot: "Night", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
        ],
      },
      {
        id: "M3",
        medicineName: "Tab. Pantoprazole 40mg",
        strength: "40 mg",
        frequency: "Once daily",
        route: "Oral",
        instructions: "Before breakfast",
        urgency: "Urgent",
        durationDays: 5,
        startDate: "17 Aug 2026",
        endDate: "21 Aug 2026",
        slots: ["Morning"],
        qtyPerDose: 1,
        orderedBy: "Dr. A. Mukherjee",
        orderedOn: "17 Aug 2026, 08:00 AM",
        selectedBatchId: "B-PAN-02",
        batches: [
          { id: "B-PAN-01", batchNumber: "PAN22110", expiryDate: "2026-09-05", availableQuantity: 0, unitPrice: 3.5, rackNumber: "C-01", shelfNumber: "S-04" },
          { id: "B-PAN-02", batchNumber: "PAN23890", expiryDate: "2027-04-30", availableQuantity: 40, unitPrice: 4, rackNumber: "R-05", shelfNumber: "B-08" },
        ],
        dailyLogs: [
          { id: "L3-1", date: "17 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PAN22110", unitPriceUsed: 3.5, amount: 3.5, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 08:10 AM", wardReceivedAt: "17 Aug 2026, 08:35 AM" },
          { id: "L3-2", date: "18 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PAN22110", unitPriceUsed: 3.5, amount: 3.5, deliveredBy: "Neha Singh", deliveredAt: "18 Aug 2026, 08:05 AM", wardReceivedAt: "18 Aug 2026, 08:35 AM" },
          { id: "L3-3", date: "19 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PAN23890", unitPriceUsed: 4, amount: 4, deliveredBy: "Rohit Ghosh", deliveredAt: "19 Aug 2026, 08:00 AM", wardReceivedAt: "19 Aug 2026, 08:30 AM" },
          { id: "L3-4", date: "20 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PAN23890", unitPriceUsed: 4, amount: 4, deliveredBy: "Rohit Ghosh", deliveredAt: "20 Aug 2026, 08:05 AM", wardReceivedAt: "20 Aug 2026, 08:20 AM" },
          { id: "L3-5", date: "21 Aug 2026", slot: "Morning", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
        ],
      },
      {
        id: "M4",
        medicineName: "Tab. Paracetamol 650mg",
        strength: "650 mg",
        frequency: "PRN (as needed)",
        route: "Oral",
        instructions: "If fever above 100°F",
        urgency: "Urgent",
        durationDays: 5,
        startDate: "17 Aug 2026",
        endDate: "21 Aug 2026",
        slots: ["Afternoon"],
        qtyPerDose: 1,
        orderedBy: "Dr. A. Mukherjee",
        orderedOn: "17 Aug 2026, 08:00 AM",
        selectedBatchId: null,
        batches: [
          { id: "B-PCM-01", batchNumber: "PCM51002", expiryDate: "2026-09-30", availableQuantity: 0, unitPrice: 3, rackNumber: "B-02", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L4-1", date: "17 Aug 2026", slot: "Afternoon", status: "Out of Stock", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0, remarks: "Batch PCM51002 exhausted", doctorNotified: false },
          { id: "L4-2", date: "18 Aug 2026", slot: "Afternoon", status: "Out of Stock", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0, remarks: "Awaiting central store restock", doctorNotified: true, doctorNotifiedAt: "18 Aug 2026, 02:30 PM" },
          { id: "L4-3", date: "19 Aug 2026", slot: "Afternoon", status: "Out of Stock", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L4-4", date: "20 Aug 2026", slot: "Afternoon", status: "Out of Stock", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L4-5", date: "21 Aug 2026", slot: "Afternoon", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
        ],
      },
      {
        id: "M5",
        medicineName: "Tab. Metoprolol 25mg",
        strength: "25 mg",
        frequency: "Twice daily",
        route: "Oral",
        instructions: "After breakfast and after dinner",
        urgency: "Urgent",
        durationDays: 5,
        startDate: "17 Aug 2026",
        endDate: "21 Aug 2026",
        slots: ["Morning", "Night"],
        qtyPerDose: 1,
        orderedBy: "Dr. A. Mukherjee",
        orderedOn: "17 Aug 2026, 08:00 AM",
        selectedBatchId: "B-MET-01",
        batches: [
          { id: "B-MET-01", batchNumber: "MET24072", expiryDate: "2026-10-15", availableQuantity: 3, unitPrice: 3, rackNumber: "B-02", shelfNumber: "S-03" },
        ],
        dailyLogs: [
          { id: "L5-1", date: "17 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 08:10 AM", wardReceivedAt: "17 Aug 2026, 08:40 AM" },
          { id: "L5-2", date: "17 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 08:15 PM", wardReceivedAt: "17 Aug 2026, 08:45 PM" },
          { id: "L5-3", date: "18 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Neha Singh", deliveredAt: "18 Aug 2026, 08:05 AM", wardReceivedAt: "18 Aug 2026, 08:35 AM" },
          { id: "L5-4", date: "18 Aug 2026", slot: "Night", status: "Partially Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "MET24072", unitPriceUsed: 3, amount: 3, deliveredBy: "Neha Singh", deliveredAt: "18 Aug 2026, 08:10 PM", wardReceivedAt: "18 Aug 2026, 08:30 PM", remarks: "Only 1 remaining from batch; last unit used" },
          { id: "L5-5", date: "19 Aug 2026", slot: "Morning", status: "Out of Stock", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0, remarks: "Batch MET24072 exhausted", doctorNotified: true, doctorNotifiedAt: "19 Aug 2026, 08:15 AM" },
          { id: "L5-6", date: "19 Aug 2026", slot: "Night", status: "Out of Stock", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L5-7", date: "20 Aug 2026", slot: "Morning", status: "Out of Stock", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L5-8", date: "20 Aug 2026", slot: "Night", status: "Out of Stock", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L5-9", date: "21 Aug 2026", slot: "Morning", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
          { id: "L5-10", date: "21 Aug 2026", slot: "Night", status: "Pending", orderedQtyForDose: 1, deliveredQtyForDose: 0, amount: 0 },
        ],
      },
      {
        id: "M6",
        medicineName: "IV Fluid Normal Saline 500ml",
        strength: "500 ml",
        frequency: "Twice daily",
        route: "IV",
        instructions: "Slow IV infusion",
        urgency: "Routine",
        durationDays: 3,
        startDate: "17 Aug 2026",
        endDate: "19 Aug 2026",
        slots: ["Morning", "Evening"],
        qtyPerDose: 1,
        orderedBy: "Dr. A. Mukherjee",
        orderedOn: "17 Aug 2026, 08:00 AM",
        selectedBatchId: "B-NS-01",
        batches: [
          { id: "B-NS-01", batchNumber: "NS240099", expiryDate: "2027-01-31", availableQuantity: 90, unitPrice: 45, rackNumber: "IV-01", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L6-1", date: "17 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "NS240099", unitPriceUsed: 45, amount: 45, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 08:20 AM", wardReceivedAt: "17 Aug 2026, 08:40 AM" },
          { id: "L6-2", date: "17 Aug 2026", slot: "Evening", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "NS240099", unitPriceUsed: 45, amount: 45, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 05:10 PM", wardReceivedAt: "17 Aug 2026, 05:30 PM" },
          { id: "L6-3", date: "18 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "NS240099", unitPriceUsed: 45, amount: 45, deliveredBy: "Neha Singh", deliveredAt: "18 Aug 2026, 08:15 AM", wardReceivedAt: "18 Aug 2026, 08:35 AM" },
          { id: "L6-4", date: "18 Aug 2026", slot: "Evening", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "NS240099", unitPriceUsed: 45, amount: 45, deliveredBy: "Neha Singh", deliveredAt: "18 Aug 2026, 05:05 PM", wardReceivedAt: "18 Aug 2026, 05:25 PM" },
          { id: "L6-5", date: "19 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "NS240099", unitPriceUsed: 45, amount: 45, deliveredBy: "Rohit Ghosh", deliveredAt: "19 Aug 2026, 08:10 AM", wardReceivedAt: "19 Aug 2026, 08:30 AM" },
          { id: "L6-6", date: "19 Aug 2026", slot: "Evening", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "NS240099", unitPriceUsed: 45, amount: 45, deliveredBy: "Rohit Ghosh", deliveredAt: "19 Aug 2026, 05:00 PM", wardReceivedAt: "19 Aug 2026, 05:20 PM" },
        ],
      },
    ],
  },
  {
    id: "PHM-IPD-2026-002",
    ipdId: "IPD-2026-00416",
    uhid: "UHID-100588",
    patientName: "Meena Iyer",
    age: 60,
    gender: "Female",
    ward: "ICU",
    room: "-",
    bed: "ICU-04",
    admissionDate: "13 Aug 2026",
    orderingDoctor: "Dr. R. Kapoor",
    department: "Neurology",
    diagnosis: "Post-Op Sepsis Monitoring",
    allergy: "Sulfa Drugs",
    orderDateTime: "17 Aug 2026, 07:30 AM",
    status: "Active",
    paymentStatus: "Partially Paid",
    payments: [
      { id: "PAY-101", method: "Cash", amount: 10000, receivedOn: "18 Aug 2026, 04:10 PM", receivedBy: "Rohit Ghosh" },
      { id: "PAY-102", method: "UPI", amount: 5000, receivedOn: "18 Aug 2026, 04:12 PM", receivedBy: "Rohit Ghosh", reference: "UPI-559013822" },
    ],
    discounts: [
      { id: "DIS-01", percentage: 5, amount: 500, reason: "Senior citizen courtesy discount", givenBy: "Rohit Ghosh", givenByRole: "Pharmacist", givenOn: "18 Aug 2026, 04:00 PM" },
    ],
    returns: [],
    medicines: [
      {
        id: "M7",
        medicineName: "Inj. Piperacillin-Tazobactam 4.5g",
        strength: "4.5 g",
        frequency: "Four times daily",
        route: "IV",
        instructions: "As per nursing schedule",
        urgency: "Urgent",
        durationDays: 7,
        startDate: "17 Aug 2026",
        endDate: "23 Aug 2026",
        slots: ["Morning", "Afternoon", "Evening", "Night"],
        qtyPerDose: 1,
        orderedBy: "Dr. R. Kapoor",
        orderedOn: "17 Aug 2026, 07:30 AM",
        selectedBatchId: "B-PIP-01",
        batches: [
          { id: "B-PIP-01", batchNumber: "PIP24501", expiryDate: "2026-11-30", availableQuantity: 22, unitPrice: 320, rackNumber: "ICU-01", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L7-1", date: "17 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 08:00 AM", wardReceivedAt: "17 Aug 2026, 08:05 AM" },
          { id: "L7-2", date: "17 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 02:00 PM", wardReceivedAt: "17 Aug 2026, 02:05 PM" },
          { id: "L7-3", date: "17 Aug 2026", slot: "Evening", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "17 Aug 2026, 08:00 PM", wardReceivedAt: "17 Aug 2026, 08:05 PM" },
          { id: "L7-4", date: "17 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Neha Singh", deliveredAt: "18 Aug 2026, 02:00 AM", wardReceivedAt: "18 Aug 2026, 02:05 AM" },
          { id: "L7-5", date: "18 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "PIP24501", unitPriceUsed: 320, amount: 320, deliveredBy: "Rohit Ghosh", deliveredAt: "18 Aug 2026, 08:00 AM", wardReceivedAt: "18 Aug 2026, 08:05 AM" },
        ],
      },
    ],
  },
  {
    id: "PHM-IPD-2026-003",
    ipdId: "IPD-2026-00398",
    uhid: "UHID-100455",
    patientName: "Mohd. Irfan",
    age: 55,
    gender: "Male",
    ward: "Semi Private",
    room: "Room-3",
    bed: "B-205",
    admissionDate: "16 Aug 2026",
    orderingDoctor: "Dr. Rajesh Iyer",
    department: "Orthopedics",
    diagnosis: "Post-op Knee Replacement",
    allergy: "NKDA",
    orderDateTime: "16 Aug 2026, 07:50 AM",
    status: "Payment Received",
    paymentStatus: "Paid",
    payments: [
      { id: "PAY-201", method: "Card", amount: 118, receivedOn: "20 Aug 2026, 11:00 AM", receivedBy: "Rohit Ghosh", reference: "CARD-88213" },
    ],
    discounts: [],
    returns: [],
    medicines: [
      {
        id: "M8",
        medicineName: "Tab. Diclofenac 50mg",
        strength: "50 mg",
        frequency: "Twice daily",
        route: "Oral",
        instructions: "After breakfast and after dinner",
        urgency: "Routine",
        durationDays: 3,
        startDate: "16 Aug 2026",
        endDate: "18 Aug 2026",
        slots: ["Morning", "Night"],
        qtyPerDose: 1,
        orderedBy: "Dr. Rajesh Iyer",
        orderedOn: "16 Aug 2026, 07:50 AM",
        selectedBatchId: "B-DIC-01",
        batches: [
          { id: "B-DIC-01", batchNumber: "DIC24503", expiryDate: "2026-11-30", availableQuantity: 6, unitPrice: 3, rackNumber: "E-02", shelfNumber: "S-03" },
        ],
        dailyLogs: [
          { id: "L8-1", date: "16 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "DIC24503", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "16 Aug 2026, 08:05 AM", wardReceivedAt: "16 Aug 2026, 08:20 AM" },
          { id: "L8-2", date: "16 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "DIC24503", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "16 Aug 2026, 08:10 PM", wardReceivedAt: "16 Aug 2026, 08:25 PM" },
          { id: "L8-3", date: "17 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "DIC24503", unitPriceUsed: 3, amount: 3, deliveredBy: "Neha Singh", deliveredAt: "17 Aug 2026, 08:00 AM", wardReceivedAt: "17 Aug 2026, 08:20 AM" },
          { id: "L8-4", date: "17 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "DIC24503", unitPriceUsed: 3, amount: 3, deliveredBy: "Neha Singh", deliveredAt: "17 Aug 2026, 08:05 PM", wardReceivedAt: "17 Aug 2026, 08:20 PM" },
          { id: "L8-5", date: "18 Aug 2026", slot: "Morning", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "DIC24503", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "18 Aug 2026, 08:05 AM", wardReceivedAt: "18 Aug 2026, 08:20 AM" },
          { id: "L8-6", date: "18 Aug 2026", slot: "Night", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "DIC24503", unitPriceUsed: 3, amount: 3, deliveredBy: "Rohit Ghosh", deliveredAt: "18 Aug 2026, 08:05 PM", wardReceivedAt: "18 Aug 2026, 08:25 PM" },
        ],
      },
      {
        id: "M9",
        medicineName: "Cap. Calcium + D3",
        strength: "500 mg",
        frequency: "Once daily",
        route: "Oral",
        instructions: "After lunch",
        urgency: "Routine",
        durationDays: 3,
        startDate: "16 Aug 2026",
        endDate: "18 Aug 2026",
        slots: ["Afternoon"],
        qtyPerDose: 1,
        orderedBy: "Dr. Rajesh Iyer",
        orderedOn: "16 Aug 2026, 07:50 AM",
        selectedBatchId: "B-CAL-01",
        batches: [
          { id: "B-CAL-01", batchNumber: "CAL22987", expiryDate: "2027-03-31", availableQuantity: 87, unitPrice: 4, rackNumber: "F-01", shelfNumber: "S-01" },
        ],
        dailyLogs: [
          { id: "L9-1", date: "16 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "CAL22987", unitPriceUsed: 4, amount: 4, deliveredBy: "Rohit Ghosh", deliveredAt: "16 Aug 2026, 01:10 PM", wardReceivedAt: "16 Aug 2026, 01:30 PM" },
          { id: "L9-2", date: "17 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "CAL22987", unitPriceUsed: 4, amount: 4, deliveredBy: "Neha Singh", deliveredAt: "17 Aug 2026, 01:05 PM", wardReceivedAt: "17 Aug 2026, 01:25 PM" },
          { id: "L9-3", date: "18 Aug 2026", slot: "Afternoon", status: "Delivered", orderedQtyForDose: 1, deliveredQtyForDose: 1, batchNumberUsed: "CAL22987", unitPriceUsed: 4, amount: 4, deliveredBy: "Rohit Ghosh", deliveredAt: "18 Aug 2026, 01:10 PM", wardReceivedAt: "18 Aug 2026, 01:30 PM" },
        ],
      },
    ],
  },
];

export function getPharmacyIpdOrders() {
  return PHARMACY_IPD_ORDERS;
}

export const PHARMACY_IPD_DOCTORS = Array.from(new Set(PHARMACY_IPD_ORDERS.map((order) => order.orderingDoctor)));
export const PHARMACY_IPD_WARDS = Array.from(new Set(PHARMACY_IPD_ORDERS.map((order) => order.ward)));