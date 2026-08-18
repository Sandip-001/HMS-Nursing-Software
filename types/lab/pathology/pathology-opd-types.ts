// types/lab/pathology/pathology-opd-types.ts

export type PathologyOrderStatus = "Ordered" | "Sample Collected" | "Processing" | "Report Ready";
export type PathologyPaymentStatus = "Unpaid" | "Paid";
export type PathologyPaymentMethod = "Cash" | "UPI" | "Card" | "Net Banking";
export type ResultFlag = "Normal" | "Low" | "High" | "Borderline" | "Critical";

export interface TestReferenceRange {
  normalMin?: number;
  normalMax?: number;
  lowThreshold?: number;
  highThreshold?: number;
  unit: string;
  normalText: string;
}

export interface PathologyTestItem {
  id: string;
  testName: string;
  category: string;
  sampleType: string;
  price: number;
  status: PathologyOrderStatus;
  referenceRange: TestReferenceRange;
  resultValue?: string;
  resultFlag?: ResultFlag;
  reportImageName?: string;
  reportImagePreview?: string;
  sampleCollectedAt?: string;
  processingStartedAt?: string;
  reportReadyAt?: string;
}

export interface PathologyOPDOrder {
  id: string;
  appointmentId: string;
  orderedAt: string;
  patient: { name: string; uhid: string; age: number; gender: string; mobile: string; allergies: string[]; diagnosis?: string };
  doctor: { name: string; specialty: string; registrationNumber: string };
  tests: PathologyTestItem[];
  paymentStatus: PathologyPaymentStatus;
  paymentMethod?: PathologyPaymentMethod;
  paidAt?: string;
}

export interface PathologyOrderFilters {
  search: string;
  date: string;
  doctor: string;
  category: string;
  status: "All" | PathologyOrderStatus;
  paymentStatus: "All" | PathologyPaymentStatus;
}