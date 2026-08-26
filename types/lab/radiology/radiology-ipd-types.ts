// types/lab/radiology/radiology-ipd-types.ts
import type { RadiologyOrderStatus, RadiologyPaymentMethod } from "@/types/lab/radiology/radiology-opd-types";

export type RadiologyUrgency = "Routine" | "Urgent";

export interface RadiologyIpdTestItem {
  id: string;
  testName: string;
  category: string;
  modality: "X-Ray" | "Ultrasound" | "CT Scan" | "MRI" | "ECG" | "Echo";
  bodyPart?: string;
  price: number;
  status: RadiologyOrderStatus;
  urgency: RadiologyUrgency;
  instructions?: string;
  processingStartedAt?: string;
  reportReadyAt?: string;
  reportImageName?: string;
  reportRemarks?: string;
}

export interface RadiologyIpdOrder {
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
  tests: RadiologyIpdTestItem[];
  paymentStatus: "Paid" | "Unpaid";
  paymentMethod?: RadiologyPaymentMethod;
  paidAt?: string;
  billSentToBillingDeptAt?: string;
}

export interface RadiologyIpdOrderFilters {
  search: string;
  date: string;
  doctor: string;
  category: string;
  status: "All" | RadiologyOrderStatus;
  urgency: "All" | RadiologyUrgency;
  paymentStatus: "All" | "Paid" | "Unpaid";
}