// types/shared/universal-payment-types.ts
// Reusable payment-collection contract used by Pharmacy, Laboratory, Billing, and any other role.

export type UniversalPaymentMethod = "Cash" | "Card" | "UPI" | "Net Banking" | "Cheque" | "Insurance" | "Government Scheme";

export interface UniversalPaymentMethodEntry {
  method: UniversalPaymentMethod;
  amount: number;
  reference?: string;
}

export type CoverageType = "Insurance" | "Ayushman Bharat" | "CGHS" | "ESI" | "Corporate Tie-up" | "None";

export interface UniversalCoverageDetails {
  type: CoverageType;
  schemeName?: string;
  policyOrCardNumber?: string;
  approvedAmount?: number;
  remarks?: string;
}

export interface UniversalDiscountInput {
  percentage: number;
  amount: number;
  reason?: string;
  givenBy: string;
  givenByRole: string;
}

export interface UniversalPaymentSubmission {
  methods: UniversalPaymentMethodEntry[];
  totalCollected: number;
  discount?: UniversalDiscountInput;
  coverage?: UniversalCoverageDetails;
  receivedBy: string;
  receivedOn: string;
  remarks?: string;
}

export interface UniversalPaymentContext {
  title: string;
  subtitle: string;
  billNumber: string;
  patientName: string;
  uhid: string;
  grossAmount: number;
  alreadyPaid: number;
  dueAmount: number;
  currentStaffName: string;
  currentStaffRole: string;
  paymentHistory?: { id: string; methods: UniversalPaymentMethodEntry[]; totalAmount: number; receivedOn: string; receivedBy: string }[];
  existingCoverage?: UniversalCoverageDetails;
}