// app/(dashboard)/nurse-admin/ipd/new-admissions/page.tsx
"use client";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Grid2X2, LayoutList, UserPlus, Users } from "lucide-react";
import type { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { AdmittedPatient, DailyShiftAssignment, NurseAdminPatientFilters } from "@/types/nurse-admin/ipd/nurse-admin-types";
import { NEW_ADMISSIONS, NURSE_ADMIN_DEPARTMENTS, NURSE_ADMIN_WARDS, WARD_PATIENTS } from "@/lib/nurse-admin/ipd/nurse-admin-data";
import { NurseAdminStat } from "./_components/nurse-admin-stats";
import { NurseAdminFilters } from "./_components/nurse-admin-filters";
import { AssignNurseDrawer } from "./_components/assign-nurse-drawer";
import { getNewAdmissionColumns, defaultNewAdmissionColumnVisibility } from "./_components/new-admissions-columns";
import { NewAdmissionsGrid } from "./_components/new-admissions-grid";
import { PharmacyIpdColumnToggle as ColumnToggle } from "@/app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle";

type ViewMode = "table" | "grid";
const initialFilters: NurseAdminPatientFilters = { search: "", ward: "All", acuity: "All", department: "All" };

export default function NewAdmissionsPage() {
  const [admissions, setAdmissions] = useState<AdmittedPatient[]>(NEW_ADMISSIONS);
  const [filters, setFilters] = useState<NurseAdminPatientFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>("table");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultNewAdmissionColumnVisibility);
  const [assigningPatient, setAssigningPatient] = useState<AdmittedPatient | null>(null);

  const filtered = useMemo(() => admissions.filter((patient) => {
    const query = filters.search.trim().toLowerCase();
    const matchesSearch = !query || [patient.patientName, patient.uhid, patient.ipdId, patient.bed].join(" ").toLowerCase().includes(query);
    const matchesWard = filters.ward === "All" || patient.ward === filters.ward;
    const matchesAcuity = filters.acuity === "All" || patient.acuity === filters.acuity;
    return matchesSearch && matchesWard && matchesAcuity;
  }), [admissions, filters]);

  const stats = useMemo(() => ({
    total: admissions.length,
    critical: admissions.filter((p) => p.acuity === "Critical").length,
    today: admissions.filter((p) => p.admissionDateTime.startsWith("24 Aug 2026")).length,
  }), [admissions]);

  function updateFilter<K extends keyof NurseAdminPatientFilters>(key: K, value: NurseAdminPatientFilters[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function handleSaveAssignment(uhid: string, assignments: DailyShiftAssignment[]) {
    const patient = admissions.find((p) => p.uhid === uhid);
    if (!patient) return;

    const hasAnyAssignment = assignments.some((a) => a.nurseIds.length > 0);
    if (!hasAnyAssignment) {
      toast.error("Assign at least one nurse to a shift before saving.");
      return;
    }

    // Move patient to ward patients list, remove from new admissions
    WARD_PATIENTS.push({ ...patient, assignments });
    setAdmissions((previous) => previous.filter((p) => p.uhid !== uhid));
    setAssigningPatient(null);
    toast.success(`${patient.patientName} moved to Ward Patients with nurse assignments.`);
  }

  const columns = useMemo(() => getNewAdmissionColumns(setAssigningPatient), []);
  const columnIds = useMemo(() => columns.map((column) => column.id as string).filter(Boolean), [columns]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">New Admissions</h1>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Pending Nurse Assignment</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Patients freshly admitted from the admission desk, awaiting shift-wise nurse assignment.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <NurseAdminStat icon={<Users className="h-5 w-5" />} label="Pending Assignment" value={String(stats.total)} subtitle="Awaiting nurse allocation" tone="blue" />
          <NurseAdminStat icon={<AlertTriangle className="h-5 w-5" />} label="Critical Patients" value={String(stats.critical)} subtitle="Require immediate assignment" tone="rose" />
          <NurseAdminStat icon={<UserPlus className="h-5 w-5" />} label="Admitted Today" value={String(stats.today)} subtitle="24 Aug 2026" tone="emerald" />
        </div>

        <NurseAdminFilters filters={filters} results={filtered.length} wards={NURSE_ADMIN_WARDS} departments={NURSE_ADMIN_DEPARTMENTS} onChange={updateFilter} onReset={() => setFilters(initialFilters)} title="Search & Filter New Admissions" />

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
          <NewAdmissionsGrid patients={filtered} onAssign={setAssigningPatient} />
        )}

        <AssignNurseDrawer patient={assigningPatient} onClose={() => setAssigningPatient(null)} onSave={handleSaveAssignment} />
      </div>
    </div>
  );
}