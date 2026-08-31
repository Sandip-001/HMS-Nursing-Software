// app/(dashboard)/nurse/icu/patients/page.tsx
"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Grid2X2, HeartPulse, LayoutList, PackageX, Users } from "lucide-react";
import type { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { NurseIpdPatient, NurseIpdPatientFilters } from "@/types/nurse/ipd/nurse-ipd-types";
import { NURSE_ICU_SHIFTS, NURSE_ICU_WARDS, getEmarForPatient, getNursePatients } from "@/lib/nurse/icu/nurse-icu-data";
import { NurseIpdPatientsGrid } from "../../ipd/patients/_components/nurse-ipd-patients-grid";
import { getNurseIpdColumns, defaultNurseColumnVisibility } from "../../ipd/patients/_components/nurse-ipd-columns";
import { PharmacyIpdColumnToggle as ColumnToggle } from "@/app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle";
import { NurseIpdStat } from "../../ipd/patients/_components/nurse-ipd-stats";
import { NurseICUFilters } from "./_components/nurse-icu-filters";

type ViewMode = "table" | "grid";
const initialFilters: NurseIpdPatientFilters = { search: "", ward: "All", acuity: "All", shift: "All" };

export default function NurseIcuPatientsPage() {
  const router = useRouter();
  const patients = useMemo(() => getNursePatients(), []);
  const [filters, setFilters] = useState<NurseIpdPatientFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>("table");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultNurseColumnVisibility);

  const filteredPatients = useMemo(() => patients.filter((patient) => {
    const query = filters.search.trim().toLowerCase();
    const matchesSearch = !query || [patient.patientName, patient.uhid, patient.ipdId, patient.bed].join(" ").toLowerCase().includes(query);
    const matchesWard = filters.ward === "All" || patient.ward === filters.ward;
    const matchesAcuity = filters.acuity === "All" || patient.acuity === filters.acuity;
    return matchesSearch && matchesWard && matchesAcuity;
  }), [patients, filters]);

  const stats = useMemo(() => {
    const critical = patients.filter((p) => p.acuity === "Critical").length;
    const pendingDoses = patients.reduce((sum, p) => sum + getEmarForPatient(p.uhid).filter((d) => d.status === "Pending").length, 0);
    const outOfStock = patients.reduce((sum, p) => sum + getEmarForPatient(p.uhid).filter((d) => d.status === "Out of Stock").length, 0);
    return { total: patients.length, critical, pendingDoses, outOfStock };
  }, [patients]);

  function updateFilter<K extends keyof NurseIpdPatientFilters>(key: K, value: NurseIpdPatientFilters[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function viewPatient(patient: NurseIpdPatient) {
    router.push(`/nurse/icu/patients/${patient.uhid}`);
  }

  const columns = useMemo(() => getNurseIpdColumns(viewPatient), []);
  const columnIds = useMemo(() => columns.map((column) => column.id as string).filter(Boolean), [columns]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">My ICU Patients</h1>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Nursing Station</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Manage vitals, medication administration, ventilation, oxygen therapy, and care plans for your assigned ICU patients.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <NurseIpdStat icon={<Users className="h-5 w-5" />} label="Assigned Patients" value={String(stats.total)} subtitle="Under your care this shift" tone="blue" />
          <NurseIpdStat icon={<AlertTriangle className="h-5 w-5" />} label="Critical Patients" value={String(stats.critical)} subtitle="Require close monitoring" tone="rose" />
          <NurseIpdStat icon={<HeartPulse className="h-5 w-5" />} label="Pending Doses" value={String(stats.pendingDoses)} subtitle="Medicines due to be given" tone="amber" />
          <NurseIpdStat icon={<PackageX className="h-5 w-5" />} label="Out of Stock" value={String(stats.outOfStock)} subtitle="Doses awaiting pharmacy stock" tone="violet" />
        </div>

        <NurseICUFilters filters={filters} results={filteredPatients.length} wards={NURSE_ICU_WARDS} shifts={NURSE_ICU_SHIFTS} onChange={updateFilter} onReset={() => setFilters(initialFilters)} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 shrink text-sm text-slate-500">
            Showing <span className="font-bold text-slate-800">{filteredPatients.length}</span> patient{filteredPatients.length !== 1 ? "s" : ""}
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            {view === "table" && (
              <ColumnToggle
                columnIds={columnIds}
                visibility={columnVisibility as Record<string, boolean>}
                onToggle={(id, visible) => setColumnVisibility((previous) => ({ ...previous, [id]: visible }))}
              />
            )}
            <div className="flex rounded-xl border border-slate-200 bg-white p-1">
              <button type="button" onClick={() => setView("table")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "table" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}>
                <LayoutList className="inline h-4 w-4" /> <span className="hidden sm:inline">Table</span>
              </button>
              <button type="button" onClick={() => setView("grid")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "grid" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}>
                <Grid2X2 className="inline h-4 w-4" /> <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {view === "table" ? (
          <DataTable columns={columns} data={filteredPatients} columnVisibility={columnVisibility} onColumnVisibilityChange={setColumnVisibility} pageSize={8} />
        ) : (
          <NurseIpdPatientsGrid patients={filteredPatients} onView={viewPatient} />
        )}
      </div>
    </div>
  );
}