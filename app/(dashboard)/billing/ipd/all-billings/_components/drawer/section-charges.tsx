// app/(dashboard)/billing/ipd/_components/drawer/section-charges.tsx
"use client";
import { useMemo, useState } from "react";
import { FileSpreadsheet, Lock, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ChargeCategory, DailyCharge } from "@/types/billing/ipd/billing-types";
import { formatCurrency } from "@/lib/billing/ipd/billing-calculations";
import { DateFilterBar } from "./date-filter-bar";

const categoryTone: Record<ChargeCategory, string> = {
  "Doctor Fee": "border-blue-200 bg-blue-50 text-blue-700",
  "Nurse Fee": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Bed Fee": "border-violet-200 bg-violet-50 text-violet-700",
  Diagnostic: "border-cyan-200 bg-cyan-50 text-cyan-700",
  Pharmacy: "border-amber-200 bg-amber-50 text-amber-700",
  Procedure: "border-rose-200 bg-rose-50 text-rose-700",
  Other: "border-slate-200 bg-slate-50 text-slate-600",
};

export function SectionCharges({ charges, universalPaymentEnabled }: { charges: DailyCharge[]; universalPaymentEnabled: boolean }) {
  const [date, setDate] = useState("");
  const filtered = useMemo(() => date ? charges.filter((c) => c.date === date) : charges, [charges, date]);

  const groupedByDate = useMemo(() => {
    const map = new Map<string, DailyCharge[]>();
    filtered.forEach((c) => { const rows = map.get(c.date) ?? []; rows.push(c); map.set(c.date, rows); });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Receipt className="h-4 w-4 text-blue-600" />Day-wise Billing Details</p>
        <p className="mt-1 text-xs text-slate-500">Doctor, nurse, bed, diagnostic, and pharmacy charges recorded daily during admission.</p>
        <div className="mt-3"><DateFilterBar value={date} onChange={setDate} label="Filter charges by date" /></div>
      </div>

      {!universalPaymentEnabled && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-700">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Pharmacy and Diagnostic charges shown below are for reference only — they are <span className="font-semibold">not added</span> to this IPD bill's total since Universal Payment is disabled. They will be billed separately by Pharmacy/Lab departments.
        </div>
      )}

      <div className="space-y-3">
        {groupedByDate.map(([date, rows]) => {
          const dayTotal = rows.reduce((sum, r) => sum + r.amount, 0);
          return (
            <div key={date} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm font-bold text-slate-700"><FileSpreadsheet className="h-4 w-4 text-slate-400" />{new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}</p>
                <span className="text-sm font-bold text-slate-800">{formatCurrency(dayTotal)}</span>
              </div>
              <div className="space-y-2">
                {rows.map((charge) => {
                  const excluded = !universalPaymentEnabled && (charge.category === "Pharmacy" || charge.category === "Diagnostic");
                  return (
                    <div key={charge.id} className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border p-2.5 ${excluded ? "border-dashed border-slate-200 bg-slate-50/60 opacity-70" : "border-slate-100 bg-slate-50/60"}`}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={categoryTone[charge.category]}>{charge.category}</Badge>
                        <span className="text-sm text-slate-700">{charge.description}</span>
                        {excluded && <span className="text-[10px] font-medium text-amber-600">(excluded)</span>}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{formatCurrency(charge.amount)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {groupedByDate.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No charges found for this date.</div>}
      </div>
    </div>
  );
}