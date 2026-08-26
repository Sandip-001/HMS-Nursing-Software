// app/(dashboard)/pharmacy/ipd/orders/_components/tab-returns.tsx
"use client";
import { useMemo, useState } from "react";
import { PackageMinus, Undo2, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { PharmacyIpdOrder } from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";
import { getReturnsTotalValue } from "@/lib/pharmacy/ipd/pharmacy-ipd-order-data";

export function TabReturns({ order }: { order: PharmacyIpdOrder }) {
  const [dateFilter, setDateFilter] = useState("");

  const filteredReturns = useMemo(() => {
    return order.returns
      .filter((entry) => {
        if (!dateFilter) return true;
        const iso = new Date(`${entry.returnDate} 12:00:00`).toISOString().slice(0, 10);
        return iso === dateFilter;
      })
      .sort((a, b) => new Date(`${b.returnDate} 12:00:00`).getTime() - new Date(`${a.returnDate} 12:00:00`).getTime());
  }, [order.returns, dateFilter]);

  const totalReturnedQty = filteredReturns.reduce((sum, entry) => sum + entry.returnedQty, 0);
  const totalRefund = filteredReturns.reduce((sum, entry) => sum + entry.refundAmount, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Undo2 className="h-4 w-4 text-amber-600" />Medicine Returns</p>
        <div className="flex items-center gap-2">
          <Input type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="h-9 w-44" />
          {dateFilter && <button onClick={() => setDateFilter("")} className="text-xs font-semibold text-blue-600">Clear</button>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Summary label="Total Returns" value={String(filteredReturns.length)} />
        <Summary label="Total Qty Returned" value={String(totalReturnedQty)} />
        <Summary label="Total Refund Value" value={`₹${totalRefund.toFixed(2)}`} />
      </div>

      <div className="space-y-3">
        {filteredReturns.map((entry) => (
          <div key={entry.id} className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="flex items-center gap-2 font-bold text-slate-800">
                  <PackageMinus className="h-4 w-4 text-amber-600" />{entry.medicineName}
                </p>
                <p className="mt-1 text-xs text-slate-500">Batch {entry.batchNumber} · Qty returned: {entry.returnedQty} · Unit price: ₹{entry.unitPrice}</p>
              </div>
              <p className="text-lg font-bold text-amber-700">₹{entry.refundAmount.toFixed(2)}</p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-amber-100 pt-3 text-xs text-slate-600">
              <Badge variant="outline" className="border-amber-200 bg-white text-amber-700">{entry.returnedBy}</Badge>
              <span className="flex items-center gap-1"><UserRound className="h-3.5 w-3.5 text-slate-400" />{entry.returnedByName}</span>
              <span>Return date: {entry.returnDate}</span>
              {entry.approvedBy && <span>Approved by: {entry.approvedBy}</span>}
            </div>
            <p className="mt-2 text-xs italic text-slate-500">Reason: {entry.reason}</p>
          </div>
        ))}
        {filteredReturns.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No medicine returns recorded for the selected date.</div>
        )}
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
      <p className="text-[10px] uppercase text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-800">{value}</p>
    </div>
  );
}