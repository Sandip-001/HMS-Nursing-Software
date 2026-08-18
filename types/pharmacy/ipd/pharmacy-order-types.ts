// types/pharmacy/ipd/pharmacy-order-types.ts
export type PharmacyOrderStatus =
  | "Pending"
  | "Partially Available"
  | "Ready to Deliver"
  | "Medicine Delivered & Payment Received"
  | "Medicine Delivered & Billing Updated";

export type PaymentMode = "Cash" | "UPI";

export interface PharmacyMedicineItem {
  id: string;
  medicineName: string;
  strength: string;
  frequency: string;
  duration: string;
  route: string;
  orderedQty: number;
  stockAvailable: number;
  pricePerUnit: number;
  includeAvailableStockOnly: boolean;
}

export interface PharmacyOrder {
  id: string;
  orderId: string;
  uhid: string;
  patientName: string;
  age: number;
  gender: string;
  ward: string;
  room: string;
  bed: string;
  orderingDoctor: string;
  department: string;
  orderDateTime: string;
  status: PharmacyOrderStatus;
  medicines: PharmacyMedicineItem[];
}