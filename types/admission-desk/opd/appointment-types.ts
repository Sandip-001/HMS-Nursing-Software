export type AppointmentType = "New Registration" | "Follow-up";
export type AppointmentStatus = "Booked" | "Waiting" | "Checked In" | "Completed" | "Rescheduled" | "Cancelled";
export type SlotPeriod = "Morning" | "Evening";
export type PaymentMethod = "Cash" | "UPI" | "Card" | "Net Banking";

export interface PatientProfile {
  uhid: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  alternativeMobile?: string;
  email?: string;
  address: string;
  state: string;
  city: string;
  pinCode: string;
  photo?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  ayushmanCardNumber?: string;
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: "HeartPulse" | "Stethoscope" | "Bone" | "Baby" | "Eye" | "Brain" | "Sparkles" | "Flower2";
  color: string;
  bgColor: string;
}

export interface DoctorProfile {
  id: string;
  name: string;
  specialtyId: string;
  specialty: string;
  experience: number;
  qualification: string;
  consultationFee: number;
  gstPercent: number;
  avatar: string;
  availability: {
    morning: { start: string; end: string; capacity: number };
    evening: { start: string; end: string; capacity: number };
  };
}

export interface AppointmentSlot {
  date: string;
  period: SlotPeriod;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
}

export interface Appointment {
  id: string;
  patient: PatientProfile;
  appointmentType: AppointmentType;
  status: AppointmentStatus;
  specialty: string;
  doctor: DoctorProfile;
  appointmentDate: string;
  slot: AppointmentSlot;
  bookedOn: string;
  paymentMethod: PaymentMethod;
  consultationFee: number;
  gstAmount: number;
  totalAmount: number;
  rescheduledFrom?: { date: string; slot: SlotPeriod };
  reason?: string;
  prescriptionAvailable?: boolean;
}

export interface AppointmentFilters {
  search: string;
  type: "All" | AppointmentType;
  status: "All" | AppointmentStatus;
  specialty: "All" | string;
  doctorId: "All" | string;
  date: string;
}