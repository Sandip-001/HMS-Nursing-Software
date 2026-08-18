// lib/bed-availability-data.ts
import type { DepartmentBedAvailability } from "@/types/bed-availability-types";

export const BED_AVAILABILITY: DepartmentBedAvailability[] = [
  { department: "General Medicine", wardUnit: "General Ward", floor: "3rd Floor", bedType: "General Bed", totalBeds: 60, occupied: 42, available: 15, blocked: 3 },
  { department: "Cardiology", wardUnit: "Cardiac Care Unit (CCU)", floor: "4th Floor", bedType: "ICU Bed", totalBeds: 20, occupied: 18, available: 1, blocked: 1 },
  { department: "Orthopedics", wardUnit: "Orthopedic Ward", floor: "2nd Floor", bedType: "General Bed", totalBeds: 40, occupied: 30, available: 8, blocked: 2 },
  { department: "General Surgery", wardUnit: "Surgical Ward", floor: "3rd Floor", bedType: "General Bed", totalBeds: 50, occupied: 38, available: 10, blocked: 2 },
  { department: "Pediatrics", wardUnit: "Pediatric Ward", floor: "1st Floor", bedType: "General Bed", totalBeds: 30, occupied: 18, available: 10, blocked: 2 },
  { department: "ICU", wardUnit: "Medical ICU", floor: "5th Floor", bedType: "ICU Bed", totalBeds: 25, occupied: 22, available: 2, blocked: 1 },
  { department: "Neurosurgery", wardUnit: "Neuro ICU", floor: "5th Floor", bedType: "ICU Bed", totalBeds: 15, occupied: 12, available: 2, blocked: 1 },
  { department: "Obstetrics & Gynaecology", wardUnit: "Maternity Ward", floor: "2nd Floor", bedType: "General Bed", totalBeds: 50, occupied: 36, available: 12, blocked: 2 },
  { department: "ENT", wardUnit: "ENT Ward", floor: "1st Floor", bedType: "General Bed", totalBeds: 20, occupied: 14, available: 5, blocked: 1 },
  { department: "Dermatology", wardUnit: "Dermatology Ward", floor: "1st Floor", bedType: "General Bed", totalBeds: 15, occupied: 10, available: 4, blocked: 1 },
];

export const DEPARTMENT_ICONS: Record<string, string> = {
  "General Medicine": "🩺",
  Cardiology: "❤️",
  Orthopedics: "🦴",
  "General Surgery": "🔪",
  Pediatrics: "🧸",
  ICU: "🏥",
  Neurosurgery: "🧠",
  "Obstetrics & Gynaecology": "🤰",
  ENT: "👂",
  Dermatology: "🧴",
};