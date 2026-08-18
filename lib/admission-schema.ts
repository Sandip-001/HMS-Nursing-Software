// lib/admission-schema.ts
import { z } from "zod";

export const patientInfoSchema = z.object({
  uhid: z.string().min(1, "UHID is required"),
  patientName: z.string().min(2, "Patient name is required"),
  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^\d{1,3}$/, "Enter a valid age"),
  gender: z.enum(["Male", "Female", "Other"], {
    error: "Select gender",
  }),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  opdMrNo: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  bloodGroup: z.string().min(1, "Select blood group"),
  referredBy: z.string().optional(),
  department: z.string().min(1, "Select department"),
  admissionType: z.enum(["Elective", "Emergency", "Referral"]),
  priority: z.enum(["Normal", "Urgent", "Critical"]),
  attendingDoctor: z.string().min(1, "Select attending doctor"),
  provisionalDiagnosis: z.string().min(1, "Provisional diagnosis is required"),
  chiefComplaints: z.string().max(500, "Max 500 characters").optional(),
  medicalHistory: z.string().max(500, "Max 500 characters").optional(),
});

export type PatientInfoFormValues = z.infer<typeof patientInfoSchema>;



export const packageInfoSchema = z
  .object({
    packageId: z.string().min(1, "Please select a package"),
    packageName: z.string(),
    packageRate: z.number().positive("Rate must be greater than 0"),
    expectedStayDays: z
      .number()
      .min(1, "Expected stay days must be at least 1")
      .max(365, "Max 365 days"),
    totalEstimatedAmount: z.number().positive(),
    advanceMode: z.enum(["percentage", "fixed"]),
    advancePercentage: z.number().min(0).max(100),
    advanceAmount: z
      .number()
      .positive("Amount received is required"),
    paymentMode: z.enum(["Cash", "Card", "UPI", "Net Banking", "Cheque", "Other"], {
      error: "Select a payment mode",
    }),
    transactionNo: z.string().min(1, "Transaction/Receipt No. is required"),
    paymentDate: z.string().min(1, "Payment date is required"),
    receivedBy: z.string().min(1, "Select received by"),
  })
  .refine((data) => data.advanceAmount <= data.totalEstimatedAmount, {
    message: "Advance amount cannot exceed total estimated amount",
    path: ["advanceAmount"],
  });

export type PackageInfoFormValues = z.input<typeof packageInfoSchema>;




export const bedAllocationSchema = z.object({
  floor: z.string().min(1, "Select a floor"),
  wardRoomType: z.string().min(1, "Select ward/room type"),
  roomNo: z.string().min(1, "Please select a bed from the grid above"),
  bedNo: z.string().min(1, "Please select a bed from the grid above"),
  bedType: z.string().min(1),
  bedCharges: z.number().positive(),
  isolatedBed: z.boolean().default(false),
  specialInstructions: z.string().max(300, "Max 300 characters").optional(),
  expectedDischargeDate: z.string().min(1, "Expected discharge date is required"),
});

export type BedAllocationFormValues = z.input<typeof bedAllocationSchema>;