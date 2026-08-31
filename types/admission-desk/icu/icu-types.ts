// types/admission-desk/icu/icu-types.ts
export type IcuStatus = "Stable" | "Under Observation" | "Critical" | "Released" | "Follow-up OPD" | "Shifted to IPD";
export type AdmissionType = "Emergency" | "IPD" | "OT";
export type Gender = "Male" | "Female" | "Other";
export type ShiftName = "Morning" | "Evening" | "Night";

export interface IcuNurseAssignment {
  date: string;
  shift: ShiftName;
  nurseName: string;
}

export interface IcuPatient {
  // Identity
  icuId: string;
  uhid: string;
  patientName: string;
  dateOfBirth?: string;
  age: number;
  gender: Gender;
  
  // Contact
  mobileNumber: string;
  alternativeMobile?: string;
  emergencyContactNumber?: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  pinCode: string;
  
  // Insurance
  aadharNumber: string;
  ayushmanCardNumber?: string;
  tpaName?: string;
  healthInsuranceName?: string;
  insurancePolicyNumber?: string;
  
  // ICU Location
  floor: string;
  ward: string;
  room: string;
  bed: string;
  
  // Medical
  currentCondition: string;
  status: IcuStatus;
  admissionType: AdmissionType;
  referredFrom?: string;
  assignedDoctor: string;
  assignedRmo: string;
  assignedNurses: IcuNurseAssignment[];
  
  // Admission details
  admissionDate: string;
  admissionTime: string;
  admittedBy: string;
  
  // Additional
  allergies: string[];
  diagnosis: string;
  notes?: string;
}

export interface IcuFilters {
  search: string;
  status: "All" | IcuStatus;
  admissionType: "All" | AdmissionType;
  floor: "All" | string;
  dateFrom: string;
  dateTo: string;
}