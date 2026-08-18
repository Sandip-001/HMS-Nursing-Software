// app/admission-desk/opd/appointments/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Grid2X2,
  IndianRupee,
  LayoutList,
  Plus,
  Search,
  Users,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  APPOINTMENTS,
  SPECIALTIES,
  getEffectiveStatus,
} from "@/lib/admission-desk/opd/appointment-data";
import type {
  Appointment,
  AppointmentFilters,
} from "@/types/admission-desk/opd/appointment-types";
import { AppointmentDetailDrawer } from "./_components/appointment-detail-drawer";
import { RescheduleAppointmentDrawer } from "./_components/reschedule-appointment-drawer";
import { toast } from "sonner";
import { Stat } from "./_components/stat";
import { FilterSelect } from "./_components/filterSelect";
import { AppointmentTable } from "./_components/appointmentTable";
import { AppointmentGrid } from "./_components/appointmentGrid";

export default function AllAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);
  const [view, setView] = useState<"list" | "grid">("list");
  const [filters, setFilters] = useState<AppointmentFilters>({
    search: "",
    type: "All",
    status: "All",
    specialty: "All",
    doctorId: "All",
    date: "",
  });
  const [detail, setDetail] = useState<Appointment | null>(null);
  const [rescheduling, setRescheduling] = useState<Appointment | null>(null);
  const visible = useMemo(
    () =>
      appointments.filter((a) => {
        const status = getEffectiveStatus(a);
        const q = filters.search.toLowerCase();
        return (
          (!q ||
            [
              a.id,
              a.patient.uhid,
              a.patient.firstName,
              a.patient.lastName,
              a.patient.mobile,
            ]
              .join(" ")
              .toLowerCase()
              .includes(q)) &&
          (filters.type === "All" || a.appointmentType === filters.type) &&
          (filters.status === "All" || status === filters.status) &&
          (filters.specialty === "All" || a.specialty === filters.specialty) &&
          (filters.doctorId === "All" || a.doctor.id === filters.doctorId) &&
          (!filters.date || a.appointmentDate === filters.date)
        );
      }),
    [appointments, filters],
  );

  const income = appointments.reduce(
    (sum, appointment) => sum + appointment.totalAmount,
    0,
  );

  const monthNew = appointments.filter(
    (a) => a.appointmentType === "New Registration",
  ).length;

  const monthFollow = appointments.filter(
    (a) => a.appointmentType === "Follow-up",
  ).length;

  function update<K extends keyof AppointmentFilters>(
    key: K,
    value: AppointmentFilters[K],
  ) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function reschedule(date: string, slot: Appointment["slot"]) {
    if (!rescheduling) return;
    setAppointments((previous) =>
      previous.map((a) =>
        a.id === rescheduling.id
          ? {
              ...a,
              rescheduledFrom: { date: a.appointmentDate, slot: a.slot.period },
              appointmentDate: date,
              slot,
              status: "Rescheduled",
            }
          : a,
      ),
    );
    toast.success("Appointment rescheduled successfully");
    setRescheduling(null);
  }
  
  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              All OPD Appointments
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage patient registrations, consultations, bookings, and
              reschedules.
            </p>
          </div>
          <Button
            className="gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/admission/opd/book-appointments")}
          >
            <Plus className="h-4 w-4" /> Book Consultation
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            icon={<IndianRupee className="h-5 w-5" />}
            label="Total Income"
            value={`₹${income.toLocaleString("en-IN")}`}
            tone="blue"
            subtitle="Collected"
          />

          <Stat
            icon={<Users className="h-5 w-5" />}
            label="Total OPD Patients"
            value={String(appointments.length)}
            tone="violet"
            subtitle="Registered"
          />

          <Stat
            icon={<UserPlus className="h-5 w-5" />}
            label="This Month New Registration"
            value={String(monthNew)}
            tone="emerald"
            subtitle="New patients"
          />

          <Stat
            icon={<CalendarDays className="h-5 w-5" />}
            label="This Month Follow Up"
            value={String(monthFollow)}
            tone="amber"
            subtitle="Returning"
          />
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
              <div className="relative xl:col-span-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  className="pl-9"
                  placeholder="Search name, UHID, mobile or appointment ID"
                  value={filters.search}
                  onChange={(e) => update("search", e.target.value)}
                />
              </div>
              <FilterSelect
                value={filters.type}
                onChange={(v) =>
                  update("type", v as AppointmentFilters["type"])
                }
                items={["All", "New Registration", "Follow-up"]}
                placeholder="Patient type"
              />
              <FilterSelect
                value={filters.status}
                onChange={(v) =>
                  update("status", v as AppointmentFilters["status"])
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
                onChange={(v) => update("specialty", v)}
                items={["All", ...SPECIALTIES.map((s) => s.name)]}
                placeholder="Specialty"
              />
              <Input
                type="date"
                value={filters.date}
                onChange={(e) => update("date", e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {visible.length}
                </span>{" "}
                appointments
              </p>
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                <button
                  onClick={() => setView("list")}
                  className={`rounded-md p-2 ${view === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`rounded-md p-2 ${view === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        {view === "list" ? (
          <AppointmentTable
            appointments={visible}
            onView={setDetail}
            onReschedule={setRescheduling}
          />
        ) : (
          <AppointmentGrid
            appointments={visible}
            onView={setDetail}
            onReschedule={setRescheduling}
          />
        )}
        <AppointmentDetailDrawer
          appointment={detail}
          onClose={() => setDetail(null)}
        />
        <RescheduleAppointmentDrawer
          appointment={rescheduling}
          onClose={() => setRescheduling(null)}
          onConfirm={reschedule}
        />
      </div>
    </div>
  );
}
