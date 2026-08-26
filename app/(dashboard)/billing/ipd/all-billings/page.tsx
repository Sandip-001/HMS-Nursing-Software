// app/(dashboard)/billing/ipd/page.tsx
"use client";
import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock3, Grid2X2, LayoutList, TrendingUp, Wallet } from "lucide-react";
import type { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { BillingFilters as BillingFiltersState, BillingPatient } from "@/types/billing/ipd/billing-types";
import { BILLING_PATIENTS, BILLING_WARDS, THIS_MONTH_PREFIX, TODAY_ISO } from "@/lib/billing/ipd/billing-data";
import { computeBilling, formatCurrency } from "@/lib/billing/ipd/billing-calculations";
import { BillingStat } from "./_components/billing-stats";
import { BillingFilters } from "./_components/billing-filters";
import { getBillingColumns, defaultBillingColumnVisibility } from "./_components/billing-columns";
import { BillingGrid } from "./_components/billing-grid";
import { BillingDetailDrawer } from "./_components/drawer/billing-detail-drawer";
import { PharmacyIpdColumnToggle as ColumnToggle } from "@/app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle";

type ViewMode = "table" | "grid";
const initialFilters: BillingFiltersState = { search: "", ward: "All", status: "All" };

export default function IpdBillingPage() {
  const [patients, setPatients] = useState<BillingPatient[]>(BILLING_PATIENTS);
  const [filters, setFilters] = useState<BillingFiltersState>(initialFilters);
  const [view, setView] = useState<ViewMode>("table");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultBillingColumnVisibility);
  const [viewingPatient, setViewingPatient] = useState<BillingPatient | null>(null);

  const filtered = useMemo(() => patients.filter((patient) => {
    const query = filters.search.trim().toLowerCase();
    const matchesSearch = !query || [patient.patientName, patient.uhid, patient.ipdId].join(" ").toLowerCase().includes(query);
    const matchesWard = filters.ward === "All" || patient.ward === filters.ward;
    const matchesStatus = filters.status === "All" || computeBilling(patient).status === filters.status;
    return matchesSearch && matchesWard && matchesStatus;
  }), [patients, filters]);

  const stats = useMemo(() => {
    let collectedToday = 0;
    let collectedThisMonth = 0;
    let totalDue = 0;
    let fullyPaidCount = 0;
    let dueCount = 0;

    patients.forEach((patient) => {
      const computed = computeBilling(patient);
      totalDue += computed.dueAmount;
      if (computed.status === "Fully Paid") fullyPaidCount += 1;
      if (computed.status !== "Fully Paid") dueCount += 1;
      patient.payments.forEach((payment) => {
        if (payment.date === TODAY_ISO) collectedToday += payment.totalAmount;
        if (payment.date.startsWith(THIS_MONTH_PREFIX)) collectedThisMonth += payment.totalAmount;
      });
    });

    return { collectedToday, collectedThisMonth, totalDue, fullyPaidCount, dueCount };
  }, [patients]);

  function updateFilter<K extends keyof BillingFiltersState>(key: K, value: BillingFiltersState[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function handlePatientUpdate(updated: BillingPatient) {
    setPatients((previous) => previous.map((p) => p.uhid === updated.uhid ? updated : p));
    setViewingPatient(updated);
  }

  const columns = useMemo(() => getBillingColumns(setViewingPatient), []);
  const columnIds = useMemo(() => columns.map((column) => column.id as string).filter(Boolean), [columns]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">IPD Billing</h1>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Billing Department</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Track charges, discounts, payments, and insurance coverage for every admitted patient.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <BillingStat icon={<Wallet className="h-5 w-5" />} label="Collected Today" value={formatCurrency(stats.collectedToday)} subtitle="24 Aug 2026" tone="emerald" />
          <BillingStat icon={<TrendingUp className="h-5 w-5" />} label="Collected This Month" value={formatCurrency(stats.collectedThisMonth)} subtitle="August 2026" tone="blue" />
          <BillingStat icon={<AlertTriangle className="h-5 w-5" />} label="Total Outstanding Due" value={formatCurrency(stats.totalDue)} subtitle="Across all patients" tone="rose" />
          <BillingStat icon={<CheckCircle2 className="h-5 w-5" />} label="Fully Paid Bills" value={String(stats.fullyPaidCount)} subtitle="Fully settled accounts" tone="violet" />
          <BillingStat icon={<Clock3 className="h-5 w-5" />} label="Pending / Partial Bills" value={String(stats.dueCount)} subtitle="Require follow-up" tone="amber" />
        </div>

        <BillingFilters filters={filters} results={filtered.length} wards={BILLING_WARDS} onChange={updateFilter} onReset={() => setFilters(initialFilters)} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 shrink text-sm text-slate-500">Showing <span className="font-bold text-slate-800">{filtered.length}</span> bill{filtered.length !== 1 ? "s" : ""}</p>
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
          <BillingGrid patients={filtered} onView={setViewingPatient} />
        )}

        <BillingDetailDrawer patient={viewingPatient} onClose={() => setViewingPatient(null)} onPatientUpdate={handlePatientUpdate} />
      </div>
    </div>
  );
}