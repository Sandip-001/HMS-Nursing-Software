// app/(dashboard)/rmo/emergency/all-patients/page.tsx
"use client";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Grid2X2,
  LayoutList,
  ShieldAlert,
  Siren,
  Users,
} from "lucide-react";
import type { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import type {
  EmergencyFilters,
  EmergencyPatient,
} from "@/types/emergency/emergency-types";
import type {
  AssignmentRole,
  AvailableDoctor,
  AvailableNurse,
  RmoEmergencyPatient,
} from "@/types/emergency/rmo-emergency-types";
import { EMERGENCY_PATIENTS } from "@/lib/emergency/emergency-data";
import {
  AVAILABLE_DOCTORS,
  AVAILABLE_NURSES,
} from "@/lib/emergency/rmo-emergency-data";
import { EmergencyStat } from "@/app/(dashboard)/admission/emergency/all-patients/_components/emergency-stats";
import { AllEmergencyFilters } from "@/app/(dashboard)/admission/emergency/all-patients/_components/emergency-filters";
import { EmergencyStatusBadge } from "@/app/(dashboard)/admission/emergency/all-patients/_components/emergency-badges";
import { RmoActionMenu } from "./_components/rmo-action-menu";
import { AssignmentDrawer } from "./_components/assignment-drawer";
import { RmoPatientDetailsDrawer } from "./_components/rmo-patient-details-drawer";
import { PharmacyIpdColumnToggle as ColumnToggle } from "@/app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle";

const initialFilters: EmergencyFilters = {
  search: "",
  status: "All",
  incidentType: "All",
};

export default function RmoEmergencyAllPatientsPage() {
  const [patients, setPatients] = useState<RmoEmergencyPatient[]>(
    EMERGENCY_PATIENTS.map((p) => ({ ...p, criticalNotifications: [] })),
  );
  const [filters, setFilters] = useState<EmergencyFilters>(initialFilters);
  const [view, setView] = useState<"table" | "grid">("table");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [drawerPatient, setDrawerPatient] =
    useState<RmoEmergencyPatient | null>(null);
  const [assignment, setAssignment] = useState<{
    patient: RmoEmergencyPatient;
    role: AssignmentRole;
  } | null>(null);
  const filtered = useMemo(
    () =>
      patients.filter((p) => {
        const q = filters.search.toLowerCase().trim();
        return (
          (!q ||
            [p.patientName || "", p.uhid, p.emergencyNumber]
              .join(" ")
              .toLowerCase()
              .includes(q)) &&
          (filters.status === "All" || p.status === filters.status) &&
          (filters.incidentType === "All" ||
            p.incidentType === filters.incidentType)
        );
      }),
    [patients, filters],
  );
  const stats = useMemo(
    () => ({
      total: patients.length,
      critical: patients.filter((p) => p.status === "Critical").length,
      unassignedDoctor: patients.filter(
        (p) => p.attendingDoctor === "Unassigned",
      ).length,
      unassignedNurse: patients.filter((p) => p.assignedNurse === "Unassigned")
        .length,
      police: patients.filter((p) => p.police.caseType !== "None").length,
    }),
    [patients],
  );
  function updatePatient(updated: RmoEmergencyPatient) {
    setPatients((rows) =>
      rows.map((p) =>
        p.emergencyNumber === updated.emergencyNumber ? updated : p,
      ),
    );
    setDrawerPatient(updated);
  }

  function assign(
    selection: AvailableDoctor | AvailableNurse,
    showToast: boolean = true,
  ) {
    if (!assignment) return;
    const stamp = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const p = assignment.patient;
    const updated: RmoEmergencyPatient =
      assignment.role === "Doctor"
        ? {
            ...p,
            attendingDoctor: selection.name,
            department: (selection as AvailableDoctor).department,
            doctorAssignment: {
              doctorId: selection.id,
              doctorName: selection.name,
              department: (selection as AvailableDoctor).department,
              assignedBy: "RMO",
              assignedAt: stamp,
            },
          }
        : {
            ...p,
            assignedNurse: selection.name,
            nurseAssignment: {
              nurseId: selection.id,
              nurseName: selection.name,
              shift: (selection as AvailableNurse).shift,
              assignedBy: "RMO",
              assignedAt: stamp,
            },
          };
    updatePatient(updated);
    setAssignment(null);
    // Toast is now handled inside AssignmentDrawer
  }

  const columns = useMemo(
    () => [
      {
        id: "Patient",
        accessorKey: "patientName",
        header: "Patient",
        cell: ({ row }: { row: { original: RmoEmergencyPatient } }) => (
          <div>
            <p className="font-semibold text-slate-800">
              {row.original.patientName || "Unidentified"}
            </p>
            <p className="text-xs text-slate-400">{row.original.uhid}</p>
          </div>
        ),
      },
      {
        id: "Emergency No.",
        accessorKey: "emergencyNumber",
        header: "Emergency No.",
      },
      { id: "Incident", accessorKey: "incidentType", header: "Incident" },
      {
        id: "Doctor",
        accessorKey: "attendingDoctor",
        header: "Attending Doctor",
        cell: ({ row }: { row: { original: RmoEmergencyPatient } }) => (
          <span
            className={
              row.original.attendingDoctor === "Unassigned"
                ? "font-semibold text-amber-600"
                : "text-slate-600"
            }
          >
            {row.original.attendingDoctor}
          </span>
        ),
      },
      {
        id: "Nurse",
        accessorKey: "assignedNurse",
        header: "Assigned Nurse",
        cell: ({ row }: { row: { original: RmoEmergencyPatient } }) => (
          <span
            className={
              row.original.assignedNurse === "Unassigned"
                ? "font-semibold text-amber-600"
                : "text-slate-600"
            }
          >
            {row.original.assignedNurse}
          </span>
        ),
      },
      {
        id: "Status",
        header: "Status",
        cell: ({ row }: { row: { original: RmoEmergencyPatient } }) => (
          <EmergencyStatusBadge status={row.original.status} />
        ),
      },
      {
        id: "Action",
        header: "Action",
        cell: ({ row }: { row: { original: RmoEmergencyPatient } }) => (
          <RmoActionMenu
            patient={row.original}
            onView={() => setDrawerPatient(row.original)}
            onAssignDoctor={() =>
              setAssignment({ patient: row.original, role: "Doctor" })
            }
            onAssignNurse={() =>
              setAssignment({ patient: row.original, role: "Nurse" })
            }
          />
        ),
      },
    ],
    [],
  );

  // Derive column IDs straight from the columns array — same pattern as admission-desk page
  const columnIds = useMemo(
    () => columns.map((column) => column.id as string).filter(Boolean),
    [columns],
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Emergency Patients
            </h1>
            <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
              RMO
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Assign care teams, review clinical records, order investigations,
            and manage emergency status.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <EmergencyStat
            icon={<Users className="h-5 w-5" />}
            label="Total Patients"
            value={String(stats.total)}
            subtitle="Emergency census"
            tone="blue"
          />
          <EmergencyStat
            icon={<Siren className="h-5 w-5" />}
            label="Critical"
            value={String(stats.critical)}
            subtitle="Immediate action"
            tone="rose"
          />
          <EmergencyStat
            icon={<AlertTriangle className="h-5 w-5" />}
            label="Doctor Pending"
            value={String(stats.unassignedDoctor)}
            subtitle="Need assignment"
            tone="amber"
          />
          <EmergencyStat
            icon={<Users className="h-5 w-5" />}
            label="Nurse Pending"
            value={String(stats.unassignedNurse)}
            subtitle="Need assignment"
            tone="violet"
          />
          <EmergencyStat
            icon={<ShieldAlert className="h-5 w-5" />}
            label="Police Cases"
            value={String(stats.police)}
            subtitle="MLC cases"
            tone="slate"
          />
        </div>
        <AllEmergencyFilters
          filters={filters}
          results={filtered.length}
          onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
          onReset={() => setFilters(initialFilters)}
        />
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end ">
          {view === "table" && (
            <ColumnToggle
              columnIds={columnIds}
              visibility={columnVisibility as Record<string, boolean>}
              onToggle={(id, visible) =>
                setColumnVisibility((previous) => ({
                  ...previous,
                  [id]: visible,
                }))
              }
            />
          )}
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              onClick={() => setView("table")}
              className={`rounded-lg px-3 py-2 text-xs ${view === "table" ? "bg-violet-50 text-violet-700" : "text-slate-500"}`}
            >
              <LayoutList className="inline h-4 w-4" /> Table
            </button>
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg px-3 py-2 text-xs ${view === "grid" ? "bg-violet-50 text-violet-700" : "text-slate-500"}`}
            >
              <Grid2X2 className="inline h-4 w-4" /> Grid
            </button>
          </div>
        </div>

        {view === "table" ? (
          <DataTable
            columns={columns}
            data={filtered}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            pageSize={8}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <div
                key={p.emergencyNumber}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-800">
                      {p.patientName || "Unidentified"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {p.uhid} · {p.emergencyNumber}
                    </p>
                  </div>
                  <EmergencyStatusBadge status={p.status} />
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Doctor: {p.attendingDoctor}
                </p>
                <p className="text-sm text-slate-600">
                  Nurse: {p.assignedNurse}
                </p>
                <div className="mt-4">
                  <RmoActionMenu
                    patient={p}
                    onView={() => setDrawerPatient(p)}
                    onAssignDoctor={() =>
                      setAssignment({ patient: p, role: "Doctor" })
                    }
                    onAssignNurse={() =>
                      setAssignment({ patient: p, role: "Nurse" })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <AssignmentDrawer
          patient={assignment?.patient || null}
          role={assignment?.role || null}
          doctors={AVAILABLE_DOCTORS}
          nurses={AVAILABLE_NURSES}
          onClose={() => setAssignment(null)}
          onAssign={assign}
        />
        <RmoPatientDetailsDrawer
          patient={drawerPatient}
          onClose={() => setDrawerPatient(null)}
          onUpdate={updatePatient}
        />
      </div>
    </div>
  );
}
