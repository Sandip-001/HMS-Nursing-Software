// app/(dashboard)/admission/icu/all-patients/page.tsx
"use client";
import { useMemo, useState } from "react";
import { Grid2X2, LayoutList, Heart } from "lucide-react";
import type { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { IcuPatient, IcuFilters } from "@/types/admission-desk/icu/icu-types";
import { ICU_PATIENTS } from "@/lib/admission-desk/icu/icu-data";
import { IcuStat } from "./_components/icu-stats";
import { IcuFilters as IcuFilterComponent } from "./_components/icu-filters";
import { getIcuColumns } from "./_components/icu-columns";
import { IcuGrid } from "./_components/icu-grid";
import { IcuPatientDrawer } from "./_components/icu-patient-drawer";
import { PharmacyIpdColumnToggle as ColumnToggle } from "@/app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle";

const initialFilters: IcuFilters = { search: "", status: "All", admissionType: "All", floor: "All", dateFrom: "", dateTo: "" };

export default function IcuAllPatientsPage() {
  const [patients] = useState<IcuPatient[]>(ICU_PATIENTS);
  const [filters, setFilters] = useState<IcuFilters>(initialFilters);
  const [view, setView] = useState<"table" | "grid">("table");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedPatient, setSelectedPatient] = useState<IcuPatient | null>(null);

  const filtered = useMemo(
    () =>
      patients.filter((p) => {
        const q = filters.search.trim().toLowerCase();
        const matchesSearch = !q || [p.patientName, p.uhid, p.icuId].join(" ").toLowerCase().includes(q);
        const matchesStatus = filters.status === "All" || p.status === filters.status;
        const matchesAdmission = filters.admissionType === "All" || p.admissionType === filters.admissionType;
        const matchesFloor = filters.floor === "All" || p.floor === filters.floor;
        const matchesDateFrom = !filters.dateFrom || p.admissionDate >= filters.dateFrom;
        const matchesDateTo = !filters.dateTo || p.admissionDate <= filters.dateTo;
        return matchesSearch && matchesStatus && matchesAdmission && matchesFloor && matchesDateFrom && matchesDateTo;
      }),
    [patients, filters]
  );

  const stats = useMemo(
    () => ({
      total: patients.length,
      stable: patients.filter((p) => p.status === "Stable").length,
      critical: patients.filter((p) => p.status === "Critical").length,
      observation: patients.filter((p) => p.status === "Under Observation").length,
    }),
    [patients]
  );

  const columns = useMemo(() => getIcuColumns(setSelectedPatient), []);
  const columnIds = useMemo(() => columns.map((c) => c.id as string).filter(Boolean), [columns]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">ICU Patients</h1>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Admission Desk</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">Monitor and manage all patients admitted to Intensive Care Units.</p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <IcuStat icon={<Heart className="h-5 w-5" />} label="Total ICU Patients" value={String(stats.total)} subtitle="Currently admitted" tone="blue" />
          <IcuStat icon={<Heart className="h-5 w-5" />} label="Stable" value={String(stats.stable)} subtitle="Hemodynamically stable" tone="emerald" />
          <IcuStat icon={<Heart className="h-5 w-5" />} label="Under Observation" value={String(stats.observation)} subtitle="Requires monitoring" tone="amber" />
          <IcuStat icon={<Heart className="h-5 w-5" />} label="Critical" value={String(stats.critical)} subtitle="Requires immediate attention" tone="rose" />
        </div>

        {/* Filters */}
        <IcuFilterComponent
          filters={filters}
          results={filtered.length}
          onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
          onReset={() => setFilters(initialFilters)}
        />

        {/* View Toggle & Column Toggle */}
        <div className="flex justify-end gap-2">
          {view === "table" && (
            <div className="flex items-center gap-2">
              <ColumnToggle columnIds={columnIds} visibility={columnVisibility as Record<string, boolean>} onToggle={(id, visible) => setColumnVisibility((previous) => ({ ...previous, [id]: visible }))} />
            </div>
          )}
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button onClick={() => setView("table")} className={`rounded-lg px-3 py-2 text-xs ${view === "table" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}>
              <LayoutList className="inline h-4 w-4" /> Table
            </button>
            <button onClick={() => setView("grid")} className={`rounded-lg px-3 py-2 text-xs ${view === "grid" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}>
              <Grid2X2 className="inline h-4 w-4" /> Grid
            </button>
          </div>
        </div>

        {/* Data Display */}
        {view === "table" ? (
          <DataTable columns={columns} data={filtered} columnVisibility={columnVisibility} onColumnVisibilityChange={setColumnVisibility} pageSize={8} />
        ) : (
          <IcuGrid patients={filtered} onView={setSelectedPatient} />
        )}

        {/* Patient Detail Drawer */}
        <IcuPatientDrawer patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      </div>
    </div>
  );
}