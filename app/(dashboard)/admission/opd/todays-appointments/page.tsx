"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Grid2X2,
  LayoutList,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type {
  Appointment,
  AppointmentFilters,
} from "@/types/admission-desk/opd/appointment-types";
import {
  APPOINTMENTS,
  SPECIALTIES,
  getEffectiveStatus,
} from "@/lib/admission-desk/opd/appointment-data";
import { Stat } from "../appointments/_components/stat";
import { FilterSelect } from "../appointments/_components/filterSelect";
import { AppointmentTable } from "../appointments/_components/appointmentTable";
import { AppointmentGrid } from "../appointments/_components/appointmentGrid";
import { AppointmentDetailDrawer } from "../appointments/_components/appointment-detail-drawer";
import { RescheduleAppointmentDrawer } from "../appointments/_components/reschedule-appointment-drawer";

type ViewMode = "list" | "grid";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function TodaysAppointmentsPage() {
  const today = getTodayDate();

  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);

  const [view, setView] = useState<ViewMode>("list");

  const [filters, setFilters] = useState<Omit<AppointmentFilters, "date">>({
    search: "",
    type: "All",
    status: "All",
    specialty: "All",
    doctorId: "All",
  });

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [rescheduleAppointment, setRescheduleAppointment] =
    useState<Appointment | null>(null);

  const todayAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => appointment.appointmentDate === today,
    );
  }, [appointments, today]);

  const visibleAppointments = useMemo(() => {
    const searchQuery = filters.search.trim().toLowerCase();

    return todayAppointments.filter((appointment) => {
      const effectiveStatus = getEffectiveStatus(appointment);

      const searchableText = [
        appointment.id,
        appointment.patient.uhid,
        appointment.patient.firstName,
        appointment.patient.middleName ?? "",
        appointment.patient.lastName,
        appointment.patient.mobile,
        appointment.doctor.name,
        appointment.specialty,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchQuery || searchableText.includes(searchQuery);

      const matchesType =
        filters.type === "All" || appointment.appointmentType === filters.type;

      const matchesStatus =
        filters.status === "All" || effectiveStatus === filters.status;

      const matchesSpecialty =
        filters.specialty === "All" ||
        appointment.specialty === filters.specialty;

      const matchesDoctor =
        filters.doctorId === "All" ||
        appointment.doctor.id === filters.doctorId;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesSpecialty &&
        matchesDoctor
      );
    });
  }, [todayAppointments, filters]);

  const stats = useMemo(() => {
    const waiting = todayAppointments.filter(
      (appointment) => getEffectiveStatus(appointment) === "Waiting",
    ).length;

    const checkedIn = todayAppointments.filter(
      (appointment) => getEffectiveStatus(appointment) === "Checked In",
    ).length;

    const completed = todayAppointments.filter(
      (appointment) => getEffectiveStatus(appointment) === "Completed",
    ).length;

    const remaining = todayAppointments.filter((appointment) => {
      const status = getEffectiveStatus(appointment);

      return status === "Booked" || status === "Waiting";
    }).length;

    return {
      total: todayAppointments.length,
      waiting,
      checkedIn,
      completed,
      remaining,
    };
  }, [todayAppointments]);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.type !== "All" ||
    filters.status !== "All" ||
    filters.specialty !== "All" ||
    filters.doctorId !== "All";

  function updateFilter<K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K],
  ) {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function resetFilters() {
    setFilters({
      search: "",
      type: "All",
      status: "All",
      specialty: "All",
      doctorId: "All",
    });
  }

  function handleReschedule(
    appointmentId: string,
    newDate: string,
    newSlot: Appointment["slot"],
  ) {
    setAppointments((previous) =>
      previous.map((appointment) => {
        if (appointment.id !== appointmentId) {
          return appointment;
        }

        return {
          ...appointment,
          appointmentDate: newDate,
          slot: newSlot,
          status: "Rescheduled",
          rescheduledFrom: {
            date: appointment.appointmentDate,
            slot: appointment.slot.period,
          },
          reason: "Rescheduled by admission desk",
        };
      }),
    );

    setRescheduleAppointment(null);

    toast.success(
      "Appointment rescheduled successfully. It has been moved from today's queue.",
    );
  }

  const formattedToday = new Date(`${today}T12:00:00`).toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Today&apos;s OPD Appointments
              </h1>

              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                Live Queue
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {formattedToday} · Monitor and manage today&apos;s patient
              consultation queue.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
            <Clock3 className="h-4 w-4" />
            {stats.remaining} pending consultation
            {stats.remaining !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            icon={<CalendarDays className="h-5 w-5" />}
            label="Today's Appointments"
            value={String(stats.total)}
            tone="blue"
            subtitle="Scheduled"
          />

          <Stat
            icon={<Clock3 className="h-5 w-5" />}
            label="Waiting Patients"
            value={String(stats.waiting)}
            tone="amber"
            subtitle="Need check-in"
          />

          <Stat
            icon={<UserCheck className="h-5 w-5" />}
            label="Checked In"
            value={String(stats.checkedIn)}
            tone="violet"
            subtitle="In queue"
          />

          <Stat
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Completed"
            value={String(stats.completed)}
            tone="emerald"
            subtitle="Consulted"
          />
        </div>

        {/* Filter section */}
        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/40 px-4 py-3 sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Filter Today&apos;s Queue
                  </p>

                  <p className="text-xs text-slate-500">
                    Search, filter, and manage today&apos;s appointments.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <RefreshCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                )}

                <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {visibleAppointments.length} Result
                  {visibleAppointments.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          <CardContent className="p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
              <div className="relative md:col-span-2 xl:col-span-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  className="h-10 border-slate-200 bg-slate-50/50 pl-9 transition focus:border-blue-400 focus:bg-white focus:ring-blue-100"
                  placeholder="Search patient, UHID, mobile or appointment ID..."
                  value={filters.search}
                  onChange={(event) =>
                    updateFilter("search", event.target.value)
                  }
                />
              </div>

              <FilterSelect
                value={filters.type}
                onChange={(value) =>
                  updateFilter("type", value as typeof filters.type)
                }
                items={["All", "New Registration", "Follow-up"]}
                placeholder="Patient type"
              />

              <FilterSelect
                value={filters.status}
                onChange={(value) =>
                  updateFilter("status", value as typeof filters.status)
                }
                items={[
                  "All",
                  "Booked",
                  "Waiting",
                  "Checked In",
                  "Completed",
                  "Rescheduled",
                ]}
                placeholder="Status"
              />

              <FilterSelect
                value={filters.specialty}
                onChange={(value) => updateFilter("specialty", value)}
                items={[
                  "All",
                  ...SPECIALTIES.map((specialty) => specialty.name),
                ]}
                placeholder="Specialty"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {visibleAppointments.length}
                </span>{" "}
                appointment
                {visibleAppointments.length !== 1 ? "s" : ""} scheduled for
                today.
              </p>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <span className="text-xs font-medium text-slate-400">
                  Display as
                </span>

                <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                      view === "list"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <LayoutList className="h-4 w-4" />
                    <span className="hidden sm:inline">List</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                      view === "grid"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Grid2X2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment view */}
        {view === "list" ? (
          <AppointmentTable
            appointments={visibleAppointments}
            onView={setSelectedAppointment}
            onReschedule={setRescheduleAppointment}
          />
        ) : (
          <AppointmentGrid
            appointments={visibleAppointments}
            onView={setSelectedAppointment}
            onReschedule={setRescheduleAppointment}
          />
        )}
      </div>

      {/* Shared appointment detail drawer */}
      <AppointmentDetailDrawer
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />

      {/* Shared reschedule drawer */}
      <RescheduleAppointmentDrawer
        appointment={rescheduleAppointment}
        onClose={() => setRescheduleAppointment(null)}
        onConfirm={(newDate, newSlot) => {
          if (!rescheduleAppointment) return;

          handleReschedule(rescheduleAppointment.id, newDate, newSlot);
        }}
      />
    </div>
  );
}
