// app/(dashboard)/admission-desk/opd/appointments/_components/appointmentGrid.tsx
"use client";

import {
  CalendarDays,
  Clock3,
  Eye,
  MapPin,
  RefreshCw,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/types/admission-desk/opd/appointment-types";
import { StatusBadge } from "./appointment-detail-drawer";
import { getEffectiveStatus } from "@/lib/admission-desk/opd/appointment-data";
import { Empty } from "./appointmentTable";

interface AppointmentGridProps {
  appointments: Appointment[];
  onView: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
}

function formatAppointmentDate(date: string) {
  if (!date) return "—";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getTypeStyle(type: Appointment["appointmentType"]) {
  return type === "New Registration"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-violet-200 bg-violet-50 text-violet-700";
}

export function AppointmentGrid({
  appointments,
  onView,
  onReschedule,
}: AppointmentGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {appointments.map((appointment) => {
        const status = getEffectiveStatus(appointment);

        const canReschedule =
          status === "Booked" || status === "Waiting";

        return (
          <Card
            key={appointment.id}
            className="group overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />

            <CardContent className="p-5">
              {/* Patient header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white shadow-md">
                    {appointment.patient.firstName.charAt(0)}
                    {appointment.patient.lastName.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-800">
                      {appointment.patient.firstName}{" "}
                      {appointment.patient.lastName}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      {appointment.patient.uhid}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {appointment.patient.age} years ·{" "}
                      {appointment.patient.gender}
                    </p>
                  </div>
                </div>

                <StatusBadge status={status} />
              </div>

              {/* Type and appointment ID */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <Badge
                  variant="outline"
                  className={getTypeStyle(appointment.appointmentType)}
                >
                  <UserRound className="mr-1 h-3 w-3" />
                  {appointment.appointmentType}
                </Badge>

                <p className="text-xs font-medium text-slate-400">
                  {appointment.id}
                </p>
              </div>

              {/* Doctor information */}
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <Stethoscope className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {appointment.doctor.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {appointment.specialty}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slot details */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 p-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Appointment Date
                  </div>

                  <p className="mt-1.5 text-sm font-semibold text-slate-700">
                    {formatAppointmentDate(appointment.appointmentDate)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 p-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    <Clock3 className="h-3.5 w-3.5" />
                    Consultation Slot
                  </div>

                  <p className="mt-1.5 text-sm font-semibold text-slate-700">
                    {appointment.slot.period}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {appointment.slot.startTime} - {appointment.slot.endTime}
                  </p>
                </div>
              </div>

              {/* Payment amount */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    Paid Amount
                  </p>

                  <p className="mt-0.5 text-base font-bold text-slate-800">
                    ₹{appointment.totalAmount.toLocaleString("en-IN")}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className="border-slate-200 bg-slate-50 text-slate-600"
                >
                  {appointment.paymentMethod}
                </Badge>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => onView(appointment)}
                >
                  <Eye className="mr-1.5 h-4 w-4" />
                  View Details
                </Button>

                {canReschedule && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-orange-200 text-orange-700 hover:bg-orange-50"
                    onClick={() => onReschedule(appointment)}
                    title="Reschedule appointment"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {appointments.length === 0 && <Empty />}
    </div>
  );
}