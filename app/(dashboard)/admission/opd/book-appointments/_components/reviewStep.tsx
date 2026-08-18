// app/(dashboard)/admission/opd/book-appointments/_components/reviewStep.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import type {
  AppointmentSlot,
  AppointmentType,
  DoctorProfile,
  PatientProfile,
} from "@/types/admission-desk/opd/appointment-types";
import { Summary } from "./summary";

interface ReviewStepProps {
  patient: PatientProfile;
  type: AppointmentType;
  doctor: DoctorProfile;
  date: string;
  slot: AppointmentSlot;
  gst: number;
  total: number;
}

export function ReviewStep({
  patient,
  type,
  doctor,
  date,
  slot,
  gst,
  total,
}: ReviewStepProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-5 sm:p-7">
        <h2 className="text-xl font-bold text-slate-800">
          Review Consultation Booking
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Verify patient, appointment and payment information before
          continuing.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Summary
            title="Patient Details"
            rows={[
              [
                "Patient",
                `${patient.firstName} ${patient.middleName ?? ""} ${
                  patient.lastName
                }`.replace(/\s+/g, " ").trim(),
              ],
              ["UHID", patient.uhid || "Will be generated"],
              ["Mobile", patient.mobile],
              ["Type", type],
            ]}
          />

          <Summary
            title="Appointment Details"
            rows={[
              ["Doctor", doctor.name],
              ["Specialty", doctor.specialty],
              ["Date", date],
              [
                "Slot",
                `${slot.period}: ${slot.startTime} - ${slot.endTime}`,
              ],
            ]}
          />

          <Summary
            title="Payment Details"
            rows={[
              [
                "Consultation Fee",
                `₹${doctor.consultationFee.toLocaleString("en-IN")}`,
              ],
              ["GST", `₹${gst.toLocaleString("en-IN")}`],
              ["Total Payable", `₹${total.toLocaleString("en-IN")}`],
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}