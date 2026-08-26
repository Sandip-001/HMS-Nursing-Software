// app/(dashboard)/nurse-admin/ipd/all-ward-patients/page.tsx
"use client";
import { useMemo, useState } from "react";
import { AlertTriangle, BedDouble, CheckCircle2, Eye, Grid2X2, LayoutList, LogOut } from "lucide-react";
import type { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { WardDetailFilters, WardPatientFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { ALL_WARDS, WARD_PATIENTS_FULL } from "@/lib/nurse-admin/ipd/ward-detail-data";
import { WardStat } from "./_components/ward-patients-stats";
import { WardPatientsFilters } from "./_components/ward-patients-filters";
import { getWardPatientColumns, defaultWardPatientColumnVisibility } from "./_components/ward-patients-columns";
import { WardPatientsGrid } from "./_components/ward-patients-grid";
import { PatientDetailDrawer } from "./_components/drawer/patient-detail-drawer";
import { PharmacyIpdColumnToggle as ColumnToggle } from "@/app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle";

type ViewMode = "table" | "grid";
const initialFilters: WardDetailFilters = { search: "", ward: "All", status: "All" };

export default function AllWardPatientsPage() {
  const [patients, setPatients] = useState<WardPatientFull[]>(WARD_PATIENTS_FULL);
  const [filters, setFilters] = useState<WardDetailFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>("table");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultWardPatientColumnVisibility);
  const [viewingPatient, setViewingPatient] = useState<WardPatientFull | null>(null);

  const filtered = useMemo(() => patients.filter((patient) => {
    const query = filters.search.trim().toLowerCase();
    const matchesSearch = !query || [patient.patientName, patient.uhid, patient.ipdId, patient.bed].join(" ").toLowerCase().includes(query);
    const matchesWard = filters.ward === "All" || patient.ward === filters.ward;
    const matchesStatus = filters.status === "All" || patient.status === filters.status;
    return matchesSearch && matchesWard && matchesStatus;
  }), [patients, filters]);

  const stats = useMemo(() => ({
    total: patients.length,
    stable: patients.filter((p) => p.status === "Stable").length,
    critical: patients.filter((p) => p.status === "Critical").length,
    underObservation: patients.filter((p) => p.status === "Under Observation").length,
    discharged: patients.filter((p) => p.status === "Discharged").length,
  }), [patients]);

  function updateFilter<K extends keyof WardDetailFilters>(key: K, value: WardDetailFilters[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function handlePatientUpdate(updated: WardPatientFull) {
    setPatients((previous) => previous.map((p) => p.uhid === updated.uhid ? updated : p));
    setViewingPatient(updated);
  }

  const columns = useMemo(() => getWardPatientColumns(setViewingPatient), []);
  const columnIds = useMemo(() => columns.map((column) => column.id as string).filter(Boolean), [columns]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">All Ward Patients</h1>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Nurse Admin</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Complete post-admission view of every ward patient — beds, vitals, medicines, nursing, and discharge in one place.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <WardStat icon={<BedDouble className="h-5 w-5" />} label="Total Patients" value={String(stats.total)} subtitle="Across all wards" tone="blue" />
          <WardStat icon={<CheckCircle2 className="h-5 w-5" />} label="Stable" value={String(stats.stable)} subtitle="No active concerns" tone="emerald" />
          <WardStat icon={<Eye className="h-5 w-5" />} label="Under Observation" value={String(stats.underObservation)} subtitle="Being closely monitored" tone="amber" />
          <WardStat icon={<AlertTriangle className="h-5 w-5" />} label="Critical" value={String(stats.critical)} subtitle="Require urgent attention" tone="rose" />
          <WardStat icon={<LogOut className="h-5 w-5" />} label="Discharged" value={String(stats.discharged)} subtitle="Recently released" tone="slate" />
        </div>

        <WardPatientsFilters filters={filters} results={filtered.length} wards={ALL_WARDS} onChange={updateFilter} onReset={() => setFilters(initialFilters)} />

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
          <WardPatientsGrid patients={filtered} onView={setViewingPatient} />
        )}

        <PatientDetailDrawer patient={viewingPatient} onClose={() => setViewingPatient(null)} onPatientUpdate={handlePatientUpdate} />
      </div>
    </div>
  );
}