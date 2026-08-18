// types/doctor/ipd/medicine-order-types.ts

export type MedicineStatus = "Pending" | "Active" | "Course Completed";
export type DeliveryStatus = "Delivered" | "Not Delivered" | "Partially Delivered";
export type DoseGivenStatus = "Given" | "Not Given" | "Refused" | "Held";

export interface MedicineReference {
  name: string;
  strengthForm: string;
  dose: string;
  route: string;
  frequency: string;
  timesPerDay: number;
  defaultInstruction: string;
  category: string;
}

export interface DoseLogEntry {
  time: string;
  status: DoseGivenStatus;
  nurseName?: string;
  givenAt?: string;
  remarks?: string;
}

export interface DailyMedicineLog {
  date: string;
  deliveryStatus: DeliveryStatus;
  deliveredBy?: string;
  deliveredAt?: string;
  doses: DoseLogEntry[];
}

export interface MedicineOrderItem {
  id: string;
  medicineName: string;
  strengthForm: string;
  dose: string;
  route: string;
  frequency: string;
  timesPerDay: number;
  duration: string;
  startDate: string;
  endDate: string;
  instructions: string;
  orderedBy: string;
  orderedOn: string;
  status: MedicineStatus;
  dailyLogs: DailyMedicineLog[];
}

export interface MedicineOrdersPageData {
  items: MedicineOrderItem[];
  notes: string;
  allergies: string;
  preferredPharmacy: string;
}