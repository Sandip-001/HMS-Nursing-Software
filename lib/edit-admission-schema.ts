// lib/edit-admission-schema.ts
import { z } from "zod";

export const editAdmissionSchema = z.object({
  uhid: z.string().min(1, "UHID is required"),
  opdMrNo: z.string().min(1, "OPD/MR No. is required"),
  patientName: z.string().min(2, "Patient name is required"),
  age: z.number().min(0).max(120),
  gender: z.enum(["Male", "Female", "Other"]),
  mobile: z.string().min(10, "Enter valid mobile number"),
  email: z.string().email("Enter valid email").optional().or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  department: z.string().min(1, "Department is required"),
  attendingDoctor: z.string().min(1, "Attending doctor is required"),
  admissionType: z.string().min(1, "Admission type is required"),
  priority: z.string().min(1, "Priority is required"),
  referredBy: z.string().optional(),
  remarks: z.string().optional(),

  packageCategory: z.string().min(1, "Package category is required"),
  packageName: z.string().min(1, "Package is required"),
  packageRate: z.number().positive(),
  expectedStayDays: z.number().positive(),
  totalEstimatedAmount: z.number().positive(),
  advanceAmount: z.number().min(0),
  paymentMode: z.string().min(1, "Payment mode is required"),
  transactionNo: z.string().optional(),
  paymentDate: z.string().min(1, "Payment date is required"),

  floor: z.string().min(1, "Select a floor"),
  wardRoomType: z.string().min(1, "Select ward/room type"),
  roomNo: z.string().min(1, "Please select a bed"),
  bedNo: z.string().min(1, "Please select a bed"),
  bedType: z.string().min(1),
  bedCharges: z.number().positive(),
  isolatedBed: z.boolean().default(false),
  specialInstructions: z.string().optional(),
  expectedDischargeDate: z.string().min(1, "Expected discharge date is required"),

  admissionSource: z.string().min(1, "Admission source is required"),
  admissionBy: z.string().min(1, "Admission by is required"),
  admissionDeskStaff: z.string().min(1, "Admission desk staff is required"),
});

export type EditAdmissionFormInput =
  z.input<typeof editAdmissionSchema>;

export type EditAdmissionFormValues =
  z.output<typeof editAdmissionSchema>;