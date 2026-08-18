// lib/admission-desk/opd/appointment-data.ts
import type {
  Appointment,
  AppointmentSlot,
  DoctorProfile,
  PatientProfile,
  Specialty,
} from "@/types/admission-desk/opd/appointment-types";

export const STATES_AND_CITIES: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  Delhi: [
    "New Delhi",
    "North Delhi",
    "South Delhi",
    "East Delhi",
    "West Delhi",
  ],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem"],
};

export const SPECIALTIES: Specialty[] = [
  {
    id: "general",
    name: "General Physician",
    description: "Primary medical care",
    icon: "Stethoscope",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  },
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Heart and vascular care",
    icon: "HeartPulse",
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    description: "Skin, hair and nail care",
    icon: "Flower2",
    color: "text-pink-600",
    bgColor: "bg-pink-50 border-pink-200",
  },
  {
    id: "dentistry",
    name: "Dentistry",
    description: "Dental and oral care",
    icon: "Sparkles",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 border-cyan-200",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Bone and joint care",
    icon: "Bone",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Child healthcare",
    icon: "Baby",
    color: "text-violet-600",
    bgColor: "bg-violet-50 border-violet-200",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    description: "Eye care",
    icon: "Eye",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Brain and nervous system",
    icon: "Brain",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 border-indigo-200",
  },
];

export const DOCTORS: DoctorProfile[] = [
  {
    id: "DOC-001",
    name: "Dr. Amit Verma",
    specialtyId: "cardiology",
    specialty: "Cardiology",
    experience: 14,
    qualification: "MBBS, MD, DM Cardiology",
    consultationFee: 900,
    gstPercent: 18,
    avatar: "AV",
    availability: {
      morning: { start: "10:00 AM", end: "04:00 PM", capacity: 40 },
      evening: { start: "05:00 PM", end: "08:00 PM", capacity: 20 },
    },
  },
  {
    id: "DOC-002",
    name: "Dr. Priya Nair",
    specialtyId: "general",
    specialty: "General Physician",
    experience: 11,
    qualification: "MBBS, MD Medicine",
    consultationFee: 600,
    gstPercent: 18,
    avatar: "PN",
    availability: {
      morning: { start: "09:00 AM", end: "02:00 PM", capacity: 35 },
      evening: { start: "05:00 PM", end: "08:00 PM", capacity: 15 },
    },
  },
  {
    id: "DOC-003",
    name: "Dr. Rahul Mehta",
    specialtyId: "orthopedics",
    specialty: "Orthopedics",
    experience: 16,
    qualification: "MBBS, MS Orthopedics",
    consultationFee: 800,
    gstPercent: 18,
    avatar: "RM",
    availability: {
      morning: { start: "10:00 AM", end: "03:00 PM", capacity: 30 },
      evening: { start: "05:00 PM", end: "08:00 PM", capacity: 15 },
    },
  },
  {
    id: "DOC-004",
    name: "Dr. Meera Shah",
    specialtyId: "dermatology",
    specialty: "Dermatology",
    experience: 9,
    qualification: "MBBS, MD Dermatology",
    consultationFee: 700,
    gstPercent: 18,
    avatar: "MS",
    availability: {
      morning: { start: "10:00 AM", end: "02:00 PM", capacity: 25 },
      evening: { start: "04:00 PM", end: "07:00 PM", capacity: 15 },
    },
  },
  {
    id: "DOC-005",
    name: "Dr. Arjun Kapoor",
    specialtyId: "dentistry",
    specialty: "Dentistry",
    experience: 12,
    qualification: "BDS, MDS",
    consultationFee: 500,
    gstPercent: 18,
    avatar: "AK",
    availability: {
      morning: { start: "09:00 AM", end: "01:00 PM", capacity: 24 },
      evening: { start: "04:00 PM", end: "08:00 PM", capacity: 20 },
    },
  },
  {
    id: "DOC-006",
    name: "Dr. Ananya Bose",
    specialtyId: "pediatrics",
    specialty: "Pediatrics",
    experience: 10,
    qualification: "MBBS, MD Pediatrics",
    consultationFee: 650,
    gstPercent: 18,
    avatar: "AB",
    availability: {
      morning: { start: "10:00 AM", end: "03:00 PM", capacity: 30 },
      evening: { start: "05:00 PM", end: "07:00 PM", capacity: 12 },
    },
  },
];

export const PATIENTS: PatientProfile[] = [
  {
    uhid: "UHID240001",
    firstName: "Ravi",
    lastName: "Sharma",
    dateOfBirth: "1976-07-18",
    age: 48,
    gender: "Male",
    mobile: "9876543210",
    email: "ravi.sharma@example.com",
    address: "21, Green Park",
    state: "Maharashtra",
    city: "Mumbai",
    pinCode: "400001",
    emergencyContactName: "Sunita Sharma",
    emergencyContactPhone: "9876543201",
    emergencyContactRelationship: "Wife",
  },
  {
    uhid: "UHID240002",
    firstName: "Neha",
    lastName: "Singh",
    dateOfBirth: "1988-04-04",
    age: 36,
    gender: "Female",
    mobile: "9123456789",
    address: "15, Lake View Road",
    state: "Delhi",
    city: "New Delhi",
    pinCode: "110001",
    emergencyContactName: "Rakesh Singh",
    emergencyContactPhone: "9123456790",
    emergencyContactRelationship: "Husband",
  },
  {
    uhid: "UHID245812",
    firstName: "Suresh",
    lastName: "Yadav",
    dateOfBirth: "1969-01-21",
    age: 55,
    gender: "Male",
    mobile: "9988776655",
    address: "8, Market Street",
    state: "Karnataka",
    city: "Bengaluru",
    pinCode: "560001",
  },
  {
    uhid: "UHID240004",
    firstName: "Priya",
    middleName: "R",
    lastName: "Iyer",
    dateOfBirth: "1994-09-10",
    age: 30,
    gender: "Female",
    mobile: "9876501234",
    address: "62, MG Road",
    state: "Tamil Nadu",
    city: "Chennai",
    pinCode: "600001",
  },
];

const today = new Date().toISOString().slice(0, 10);
const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

export const APPOINTMENTS: Appointment[] = [
  {
    id: "APT-2026-1001",
    patient: PATIENTS[0],
    appointmentType: "Follow-up",
    status: "Booked",
    specialty: "Cardiology",
    doctor: DOCTORS[0],
    appointmentDate: tomorrow,
    slot: {
      date: tomorrow,
      period: "Morning",
      startTime: "10:00 AM",
      endTime: "04:00 PM",
      capacity: 40,
      booked: 31,
    },
    bookedOn: "18 Aug 2026, 09:20 AM",
    paymentMethod: "UPI",
    consultationFee: 900,
    gstAmount: 162,
    totalAmount: 1062,
  },
  {
    id: "APT-2026-1002",
    patient: PATIENTS[1],
    appointmentType: "New Registration",
    status: "Booked",
    specialty: "General Physician",
    doctor: DOCTORS[1],
    appointmentDate: today,
    slot: {
      date: today,
      period: "Morning",
      startTime: "09:00 AM",
      endTime: "02:00 PM",
      capacity: 35,
      booked: 34,
    },
    bookedOn: "18 Aug 2026, 10:10 AM",
    paymentMethod: "Cash",
    consultationFee: 600,
    gstAmount: 108,
    totalAmount: 708,
  },
  {
    id: "APT-2026-1003",
    patient: PATIENTS[2],
    appointmentType: "Follow-up",
    status: "Completed",
    specialty: "Orthopedics",
    doctor: DOCTORS[2],
    appointmentDate: yesterday,
    slot: {
      date: yesterday,
      period: "Evening",
      startTime: "05:00 PM",
      endTime: "08:00 PM",
      capacity: 15,
      booked: 12,
    },
    bookedOn: "17 Aug 2026, 02:30 PM",
    paymentMethod: "Card",
    consultationFee: 800,
    gstAmount: 144,
    totalAmount: 944,
    prescriptionAvailable: true,
  },
  {
    id: "APT-2026-1004",
    patient: PATIENTS[3],
    appointmentType: "New Registration",
    status: "Rescheduled",
    specialty: "Dermatology",
    doctor: DOCTORS[3],
    appointmentDate: tomorrow,
    slot: {
      date: tomorrow,
      period: "Evening",
      startTime: "04:00 PM",
      endTime: "07:00 PM",
      capacity: 15,
      booked: 15,
    },
    bookedOn: "17 Aug 2026, 03:15 PM",
    paymentMethod: "Net Banking",
    consultationFee: 700,
    gstAmount: 126,
    totalAmount: 826,
    rescheduledFrom: { date: today, slot: "Morning" },
    reason: "Patient requested a different time",
  },
];

export function getEffectiveStatus(
  appointment: Appointment,
): Appointment["status"] {
  const date = new Date().toISOString().slice(0, 10);
  if (
    (appointment.status === "Booked" || appointment.status === "Rescheduled") &&
    appointment.appointmentDate === date
  )
    return "Waiting";
  return appointment.status;
}

export function getSlotsForDoctor(
  doctor: DoctorProfile,
  date: string,
): AppointmentSlot[] {
  const seed =
    date.split("-").reduce((sum, part) => sum + Number(part), 0) +
    Number(doctor.id.slice(-1));

  const morningBooked = Math.min(
    doctor.availability.morning.capacity,
    Math.max(
      0,
      (seed * 3) % (doctor.availability.morning.capacity + 1),
    ),
  );

  const eveningBooked = Math.min(
    doctor.availability.evening.capacity,
    Math.max(
      0,
      (seed * 2) % (doctor.availability.evening.capacity + 1),
    ),
  );

  return [
    {
      date,
      period: "Morning",
      startTime: doctor.availability.morning.start,
      endTime: doctor.availability.morning.end,
      capacity: doctor.availability.morning.capacity,
      booked: morningBooked,
    },
    {
      date,
      period: "Evening",
      startTime: doctor.availability.evening.start,
      endTime: doctor.availability.evening.end,
      capacity: doctor.availability.evening.capacity,
      booked: eveningBooked,
    },
  ];
}
