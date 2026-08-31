// lib/ipd-admission/ipd-admission-data.ts
import type { Doctor, PackageIPD, Ward, Bed, IPDPatient, DepartmentRequest, DraftAdmission } from "@/types/admission-desk/ipd/ipd-admission-types";

export const DOCTORS: Doctor[] = [
  { id: "DOC001", name: "Dr. Amit Verma", department: "Cardiology", specialization: "Interventional Cardiologist", qualification: "MD, DM Cardiology", experience: 15, consultationFee: 1500, available: true },
  { id: "DOC002", name: "Dr. Priya Nair", department: "Neurology", specialization: "Neurologist", qualification: "MD, DM Neurology", experience: 12, consultationFee: 1200, available: true },
  { id: "DOC003", name: "Dr. Rahul Mehta", department: "Trauma Surgery", specialization: "Trauma Surgeon", qualification: "MS, MCh", experience: 18, consultationFee: 1800, available: true },
  { id: "DOC004", name: "Dr. Sunita Rao", department: "Orthopedics", specialization: "Orthopedic Surgeon", qualification: "MS Ortho", experience: 10, consultationFee: 1000, available: true },
  { id: "DOC005", name: "Dr. Vikram Singh", department: "Gastroenterology", specialization: "Gastroenterologist", qualification: "MD, DM", experience: 14, consultationFee: 1400, available: false },
];

export const PACKAGES: PackageIPD[] = [
  { id: "PKG001", name: "Normal", description: "Basic ward accommodation with standard facilities", price: 2000, facilities: ["General Ward Bed", "Nursing Care", "Basic Medicines", "Standard Diet"] },
  { id: "PKG002", name: "Premium", description: "Private room with enhanced facilities", price: 5000, facilities: ["Private Room", "24/7 Nursing", "Premium Medicines", "Special Diet", "TV & WiFi"] },
  { id: "PKG003", name: "Deluxe", description: "Deluxe room with premium amenities", price: 8000, facilities: ["Deluxe Room", "Dedicated Nurse", "Premium Medicines", "Customized Diet", "TV, WiFi & AC", "Attendant Bed"] },
  { id: "PKG004", name: "Ayushman Bharat", description: "Government scheme package", price: 0, facilities: ["General Ward", "Standard Care", "Scheme Medicines", "Standard Diet"] },
  { id: "PKG005", name: "TPA Package", description: "Insurance/TPA covered package", price: 4000, facilities: ["Private Room", "Nursing Care", "Insurance Medicines", "Standard Diet"] },
];

export const WARDS: Ward[] = [
  {
    id: "WARD001", name: "General Ward", floor: "Ground Floor",
    rooms: [
      {
        id: "ROOM001", name: "GW-001",
        beds: [
          { id: "BED001", bedNumber: "GW-001-A", status: "Available", price: 500 },
          { id: "BED002", bedNumber: "GW-001-B", status: "Occupied", price: 500 },
          { id: "BED003", bedNumber: "GW-001-C", status: "Available", price: 500 },
        ],
      },
    ],
  },
  {
    id: "WARD002", name: "Private Rooms", floor: "First Floor",
    rooms: [
      {
        id: "ROOM002", name: "PR-101",
        beds: [
          { id: "BED004", bedNumber: "PR-101", status: "Available", price: 3000 },
          { id: "BED005", bedNumber: "PR-102", status: "Available", price: 3000 },
          { id: "BED006", bedNumber: "PR-103", status: "Maintenance", price: 3000 },
        ],
      },
    ],
  },
  {
    id: "WARD003", name: "ICU", floor: "Second Floor",
    rooms: [
      {
        id: "ROOM003", name: "ICU-201",
        beds: [
          { id: "BED007", bedNumber: "ICU-201-A", status: "Occupied", price: 8000 },
          { id: "BED008", bedNumber: "ICU-201-B", status: "Available", price: 8000 },
        ],
      },
    ],
  },
];

export const EXISTING_PATIENTS: IPDPatient[] = [
  {
    uhid: "UHID12345685", ipdId: "IPD-2026-001", firstName: "Ravi", middleName: "Kumar", lastName: "Sharma",
    dateOfBirth: "1976-05-15", age: 50, gender: "Male", mobileNumber: "9876543210", email: "ravi.sharma@email.com",
    address: "123, MG Road", state: "Karnataka", city: "Bangalore", pinCode: "560001",
    department: "Cardiology", doctor: DOCTORS[0], package: "Premium", paymentMethod: "Self Pay",
    ward: "Private Rooms", room: "PR-101", bed: "PR-101", floor: "First Floor",
    admissionDate: "28 Aug 2026", status: "Admitted", admissionStatus: "Complete",
  },
  {
    uhid: "UHID12398211", ipdId: "IPD-2026-002", firstName: "Meera", lastName: "Iyer",
    dateOfBirth: "1965-08-20", age: 61, gender: "Female", mobileNumber: "9123456789",
    address: "45, Park Street", state: "West Bengal", city: "Kolkata", pinCode: "700016",
    department: "Neurology", doctor: DOCTORS[1], package: "Deluxe", paymentMethod: "Health Insurance", insuranceNumber: "INS-2026-5678",
    ward: "Private Rooms", room: "PR-102", bed: "PR-102", floor: "First Floor",
    admissionDate: "27 Aug 2026", status: "Admitted", admissionStatus: "Complete",
  },
];

export const DEPARTMENT_REQUESTS: DepartmentRequest[] = [
  {
    id: "REQ001", department: "Emergency",
    patient: { firstName: "Rahul", lastName: "Roy", age: 35, gender: "Male", mobileNumber: "9988776655" },
    doctor: DOCTORS[2], requestedAt: "30 Aug 2026, 06:30 PM", urgency: "Emergency",
  },
  {
    id: "REQ002", department: "ICU",
    patient: { firstName: "Sunita", lastName: "Desai", age: 58, gender: "Female", mobileNumber: "9876512340" },
    doctor: DOCTORS[1], requestedAt: "30 Aug 2026, 05:45 PM", urgency: "Urgent",
  },
];

export const DRAFT_ADMISSIONS: DraftAdmission[] = [
  {
    id: "DRAFT001",
    patient: { firstName: "Anjali", lastName: "Patel", age: 42, gender: "Female", mobileNumber: "9123450987", address: "78, Station Road", state: "Gujarat", city: "Ahmedabad", pinCode: "380001" },
    department: "Orthopedics",
    startedAt: "30 Aug 2026, 04:00 PM",
    lastUpdated: "30 Aug 2026, 04:30 PM",
    completedSections: ["Patient Details", "Department"],
  },
  {
    id: "DRAFT002",
    patient: { firstName: "Vikram", lastName: "Singh", age: 67, gender: "Male", mobileNumber: "9876501234" },
    startedAt: "30 Aug 2026, 03:15 PM",
    lastUpdated: "30 Aug 2026, 03:20 PM",
    completedSections: ["Patient Details"],
  },
];

export function generateUHID() {
  return `UHID${Date.now().toString().slice(-8)}`;
}

export function generateIPDId() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `IPD-${year}-${random}`;
}