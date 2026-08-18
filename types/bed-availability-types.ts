// types/bed-availability-types.ts
export type BedAvailabilityStatus = "Good" | "Medium" | "Critical";

export interface DepartmentBedAvailability {
  department: string;
  wardUnit: string;
  floor: string;
  bedType: string;
  totalBeds: number;
  occupied: number;
  available: number;
  blocked: number;
}