// app/(dashboard)/pharmacy/ipd/orders/_components/tab-previous-days.tsx
"use client";
import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type {
  DailyDeliveryStatus, DoseSlot, PharmacyIpdOrder,
} from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";
import { DailyStatusBadge } from "./pharmacy-ipd-badges";

const TODAY = "21 Aug 2026";

interface PreviousDayRow {
  medicineName: string;
  slot: DoseSlot;
  status: DailyDeliveryStatus;
  amount: number;
  deliveredBy?: string;
  batchNumberUsed?: string;
}

function isoToDisplay(iso: string) {
  if (!iso) return "";
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function TabPreviousDays({ order }: { order: PharmacyIpdOrder }) {
  const [dateFilter, setDateFilter] = useState("");

  const groupedByDate = useMemo(() => {
    const map = new Map<string, PreviousDayRow[]>();

    order.medicines.forEach((medicine) => {
      medicine.dailyLogs.forEach((log) => {
        if (log.date === TODAY) return;

        const rows = map.get(log.date) ?? [];
        rows.push({
          medicineName: medicine.medicineName,
          slot: log.slot,
          status: log.status,
          amount: log.amount,
          deliveredBy: log.deliveredBy,
          batchNumberUsed: log.batchNumberUsed,
        });
        map.set(log.date, rows);
      });
    });

    return Array.from(map.entries())
      .filter(([date]) => !dateFilter || date === isoToDisplay(dateFilter))
      .sort((a, b) => new Date(`${b[0]} 12:00:00`).getTime() - new Date(`${a[0]} 12:00:00`).getTime());
  }, [order.medicines, dateFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><CalendarDays className="h-4 w-4 text-blue-600" />Previous Days History</p>
        <div className="flex items-center gap-2">
          <Input type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="h-9 w-44" />
          {dateFilter && <button onClick={() => setDateFilter("")} className="text-xs font-semibold text-blue-600">Clear</button>}
        </div>
      </div>

      <div className="space-y-4">
        {groupedByDate.map(([date, rows]) => {
          const dayTotal = rows.reduce((sum, row) => sum + row.amount, 0);
          return (
            <div key={date} className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between bg-slate-50 px-4 py-2.5">
                <p className="text-sm font-bold text-slate-800">{date}</p>
                <p className="text-sm font-bold text-slate-800">Day Total: ₹{dayTotal.toFixed(2)}</p>
              </div>
              <div className="divide-y divide-slate-100">
                {rows.map((row, index) => (
                  <div key={index} className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-slate-200 bg-white text-slate-600">{row.slot}</Badge>
                      <p className="text-sm font-medium text-slate-700">{row.medicineName}</p>
                      {row.batchNumberUsed && <span className="text-xs text-slate-400">Batch {row.batchNumberUsed}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <DailyStatusBadge status={row.status} />
                      <span className="text-sm font-bold text-slate-800">₹{row.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {groupedByDate.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No previous-day records found for the selected date.</div>
        )}
      </div>
    </div>
  );
}