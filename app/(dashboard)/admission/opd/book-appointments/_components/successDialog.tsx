// app/(dashboard)/admission/opd/book-appointments/_components/successDialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import type {
  AppointmentType,
  PatientProfile,
} from "@/types/admission-desk/opd/appointment-types";

interface SuccessDialogProps {
  open: boolean;
  patient: PatientProfile;
  type: AppointmentType | null;
  appointmentId: string;
  generatedUhid: string;
  close: () => void;
}

export function SuccessDialog({
  open,
  patient,
  type,
  appointmentId,
  generatedUhid,
  close,
}: SuccessDialogProps) {
  const displayedUhid =
    type === "New Registration"
      ? generatedUhid
      : patient.uhid;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && close()}>
      <DialogContent className="max-w-md text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />

        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Appointment Booked Successfully
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-slate-500">
          The consultation has been booked and payment has been recorded.
        </p>

        <div className="mt-3 rounded-xl bg-slate-50 p-4 text-left">
          <p className="text-xs text-slate-400">Appointment ID</p>

          <p className="font-bold text-slate-800">
            {appointmentId}
          </p>

          <p className="mt-3 text-xs text-slate-400">
            {type === "New Registration"
              ? "Generated UHID"
              : "Patient UHID"}
          </p>

          <p className="font-bold text-slate-800">
            {displayedUhid}
          </p>
        </div>

        <Button
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700"
          onClick={close}
        >
          Go to All Appointments
        </Button>
      </DialogContent>
    </Dialog>
  );
}