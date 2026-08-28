// app/(dashboard)/nurse/emergency/all-patients/page.tsx
"use client";
import { useMemo, useState } from "react";
import { Grid2X2, LayoutList, ShieldAlert, Siren, Syringe, Users } from "lucide-react";
import type { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import type { EmergencyFilters } from "@/types/emergency/emergency-types";
import type { RmoEmergencyPatient } from "@/types/emergency/rmo-emergency-types";
import { EMERGENCY_PATIENTS } from "@/lib/emergency/emergency-data";
import { EmergencyStat } from "@/app/(dashboard)/admission/emergency/all-patients/_components/emergency-stats";
import { AllEmergencyFilters } from "@/app/(dashboard)/admission/emergency/all-patients/_components/emergency-filters";
import { EmergencyStatusBadge } from "@/app/(dashboard)/admission/emergency/all-patients/_components/emergency-badges";
import { NursePatientDetailsDrawer } from "./_components/nurse-patient-details-drawer";
import { PharmacyIpdColumnToggle as ColumnToggle } from "@/app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle";

const initialFilters: EmergencyFilters = { search: "", status: "All", incidentType: "All" };

export default function NurseEmergencyAllPatientsPage() {
  const [patients, setPatients] = useState<RmoEmergencyPatient[]>(EMERGENCY_PATIENTS.map((p) => ({ ...p, criticalNotifications: [] })));
  const [filters, setFilters] = useState<EmergencyFilters>(initialFilters);
  const [view, setView] = useState<"table" | "grid">("table");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [drawerPatient, setDrawerPatient] = useState<RmoEmergencyPatient | null>(null);

  const filtered = useMemo(
    () =>
      patients.filter((p) => {
        const q = filters.search.toLowerCase().trim();
        return (
          (!q || [p.patientName || "", p.uhid, p.emergencyNumber].join(" ").toLowerCase().includes(q)) &&
          (filters.status === "All" || p.status === filters.status) &&
          (filters.incidentType === "All" || p.incidentType === filters.incidentType)
        );
      }),
    [patients, filters],
  );

  const stats = useMemo(
    () => ({
      total: patients.length,
      critical: patients.filter((p) => p.status === "Critical").length,
      pendingMeds: patients.reduce((sum, p) => sum + p.doses.filter((d) => d.status === "Pending").length, 0),
      activeTreatments: patients.reduce((sum, p) => sum + p.treatmentPlans.filter((t) => t.followStatus === "Following").length, 0),
      police: patients.filter((p) => p.police.caseType !== "None").length,
    }),
    [patients],
  );

  function updatePatient(updated: RmoEmergencyPatient) {
    setPatients((rows) => rows.map((p) => (p.emergencyNumber === updated.emergencyNumber ? updated : p)));
    setDrawerPatient(updated);
  }

  const columns = useMemo(
    () => [
      {
        id: "Patient",
        accessorKey: "patientName",
        header: "Patient",
        cell: ({ row }: { row: { original: RmoEmergencyPatient } }) => (
          <div>
            <p className="font-semibold text-slate-800">{row.original.patientName || "Unidentified"}</p>
            <p className="text-xs text-slate-400">{row.original.uhid}</p>
          </div>
        ),
      },
      { id: "Emergency No.", accessorKey: "emergencyNumber", header: "Emergency No." },
      { id: "Incident", accessorKey: "incidentType", header: "Incident" },
      {
        id: "Assigned Nurse",
        accessorKey: "assignedNurse",
        header: "Assigned Nurse",
        cell: ({ row }: { row: { original: RmoEmergencyPatient } }) => (
          <span className={row.original.assignedNurse === "Unassigned" ? "font-semibold text-amber-600" : "text-slate-600"}>
            {row.original.assignedNurse}
          </span>
        ),
      },
      {
        id: "Status",
        header: "Status",
        cell: ({ row }: { row: { original: RmoEmergencyPatient } }) => <EmergencyStatusBadge status={row.original.status} />,
      },
      {
        id: "Action",
        header: "Action",
        enableHiding: false,
        cell: ({ row }: { row: { original: RmoEmergencyPatient } }) => (
          <div>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setDrawerPatient(row.original)}>
              <Syringe className="h-4 w-4" />View Details
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const columnIds = useMemo(() => columns.map((column) => column.id as string).filter(Boolean), [columns]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Emergency Patients</h1>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Nurse</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">Administer medicines, track treatment plans, and monitor patient status.</p>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <EmergencyStat icon={<Users className="h-5 w-5" />} label="Total Patients" value={String(stats.total)} subtitle="Emergency census" tone="blue" />
          <EmergencyStat icon={<Siren className="h-5 w-5" />} label="Critical" value={String(stats.critical)} subtitle="Immediate attention" tone="rose" />
          <EmergencyStat icon={<Syringe className="h-5 w-5" />} label="Pending Medicines" value={String(stats.pendingMeds)} subtitle="To be administered" tone="amber" />
          <EmergencyStat icon={<Users className="h-5 w-5" />} label="Active Treatments" value={String(stats.activeTreatments)} subtitle="Being followed" tone="emerald" />
          <EmergencyStat icon={<ShieldAlert className="h-5 w-5" />} label="Police Cases" value={String(stats.police)} subtitle="MLC cases" tone="slate" />
        </div>

        <AllEmergencyFilters filters={filters} results={filtered.length} onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))} onReset={() => setFilters(initialFilters)} />

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          {view === "table" && (
            <ColumnToggle columnIds={columnIds} visibility={columnVisibility as Record<string, boolean>} onToggle={(id, visible) => setColumnVisibility((prev) => ({ ...prev, [id]: visible }))} />
          )}
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button onClick={() => setView("table")} className={`rounded-lg px-3 py-2 text-xs ${view === "table" ? "bg-emerald-50 text-emerald-700" : "text-slate-500"}`}>
              <LayoutList className="inline h-4 w-4" /> Table
            </button>
            <button onClick={() => setView("grid")} className={`rounded-lg px-3 py-2 text-xs ${view === "grid" ? "bg-emerald-50 text-emerald-700" : "text-slate-500"}`}>
              <Grid2X2 className="inline h-4 w-4" /> Grid
            </button>
          </div>
        </div>

        {view === "table" ? (
          <DataTable columns={columns} data={filtered} columnVisibility={columnVisibility} onColumnVisibilityChange={setColumnVisibility} pageSize={8} />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <div key={p.emergencyNumber} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-800">{p.patientName || "Unidentified"}</p>
                    <p className="text-xs text-slate-400">{p.uhid} · {p.emergencyNumber}</p>
                  </div>
                  <EmergencyStatusBadge status={p.status} />
                </div>
                <p className="mt-3 text-sm text-slate-600">Nurse: {p.assignedNurse}</p>
                <p className="text-sm text-slate-600">Pending meds: {p.doses.filter((d) => d.status === "Pending").length}</p>
                <Button variant="outline" className="mt-4 w-full gap-2" onClick={() => setDrawerPatient(p)}>
                  <Syringe className="h-4 w-4" />View Details
                </Button>
              </div>
            ))}
          </div>
        )}

        <NursePatientDetailsDrawer patient={drawerPatient} onClose={() => setDrawerPatient(null)} onUpdate={updatePatient} />
      </div>
    </div>
  );
}