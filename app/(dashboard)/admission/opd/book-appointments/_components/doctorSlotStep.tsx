//app/admission-desk/opd/book-appointments/_components/doctorSlotStep.tsx

"use client";

import type { Dispatch, SetStateAction } from "react";
import type {
  AppointmentSlot,
  DoctorProfile,
  Specialty,
} from "@/types/admission-desk/opd/appointment-types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SPECIALTIES } from "@/lib/admission-desk/opd/appointment-data";
import {
  Baby,
  Bone,
  Brain,
  Eye,
  Flower2,
  HeartPulse,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const iconMap = {
  HeartPulse,
  Stethoscope,
  Bone,
  Baby,
  Eye,
  Brain,
  Sparkles,
  Flower2,
} satisfies Record<Specialty["icon"], React.ElementType>;

interface DoctorSlotStepProps {
  specialty: Specialty | null;
  setSpecialty: Dispatch<SetStateAction<Specialty | null>>;

  doctors: DoctorProfile[];

  doctor: DoctorProfile | null;
  setDoctor: (doctor: DoctorProfile | null) => void;

  date: string;
  setDate: (date: string) => void;

  slots: AppointmentSlot[];

  slot: AppointmentSlot | null;
  setSlot: (slot: AppointmentSlot | null) => void;
}

export function DoctorSlotStep({
  specialty,
  setSpecialty,
  doctors,
  doctor,
  setDoctor,
  date,
  setDate,
  slots,
  slot,
  setSlot,
}: DoctorSlotStepProps) {
  return (
    <div className="space-y-5">
      {/* Specialty selection */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <h2 className="text-lg font-bold text-slate-800">
            Select Specialty
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select the required specialty to view available doctors.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {SPECIALTIES.map((specialtyItem) => {
              const Icon = iconMap[specialtyItem.icon];

              return (
                <button
                  key={specialtyItem.id}
                  type="button"
                  onClick={() => {
                    setSpecialty(specialtyItem);
                    setDoctor(null);
                    setSlot(null);
                  }}
                  className={`rounded-xl border p-3 text-left transition ${
                    specialty?.id === specialtyItem.id
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : `${specialtyItem.bgColor} hover:border-blue-300`
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${specialtyItem.color}`}
                  />

                  <p className="mt-2 text-xs font-bold text-slate-800">
                    {specialtyItem.name}
                  </p>

                  <p className="mt-1 line-clamp-2 text-[10px] text-slate-500">
                    {specialtyItem.description}
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Doctor selection */}
      {specialty && (
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-slate-800">
              Select Doctor
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Available doctors for {specialty.name}.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {doctors.length === 0 ? (
                <div className="col-span-full rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-400">
                  No doctors are currently available for this specialty.
                </div>
              ) : (
                doctors.map((doctorItem) => (
                  <button
                    key={doctorItem.id}
                    type="button"
                    onClick={() => {
                      setDoctor(doctorItem);
                      setSlot(null);
                    }}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                      doctor?.id === doctorItem.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
                      {doctorItem.avatar}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-slate-800">
                        {doctorItem.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {doctorItem.specialty} · {doctorItem.experience} years
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {doctorItem.qualification}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-blue-700">
                        ₹{doctorItem.consultationFee}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Date and slot */}
      {doctor && (
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-slate-800">
              Select Date & Slot
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose an available appointment slot for {doctor.name}.
            </p>

            <Input
              className="mt-4 max-w-xs"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                setSlot(null);
              }}
            />

            {date && (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {slots.map((slotItem) => {
                  const remaining = slotItem.capacity - slotItem.booked;
                  const isBooked = remaining <= 0;
                  const isSelected =
                    slot?.period === slotItem.period &&
                    slot?.date === slotItem.date;

                  return (
                    <button
                      key={`${slotItem.date}-${slotItem.period}`}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSlot(slotItem)}
                      className={`rounded-xl border p-4 text-left transition ${
                        isBooked
                          ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
                          : isSelected
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <p className="font-bold text-slate-800">
                        {slotItem.period} Slot
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {slotItem.startTime} - {slotItem.endTime}
                      </p>

                      <p
                        className={`mt-3 text-sm font-semibold ${
                          isBooked
                            ? "text-red-600"
                            : remaining <= 3
                              ? "text-amber-600"
                              : "text-emerald-600"
                        }`}
                      >
                        {isBooked
                          ? "Slot Booked"
                          : `${remaining} slot${
                              remaining > 1 ? "s" : ""
                            } available`}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {slotItem.booked}/{slotItem.capacity} already booked
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}