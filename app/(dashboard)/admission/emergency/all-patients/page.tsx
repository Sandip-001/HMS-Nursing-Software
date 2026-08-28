// app/(dashboard)/admission-desk/emergency/all-patients/page.tsx
"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Grid2X2, HeartCrack, LayoutList, ShieldAlert, Siren, UserPlus, Users } from "lucide-react";
import type { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import type { EmergencyFilters as EmergencyFiltersState, EmergencyPatient } from "@/types/emergency/emergency-types";
import { EMERGENCY_PATIENTS } from "@/lib/emergency/emergency-data";
import { EmergencyStat } from "./_components/emergency-stats";
import { AllEmergencyFilters } from "./_components/emergency-filters";
import { getEmergencyColumns, defaultEmergencyColumnVisibility } from "./_components/emergency-columns";
import { EmergencyGrid } from "./_components/emergency-grid";
import { EmergencyDetailDrawer } from "./_components/drawer/emergency-detail-drawer";
import { PharmacyIpdColumnToggle as ColumnToggle } from "@/app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle";

type ViewMode = "table" | "grid";
const initialFilters: EmergencyFiltersState = { search: "", status: "All", incidentType: "All" };

export default function EmergencyAllPatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<EmergencyPatient[]>(EMERGENCY_PATIENTS);
  const [filters, setFilters] = useState<EmergencyFiltersState>(initialFilters);
  const [view, setView] = useState<ViewMode>("table");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultEmergencyColumnVisibility);
  const [viewingPatient, setViewingPatient] = useState<EmergencyPatient | null>(null);

  const filtered = useMemo(() => patients.filter((patient) => {
    const query = filters.search.trim().toLowerCase();
    const matchesSearch = !query || [patient.patientName ?? "", patient.uhid, patient.emergencyNumber].join(" ").toLowerCase().includes(query);
    const matchesStatus = filters.status === "All" || patient.status === filters.status;
    const matchesIncident = filters.incidentType === "All" || patient.incidentType === filters.incidentType;
    return matchesSearch && matchesStatus && matchesIncident;
  }), [patients, filters]);

  const stats = useMemo(() => ({
    total: patients.length,
    critical: patients.filter((p) => p.status === "Critical").length,
    underObservation: patients.filter((p) => p.status === "Under Observation").length,
    policeCases: patients.filter((p) => p.police.caseType !== "None").length,
    deaths: patients.filter((p) => p.status === "Patient Death").length,
  }), [patients]);

  function updateFilter<K extends keyof EmergencyFiltersState>(key: K, value: EmergencyFiltersState[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function handlePatientUpdate(updated: EmergencyPatient) {
    setPatients((previous) => previous.map((p) => p.emergencyNumber === updated.emergencyNumber ? updated : p));
    setViewingPatient(updated);
  }

  const columns = useMemo(() => getEmergencyColumns(setViewingPatient), []);
  const columnIds = useMemo(() => columns.map((column) => column.id as string).filter(Boolean), [columns]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Emergency Department</h1>
              <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">Admission Desk</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">All emergency patients — registration, vitals, medicines, labs, and case status in one place.</p>
          </div>
          <Button className="gap-2 bg-red-600 hover:bg-red-700" onClick={() => router.push("/admission/emergency/new-registration")}>
            <UserPlus className="h-4 w-4" />New Registration
          </Button>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <EmergencyStat icon={<Users className="h-5 w-5" />} label="Total Emergency Patients" value={String(stats.total)} subtitle="All time" tone="blue" />
          <EmergencyStat icon={<Siren className="h-5 w-5" />} label="Critical" value={String(stats.critical)} subtitle="Require immediate attention" tone="rose" />
          <EmergencyStat icon={<AlertTriangle className="h-5 w-5" />} label="Under Observation" value={String(stats.underObservation)} subtitle="Being monitored" tone="amber" />
          <EmergencyStat icon={<ShieldAlert className="h-5 w-5" />} label="Police / MLC Cases" value={String(stats.policeCases)} subtitle="Medico-legal cases" tone="violet" />
          <EmergencyStat icon={<HeartCrack className="h-5 w-5" />} label="Patient Deaths" value={String(stats.deaths)} subtitle="Reported this period" tone="slate" />
        </div>

        <AllEmergencyFilters filters={filters} results={filtered.length} onChange={updateFilter} onReset={() => setFilters(initialFilters)} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 shrink text-sm text-slate-500">Showing <span className="font-bold text-slate-800">{filtered.length}</span> patient{filtered.length !== 1 ? "s" : ""}</p>
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            {view === "table" && <ColumnToggle columnIds={columnIds} visibility={columnVisibility as Record<string, boolean>} onToggle={(id, visible) => setColumnVisibility((previous) => ({ ...previous, [id]: visible }))} />}
            <div className="flex rounded-xl border border-slate-200 bg-white p-1">
              <button type="button" onClick={() => setView("table")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "table" ? "bg-red-50 text-red-700" : "text-slate-500"}`}><LayoutList className="inline h-4 w-4" /> <span className="hidden sm:inline">Table</span></button>
              <button type="button" onClick={() => setView("grid")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "grid" ? "bg-red-50 text-red-700" : "text-slate-500"}`}><Grid2X2 className="inline h-4 w-4" /> <span className="hidden sm:inline">Grid</span></button>
            </div>
          </div>
        </div>

        {view === "table" ? (
          <DataTable columns={columns} data={filtered} columnVisibility={columnVisibility} onColumnVisibilityChange={setColumnVisibility} pageSize={8} />
        ) : (
          <EmergencyGrid patients={filtered} onView={setViewingPatient} />
        )}

        <EmergencyDetailDrawer patient={viewingPatient} onClose={() => setViewingPatient(null)} onPatientUpdate={handlePatientUpdate} />
      </div>
    </div>
  );
}