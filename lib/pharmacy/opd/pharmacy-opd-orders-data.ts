// lib/pharmacy/opd/pharmacy-opd-orders-data.ts
import type { PharmacyOPDOrder, StockStatus } from "@/types/pharmacy/opd/pharmacy-opd-types";

export const PHARMACY_OPD_ORDERS: PharmacyOPDOrder[] = [
  {
    id: "PH-OPD-2026-001",
    appointmentId: "OPD-260818-042",
    orderDateTime: "18 Aug 2026, 10:35 AM",
    patient: { name: "Mrs. Sushmita Ghosh", uhid: "UHID-245812", age: 54, gender: "Female", mobile: "9876543210", allergies: ["Penicillin", "Diclofenac"], diagnosis: "Acute Bronchitis with Type 2 Diabetes Mellitus" },
    doctor: { name: "Dr. Arindam Sen", specialty: "General Medicine", registrationNumber: "WBMC-2018-45872" },
    status: "Pending",
    medicines: [
      { id: "MED-001", medicineName: "Azithromycin 500 mg Tablet", genericName: "Azithromycin", category: "Antibiotic", dosage: "500 mg", frequency: "OD", duration: "3 Days", prescribedQuantity: 3, batches: [
        { id: "BAT-AZ-01", batchNumber: "AZM24051", expiryDate: "2026-10-30", availableQuantity: 2, unitPrice: 28, rackNumber: "A-04", shelfNumber: "S-02" },
        { id: "BAT-AZ-02", batchNumber: "AZM24074", expiryDate: "2027-08-31", availableQuantity: 18, unitPrice: 30, rackNumber: "A-04", shelfNumber: "S-03" },
      ] },
      { id: "MED-002", medicineName: "Paracetamol 650 mg Tablet", genericName: "Paracetamol", category: "Analgesic", dosage: "650 mg", frequency: "TDS", duration: "3 Days", prescribedQuantity: 9, batches: [
        { id: "BAT-PC-01", batchNumber: "PCM51002", expiryDate: "2026-09-30", availableQuantity: 45, unitPrice: 3, rackNumber: "B-02", shelfNumber: "S-01" },
        { id: "BAT-PC-02", batchNumber: "PCM51188", expiryDate: "2027-12-31", availableQuantity: 120, unitPrice: 3.5, rackNumber: "B-02", shelfNumber: "S-02" },
      ] },
      { id: "MED-003", medicineName: "Pantoprazole 40 mg Tablet", genericName: "Pantoprazole", category: "Gastrointestinal", dosage: "40 mg", frequency: "OD", duration: "5 Days", prescribedQuantity: 5, batches: [
        { id: "BAT-PP-01", batchNumber: "PNT33490", expiryDate: "2027-02-28", availableQuantity: 0, unitPrice: 8, rackNumber: "C-01", shelfNumber: "S-04" },
        { id: "BAT-PP-02", batchNumber: "PNT33622", expiryDate: "2027-11-30", availableQuantity: 40, unitPrice: 9, rackNumber: "C-01", shelfNumber: "S-05" },
      ] },
    ],
  },
  {
    id: "PH-OPD-2026-002",
    appointmentId: "OPD-260818-043",
    orderDateTime: "18 Aug 2026, 11:10 AM",
    patient: { name: "Mr. Rajesh Kumar", uhid: "UHID-198234", age: 42, gender: "Male", mobile: "9123456789", allergies: [], diagnosis: "Type 2 Diabetes Mellitus" },
    doctor: { name: "Dr. Arindam Sen", specialty: "General Medicine", registrationNumber: "WBMC-2018-45872" },
    status: "Paid",
    paymentMethod: "UPI",
    medicines: [
      { id: "MED-004", medicineName: "Metformin 500 mg Tablet", genericName: "Metformin", category: "Antidiabetic", dosage: "500 mg", frequency: "BD", duration: "30 Days", prescribedQuantity: 60, batches: [
        { id: "BAT-MF-01", batchNumber: "MET92045", expiryDate: "2026-12-31", availableQuantity: 80, unitPrice: 2.5, rackNumber: "D-03", shelfNumber: "S-01" },
      ] },
      { id: "MED-005", medicineName: "Telmisartan 40 mg Tablet", genericName: "Telmisartan", category: "Antihypertensive", dosage: "40 mg", frequency: "OD", duration: "30 Days", prescribedQuantity: 30, batches: [
        { id: "BAT-TEL-01", batchNumber: "TEL11098", expiryDate: "2026-08-31", availableQuantity: 0, unitPrice: 11, rackNumber: "D-05", shelfNumber: "S-02" },
        { id: "BAT-TEL-02", batchNumber: "TEL11210", expiryDate: "2027-06-30", availableQuantity: 20, unitPrice: 12, rackNumber: "D-05", shelfNumber: "S-03" },
      ] },
    ],
  },
  {
    id: "PH-OPD-2026-003",
    appointmentId: "OPD-260818-044",
    orderDateTime: "18 Aug 2026, 12:20 PM",
    patient: { name: "Ms. Priya Sharma", uhid: "UHID-312456", age: 28, gender: "Female", mobile: "9000011223", allergies: ["Sulfa drugs"], diagnosis: "Essential Hypertension - Stable" },
    doctor: { name: "Dr. Arindam Sen", specialty: "General Medicine", registrationNumber: "WBMC-2018-45872" },
    status: "Delivered",
    paymentMethod: "Card",
    deliveredAt: "18 Aug 2026, 12:35 PM",
    medicines: [
      { id: "MED-006", medicineName: "Amlodipine 5 mg Tablet", genericName: "Amlodipine", category: "Antihypertensive", dosage: "5 mg", frequency: "OD", duration: "90 Days", prescribedQuantity: 90, batches: [
        { id: "BAT-AM-01", batchNumber: "AML55012", expiryDate: "2027-04-30", availableQuantity: 150, unitPrice: 4, rackNumber: "D-04", shelfNumber: "S-04" },
      ] },
    ],
  },
  {
    id: "PH-OPD-2026-004",
    appointmentId: "OPD-260817-039",
    orderDateTime: "17 Aug 2026, 04:10 PM",
    patient: { name: "Mr. Amit Das", uhid: "UHID-445678", age: 35, gender: "Male", mobile: "9012345678", allergies: [], diagnosis: "Allergic Contact Dermatitis" },
    doctor: { name: "Dr. Meera Kapoor", specialty: "Dermatology", registrationNumber: "WBMC-2019-88420" },
    status: "Delivered",
    paymentMethod: "Cash",
    deliveredAt: "17 Aug 2026, 04:30 PM",
    medicines: [
      { id: "MED-007", medicineName: "Cetirizine 10 mg Tablet", genericName: "Cetirizine", category: "Antihistamine", dosage: "10 mg", frequency: "OD", duration: "7 Days", prescribedQuantity: 7, batches: [
        { id: "BAT-CT-01", batchNumber: "CET77110", expiryDate: "2026-11-30", availableQuantity: 64, unitPrice: 2, rackNumber: "E-02", shelfNumber: "S-01" },
      ] },
      { id: "MED-008", medicineName: "Hydrocortisone 1% Cream", genericName: "Hydrocortisone", category: "Topical", dosage: "Apply thin layer", frequency: "BD", duration: "7 Days", prescribedQuantity: 1, batches: [
        { id: "BAT-HC-01", batchNumber: "HCR22191", expiryDate: "2027-03-31", availableQuantity: 18, unitPrice: 75, rackNumber: "F-01", shelfNumber: "S-03" },
      ] },
    ],
  },
];

export function getDefaultBatch(orderMedicine: PharmacyOPDOrder["medicines"][number]) {
  return orderMedicine.batches.filter((batch) => batch.availableQuantity > 0).sort((a, b) => a.expiryDate.localeCompare(b.expiryDate))[0] ?? null;
}

export function getMedicineStockStatus(medicine: PharmacyOPDOrder["medicines"][number]): StockStatus {
  const total = medicine.batches.reduce((sum, batch) => sum + batch.availableQuantity, 0);
  if (total === 0) return "Out of Stock";
  if (total < medicine.prescribedQuantity) return "Partially Available";
  return "All Available";
}

export function getOrderStockStatus(order: PharmacyOPDOrder): StockStatus {
  const statuses = order.medicines.map(getMedicineStockStatus);
  if (statuses.every((status) => status === "All Available")) return "All Available";
  if (statuses.every((status) => status === "Out of Stock")) return "Out of Stock";
  return "Partially Available";
}

export function getOrderValue(order: PharmacyOPDOrder) {
  return order.medicines.reduce((sum, medicine) => {
    const batch = getDefaultBatch(medicine);
    if (!batch) return sum;
    return sum + Math.min(medicine.prescribedQuantity, batch.availableQuantity) * batch.unitPrice;
  }, 0);
}

export const PHARMACY_DOCTORS = Array.from(new Set(PHARMACY_OPD_ORDERS.map((order) => order.doctor.name)));
export const PHARMACY_CATEGORIES = Array.from(new Set(PHARMACY_OPD_ORDERS.flatMap((order) => order.medicines.map((medicine) => medicine.category))));