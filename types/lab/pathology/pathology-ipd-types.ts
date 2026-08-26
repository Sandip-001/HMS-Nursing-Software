// types/lab/pathology/pathology-ipd-types.ts
import type { PathologyOrderStatus, PathologyPaymentMethod, ResultFlag, TestReferenceRange } from "@/types/lab/pathology/pathology-opd-types";

export type TestUrgency = "Routine" | "Urgent";
export type BillingMode = "Direct Payment" | "Billing Department";

export interface PathologyIpdTestItem {
  id: string;
  testName: string;
  category: string;
  sampleType: string;
  price: number;
  status: PathologyOrderStatus;
  urgency: TestUrgency;
  referenceRange: TestReferenceRange;
  resultValue?: string;
  resultFlag?: ResultFlag;
  reportImageName?: string;
  sampleCollectedAt?: string;
  processingStartedAt?: string;
  reportReadyAt?: string;
}

export interface PathologyIpdOrder {
  id: string;
  ipdId: string;
  orderedAt: string;
  patient: {
    name: string;
    uhid: string;
    age: number;
    gender: string;
    ward: string;
    room: string;
    bed: string;
    allergies: string[];
    diagnosis?: string;
  };
  doctor: { name: string; specialty: string; registrationNumber: string };
  tests: PathologyIpdTestItem[];

  paymentStatus: "Paid" | "Unpaid";
  paymentMethod?: PathologyPaymentMethod;
  paidAt?: string;
  billSentToBillingDeptAt?: string;
}

export interface PathologyIpdOrderFilters {
  search: string;
  date: string;
  doctor: string;
  category: string;
  status: "All" | PathologyOrderStatus;
  urgency: "All" | TestUrgency;
  paymentStatus: "All" | "Paid" | "Unpaid";
}