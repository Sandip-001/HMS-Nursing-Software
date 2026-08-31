// app/(dashboard)/nurse/icu/patients/[uhid]/_components/oxygen-order-history.tsx
"use client";
import { History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OxygenOrder } from "@/types/nurse/icu/oxygen-therapy-types";
import { formatDeviceSettings } from "./oxygen-device-fields";

export function OxygenOrderHistory({ orders }: { orders: OxygenOrder[] }) {
  const sorted = [...orders].sort((a, b) => a.orderedAt.localeCompare(b.orderedAt));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800"><History className="h-4 w-4 text-slate-500" />Order History</p>
      <div className="space-y-3">
        {sorted.map((order, idx) => (
          <div key={order.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`h-3 w-3 rounded-full ${order.status === "Active" ? "bg-emerald-500" : order.status === "Discontinued" ? "bg-red-400" : "bg-amber-400"}`} />
              {idx < sorted.length - 1 && <div className="mt-1 h-full w-0.5 bg-slate-200" />}
            </div>
            <div className="min-w-0 flex-1 pb-4">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-slate-500">{order.orderedAt}</p>
                <Badge variant="outline" className={order.status === "Active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : order.status === "Discontinued" ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-700"}>
                  {idx === 0 ? "Initial Order" : order.status === "Discontinued" ? "Discontinued" : "Order Modified"}
                </Badge>
              </div>
              <p className="mt-1 text-sm font-bold text-slate-800">{formatDeviceSettings(order.settings)}</p>
              <p className="text-xs text-slate-500">Target SpO₂: {order.targetSpo2Min}–{order.targetSpo2Max}% · Ordered by {order.orderedBy} ({order.orderedByRole})</p>
              {order.discontinuedReason && <p className="mt-1 text-xs italic text-red-600">Reason: {order.discontinuedReason}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}