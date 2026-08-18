// lib/admission-desk/opd/ayushman-mock-data.ts
import type { PatientProfile } from "@/types/admission-desk/opd/appointment-types";

const AYUSHMAN_PATIENTS: Record<string, Omit<PatientProfile, "uhid">> = {
  "1234567890123456": {
    firstName: "Anita",
    middleName: "Kumari",
    lastName: "Devi",
    dateOfBirth: "1985-06-15",
    age: 41,
    gender: "Female",
    mobile: "9876512345",
    address: "House 14, Sector 8",
    state: "Delhi",
    city: "New Delhi",
    pinCode: "110001",
    ayushmanCardNumber: "1234567890123456",
  },
  "9876543210987654": {
    firstName: "Mahesh",
    lastName: "Kumar",
    dateOfBirth: "1979-02-12",
    age: 47,
    gender: "Male",
    mobile: "9988012345",
    address: "45, Civil Lines",
    state: "Maharashtra",
    city: "Pune",
    pinCode: "411001",
    ayushmanCardNumber: "9876543210987654",
  },
};

export async function lookupAyushmanCard(cardNumber: string) {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return AYUSHMAN_PATIENTS[cardNumber] ?? null;
}