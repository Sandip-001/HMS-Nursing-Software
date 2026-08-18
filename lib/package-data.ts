// lib/package-data.ts

import { Package } from "@/types/admission-types";


export const PACKAGES: Package[] = [
  {
    id: "general",
    name: "General Package",
    subtitle: "General Ward",
    rate: 15000,
    roomType: "General Ward (4 Beds)",
    doctorVisit: true,
    nursingCare: true,
    meals: true,
    investigations: "Basic Included",
    isMostSelected: true,
  },
  {
    id: "semi-private",
    name: "Semi Private Package",
    subtitle: "Semi Private Room",
    rate: 25000,
    roomType: "Semi Private (2 Beds)",
    doctorVisit: true,
    nursingCare: true,
    meals: true,
    investigations: "Basic Included",
  },
  {
    id: "private",
    name: "Private Package",
    subtitle: "Private Room",
    rate: 40000,
    roomType: "Private (1 Bed)",
    doctorVisit: true,
    nursingCare: true,
    meals: true,
    investigations: "Advanced Included",
  },
  {
    id: "deluxe",
    name: "Deluxe Package",
    subtitle: "Deluxe Room",
    rate: 60000,
    roomType: "Deluxe (1 Bed)",
    doctorVisit: true,
    nursingCare: true,
    meals: true,
    investigations: "Advanced Included",
  },
];