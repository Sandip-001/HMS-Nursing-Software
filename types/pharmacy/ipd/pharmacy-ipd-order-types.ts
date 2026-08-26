export type PharmacyIpdOrderStatus =
  | "Active"
  | "Course Completed"
  | "Payment Received"
  | "Partially Paid"
  | "Billed to Department";

export type MedicineUrgency = "Urgent" | "Routine";
export type PharmacyPaymentMethod = "Cash" | "UPI" | "Card" | "Net Banking";
export type DoseSlot = "Morning" | "Afternoon" | "Evening" | "Night";

export type DailyDeliveryStatus =
  | "Delivered"
  | "Not Delivered"
  | "Partially Delivered"
  | "Pending"
  | "Out of Stock";

export interface PharmacyMedicineBatch {
  id: string;
  batchNumber: string;
  expiryDate: string;
  availableQuantity: number;
  unitPrice: number;
  rackNumber: string;
  shelfNumber: string;
}

export interface DailyDoseLog {
  id: string;
  date: string;
  slot: DoseSlot;
  status: DailyDeliveryStatus;
  orderedQtyForDose: number;
  deliveredQtyForDose: number;
  batchNumberUsed?: string;
  unitPriceUsed?: number;
  amount: number;
  deliveredBy?: string;
  deliveredAt?: string;
  wardReceivedAt?: string;
  remarks?: string;
  doctorNotified?: boolean;
  doctorNotifiedAt?: string;
}

export interface PharmacyIpdMedicineItem {
  id: string;
  medicineName: string;
  strength: string;
  frequency: string;
  route: string;
  instructions: string;
  urgency: MedicineUrgency;
  durationDays: number;
  startDate: string;
  endDate: string;
  slots: DoseSlot[];
  qtyPerDose: number;
  orderedBy: string;
  orderedOn: string;
  batches: PharmacyMedicineBatch[];
  selectedBatchId: string | null;
  dailyLogs: DailyDoseLog[];
}

export interface MedicineReturnRecord {
  id: string;
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  returnedQty: number;
  unitPrice: number;
  refundAmount: number;
  returnedBy: "Nurse" | "Patient Party";
  returnedByName: string;
  reason: string;
  returnDate: string;
  approvedBy?: string;
}

export interface PaymentEntry {
  id: string;
  method: PharmacyPaymentMethod;
  amount: number;
  receivedOn: string;
  receivedBy: string;
  reference?: string;
}

export interface DiscountEntry {
  id: string;
  percentage: number;
  amount: number;
  reason: string;
  givenBy: string;
  givenByRole: string;
  givenOn: string;
}

export interface PharmacyIpdOrder {
  id: string;
  ipdId: string;
  uhid: string;
  patientName: string;
  age: number;
  gender: string;
  ward: string;
  room: string;
  bed: string;
  admissionDate: string;
  orderingDoctor: string;
  department: string;
  diagnosis: string;
  allergy: string;
  orderDateTime: string;
  status: PharmacyIpdOrderStatus;
  medicines: PharmacyIpdMedicineItem[];
  returns: MedicineReturnRecord[];
  payments: PaymentEntry[];
  discounts: DiscountEntry[];
  paymentStatus: "Paid" | "Partially Paid" | "Unpaid";
  billSentToBillingDeptAt?: string;
}

export interface PharmacyIpdOrderFilters {
  search: string;
  date: string;
  doctor: string;
  ward: string;
  status: "All" | PharmacyIpdOrderStatus;
  paymentStatus: "All" | "Paid" | "Partially Paid" | "Unpaid";
}

export interface CurrentStaffProfile {
  name: string;
  role: string;
  staffId: string;
}