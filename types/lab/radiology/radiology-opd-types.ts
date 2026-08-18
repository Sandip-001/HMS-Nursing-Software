// types/lab/radiology/radiology-opd-types.ts

export type RadiologyOrderStatus = "Ordered" | "Processing" | "Report Ready";
export type RadiologyPaymentStatus = "Unpaid" | "Paid";
export type RadiologyPaymentMethod = "Cash" | "UPI" | "Card" | "Net Banking";

export interface RadiologyTestItem {
  id: string;
  testName: string;
  category: string;
  modality: "X-Ray" | "Ultrasound" | "CT Scan" | "MRI" | "ECG" | "Echo";
  bodyPart?: string;
  price: number;
  status: RadiologyOrderStatus;
  instructions?: string;
  processingStartedAt?: string;
  reportReadyAt?: string;
  reportImageName?: string;
  reportImagePreview?: string;
  reportRemarks?: string;
}

export interface RadiologyOPDOrder {
  id: string;
  appointmentId: string;
  orderedAt: string;
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
  tests: RadiologyTestItem[];
  paymentStatus: RadiologyPaymentStatus;
  paymentMethod?: RadiologyPaymentMethod;
  paidAt?: string;
}

export interface RadiologyOrderFilters {
  search: string;
  date: string;
  doctor: string;
  category: string;
  status: "All" | RadiologyOrderStatus;
  paymentStatus: "All" | RadiologyPaymentStatus;
}