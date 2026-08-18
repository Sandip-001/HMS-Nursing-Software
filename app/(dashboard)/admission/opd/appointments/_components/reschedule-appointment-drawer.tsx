// app/(dashboard)/admission-desk/opd/appointments/_components/reschedule-appointment-drawer.tsx
"use client";

import { CalendarDays, Clock3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  Appointment,
  AppointmentSlot,
  DoctorProfile,
} from "@/types/admission-desk/opd/appointment-types";
import { getSlotsForDoctor } from "@/lib/admission-desk/opd/appointment-data";
import { useEffect, useMemo, useState } from "react";

export function RescheduleAppointmentDrawer({
  appointment,
  onClose,
  onConfirm,
}: {
  appointment: Appointment | null;
  onClose: () => void;
  onConfirm: (date: string, slot: AppointmentSlot) => void;
}) {
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState<AppointmentSlot | null>(null);
  useEffect(() => {
    if (appointment) {
      setDate(appointment.appointmentDate);
      setSelected(null);
    }
  }, [appointment]);
  const slots = useMemo(
    () =>
      appointment && date ? getSlotsForDoctor(appointment.doctor, date) : [],
    [appointment, date],
  );
  if (!appointment) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Reschedule Appointment
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {appointment.patient.firstName} {appointment.patient.lastName} ·{" "}
              {appointment.id}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="space-y-5 p-5">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Select new appointment date
            </p>
            <Input
              className="mt-1"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setSelected(null);
              }}
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-slate-800">
              Available Slots
            </p>
            <div className="space-y-3">
              {slots.map((slot) => {
                const available = slot.capacity - slot.booked;
                const full = available <= 0;
                const active = selected?.period === slot.period;
                return (
                  <button
                    disabled={full}
                    key={slot.period}
                    onClick={() => setSelected(slot)}
                    className={`w-full rounded-xl border p-4 text-left transition ${full ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60" : active ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="flex items-center gap-2 font-bold text-slate-800">
                          <Clock3 className="h-4 w-4 text-blue-600" />
                          {slot.period} Slot
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                      <p
                        className={`text-sm font-semibold ${full ? "text-red-600" : available <= 3 ? "text-amber-600" : "text-emerald-600"}`}
                      >
                        {full ? "Slot Booked" : `${available} slots available`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 flex gap-3 border-t border-slate-200 bg-white p-5">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={!selected}
            onClick={() => selected && onConfirm(date, selected)}
          >
            Confirm Reschedule
          </Button>
        </div>
      </aside>
    </div>
  );
}
