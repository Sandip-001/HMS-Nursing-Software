// types/ipd-admission/ipd-admission-types.ts
export type PatientStatus = "Admitted" | "Discharged" | "Pending" | "Requested";
export type AdmissionStatus = "Complete" | "Draft" | "Requested";
export type Gender = "Male" | "Female" | "Other";
export type PaymentMethod = "Self Pay" | "Ayushman Bharat" | "TPA" | "Health Insurance";
export type PackageType = "Normal" | "Premium" | "Deluxe" | "Ayushman Bharat" | "TPA Package" | "Health Insurance";

export interface Patient {
  uhid: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: Gender;
  mobileNumber: string;
  alternativeMobile?: string;
  email?: string;
  address: string;
  state: string;
  city: string;
  pinCode: string;
  aadharNumber?: string;
  aadharCardFront?: string;
  aadharCardBack?: string;
  patientPhoto?: string;
  ayushmanCardNo?: string;
  emergencyContact?: {
    name?: string;
    mobile?: string;
    relationship?: string;
  };
}

export interface IPDPatient extends Patient {
  ipdId: string;
  department: string;
  doctor: Doctor;
  package: PackageType;
  paymentMethod: PaymentMethod;
  insuranceNumber?: string;
  ward: string;
  room: string;
  bed: string;
  floor: string;
  admissionDate: string;
  status: PatientStatus;
  admissionStatus: AdmissionStatus;
  requestingDepartment?: string;
}

export interface Doctor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  available: boolean;
}

export interface PackageIPD {
  id: string;
  name: PackageType;
  description: string;
  price: number;
  facilities: string[];
}

export interface Ward {
  id: string;
  name: string;
  floor: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  beds: Bed[];
}

export interface Bed {
  id: string;
  bedNumber: string;
  status: "Available" | "Occupied" | "Maintenance";
  price: number;
}

export interface DepartmentRequest {
  id: string;
  department: string;
  patient: Partial<Patient>;
  doctor: Doctor;
  requestedAt: string;
  urgency: "Routine" | "Urgent" | "Emergency";
}

export interface DraftAdmission {
  id: string;
  patient: Partial<Patient>;
  department?: string;
  doctor?: Doctor;
  package?: PackageType;
  paymentMethod?: PaymentMethod;
  insuranceNumber?: string;
  ward?: string;
  room?: string;
  bed?: string;
  floor?: string;
  startedAt: string;
  lastUpdated: string;
  completedSections: string[];
}