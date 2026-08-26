// types/billing/ipd/billing-types.ts

export type BillingStatus = "Fully Paid" | "Partially Paid" | "Fully Due";
export type ChargeCategory = "Doctor Fee" | "Nurse Fee" | "Bed Fee" | "Diagnostic" | "Pharmacy" | "Procedure" | "Other";
export type PaymentMethod = "Cash" | "Card" | "UPI" | "Net Banking";
export type CoverageType = "Ayushman Bharat" | "Insurance" | "None";
export type CoverageStatus = "Approved" | "Partially Received" | "Fully Received" | "Pending" | "Rejected";

export interface DailyCharge {
  id: string;
  date: string;
  category: ChargeCategory;
  description: string;
  amount: number;
  addedBy: string;
}

export interface DiscountEntry {
  id: string;
  date: string;
  percentage: number;
  amountDeducted: number;
  givenBy: string;
  reason?: string;
}

export interface PaymentMethodSplit {
  method: PaymentMethod;
  amount: number;
}

export interface PaymentRecord {
  id: string;
  date: string;
  dateTime: string;
  partyName: string;
  relationToPatient: string;
  totalAmount: number;
  methods: PaymentMethodSplit[];
  collectedBy: string;
}

export interface CoverageDetails {
  type: CoverageType;
  schemeName: string;
  policyOrCardNumber: string;
  approvedAmount: number;
  receivedAmount: number;
  receivedDate?: string;
  status: CoverageStatus;
}

export interface BillingPatient {
  uhid: string;
  ipdId: string;
  patientName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  ward: string;
  room: string;
  bed: string;
  admittingDoctor: string;
  admissionDateTime: string;
  contactNumber: string;
  guardianName?: string;
  universalPaymentEnabled: boolean;
  charges: DailyCharge[];
  discounts: DiscountEntry[];
  payments: PaymentRecord[];
  coverage?: CoverageDetails;
}

export interface BillingFilters {
  search: string;
  ward: "All" | string;
  status: "All" | BillingStatus;
}

export interface BillingComputed {
  grossTotal: number;
  excludedPharmacyLab: number;
  totalDiscount: number;
  netPayable: number;
  coverageReceived: number;
  patientResponsibility: number;
  totalCollected: number;
  dueAmount: number;
  status: BillingStatus;
}