// types/pharmacy/opd/pharmacy-opd-types.ts

export type PharmacyOrderStatus = "Pending" | "Paid" | "Delivered";
export type StockStatus = "All Available" | "Partially Available" | "Out of Stock";
export type DispenseStatus = "Available" | "Partial" | "Out of Stock" | "Removed";
export type PharmacyPaymentMethod = "Cash" | "UPI" | "Card" | "Net Banking";

export interface PharmacyMedicineBatch {
  id: string;
  batchNumber: string;
  expiryDate: string;
  availableQuantity: number;
  unitPrice: number;
  rackNumber: string;
  shelfNumber: string;
}

export interface PharmacyMedicineOrder {
  id: string;
  medicineName: string;
  genericName: string;
  category: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedQuantity: number;
  batches: PharmacyMedicineBatch[];
}

export interface PharmacyOPDOrder {
  id: string;
  appointmentId: string;
  orderDateTime: string;
  patient: {
    name: string;
    uhid: string;
    age: number;
    gender: string;
    mobile: string;
    allergies: string[];
    diagnosis?: string;
  };
  doctor: {
    name: string;
    specialty: string;
    registrationNumber: string;
  };
  medicines: PharmacyMedicineOrder[];
  status: PharmacyOrderStatus;
  paymentMethod?: PharmacyPaymentMethod;
  deliveredAt?: string;
}

export interface PharmacyOrderFilters {
  search: string;
  date: string;
  doctor: string;
  category: string;
  stockStatus: "All" | StockStatus;
  orderStatus: "All" | PharmacyOrderStatus;
}

export interface DispenseMedicineState {
  medicineId: string;
  selectedBatchId: string | null;
  dispenseQuantity: number;
  status: DispenseStatus;
  included: boolean;
}