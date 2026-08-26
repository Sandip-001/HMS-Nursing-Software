// app/(dashboard)/rmo/ipd/all-patients/page.tsx
"use client";
import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock3, Eye, Grid2X2, LayoutList, UserRound } from "lucide-react";
import type { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { RmoFilters as RmoFiltersState, RmoPatient } from "@/types/rmo/ipd/rmo-types";
import { RMO_PATIENTS, RMO_WARDS, RMO_DEPARTMENTS } from "@/lib/rmo/ipd/rmo-data";
import { RmoStat } from "./_components/rmo-stats";
import { RmoFilters } from "./_components/rmo-filters";
import { getRmoColumns, defaultRmoColumnVisibility } from "./_components/rmo-columns";
import { RmoPatientsGrid } from "./_components/rmo-grid";
import { RmoDetailDrawer } from "./_components/drawer/rmo-detail-drawer";
import { PharmacyIpdColumnToggle as ColumnToggle } from "@/app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle";

type ViewMode = "table" | "grid";
const initialFilters: RmoFiltersState = { search: "", ward: "All", status: "All", department: "All" };

export default function RmoAllPatientsPage() {
  const [patients, setPatients] = useState<RmoPatient[]>(RMO_PATIENTS);
  const [filters, setFilters] = useState<RmoFiltersState>(initialFilters);
  const [view, setView] = useState<ViewMode>("table");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultRmoColumnVisibility);
  const [viewingPatient, setViewingPatient] = useState<RmoPatient | null>(null);

  const filtered = useMemo(() => patients.filter((patient) => {
    const query = filters.search.trim().toLowerCase();
    const matchesSearch = !query || [patient.patientName, patient.uhid, patient.ipdId].join(" ").toLowerCase().includes(query);
    const matchesWard = filters.ward === "All" || patient.ward === filters.ward;
    const matchesStatus = filters.status === "All" || patient.status === filters.status;
    return matchesSearch && matchesWard && matchesStatus;
  }), [patients, filters]);

  const stats = useMemo(() => ({
    total: patients.length,
    stable: patients.filter((p) => p.status === "Stable").length,
    underObservation: patients.filter((p) => p.status === "Under Observation").length,
    critical: patients.filter((p) => p.status === "Critical").length,
  }), [patients]);

  function updateFilter<K extends keyof RmoFiltersState>(key: K, value: RmoFiltersState[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function handlePatientUpdate(updated: RmoPatient) {
    setPatients((previous) => previous.map((p) => p.uhid === updated.uhid ? updated : p));
    setViewingPatient(updated);
  }

  const columns = useMemo(() => getRmoColumns(setViewingPatient), []);
  const columnIds = useMemo(() => columns.map((column) => column.id as string).filter(Boolean), [columns]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">RMO — All IPD Patients</h1>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Resident Medical Officer</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Full clinical overview: vitals, diagnosis, medicines, labs, notes, billing, and discharge in one place.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <RmoStat icon={<UserRound className="h-5 w-5" />} label="Total Patients" value={String(stats.total)} subtitle="Under RMO care" tone="blue" />
          <RmoStat icon={<CheckCircle2 className="h-5 w-5" />} label="Stable" value={String(stats.stable)} subtitle="No active concerns" tone="emerald" />
          <RmoStat icon={<Clock3 className="h-5 w-5" />} label="Under Observation" value={String(stats.underObservation)} subtitle="Being closely monitored" tone="amber" />
          <RmoStat icon={<AlertTriangle className="h-5 w-5" />} label="Critical" value={String(stats.critical)} subtitle="Require urgent attention" tone="rose" />
        </div>

        <RmoFilters filters={filters} results={filtered.length} wards={RMO_WARDS} departments={RMO_DEPARTMENTS} onChange={updateFilter} onReset={() => setFilters(initialFilters)} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 shrink text-sm text-slate-500">Showing <span className="font-bold text-slate-800">{filtered.length}</span> patient{filtered.length !== 1 ? "s" : ""}</p>
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            {view === "table" && <ColumnToggle columnIds={columnIds} visibility={columnVisibility as Record<string, boolean>} onToggle={(id, visible) => setColumnVisibility((previous) => ({ ...previous, [id]: visible }))} />}
            <div className="flex rounded-xl border border-slate-200 bg-white p-1">
              <button type="button" onClick={() => setView("table")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "table" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}><LayoutList className="inline h-4 w-4" /> <span className="hidden sm:inline">Table</span></button>
              <button type="button" onClick={() => setView("grid")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "grid" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}><Grid2X2 className="inline h-4 w-4" /> <span className="hidden sm:inline">Grid</span></button>
            </div>
          </div>
        </div>

        {view === "table" ? (
          <DataTable columns={columns} data={filtered} columnVisibility={columnVisibility} onColumnVisibilityChange={setColumnVisibility} pageSize={8} />
        ) : (
          <RmoPatientsGrid patients={filtered} onView={setViewingPatient} />
        )}

        <RmoDetailDrawer patient={viewingPatient} onClose={() => setViewingPatient(null)} onPatientUpdate={handlePatientUpdate} />
      </div>
    </div>
  );
}