// app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-orders-grid.tsx
"use client";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PharmacyIpdOrder } from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";
import { getAdmittedDays, getBalanceDueValue, getNetPayableValue } from "@/lib/pharmacy/ipd/pharmacy-ipd-order-data";
import { OrderStatusBadge, PaymentBadge, UrgencyBadge } from "./pharmacy-ipd-badges";

function hasUrgent(order: PharmacyIpdOrder) {
  return order.medicines.some((medicine) => medicine.urgency === "Urgent");
}

export function PharmacyIpdOrdersGrid({ orders, onView }: { orders: PharmacyIpdOrder[]; onView: (order: PharmacyIpdOrder) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-slate-800">{order.patientName}</p>
                <p className="text-xs text-slate-400">{order.uhid} · {order.ipdId}</p>
              </div>
              <PaymentBadge status={order.paymentStatus} />
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-700">{order.orderingDoctor}</p>
              <p className="mt-1 text-xs text-slate-500">{order.department} · {order.ward} · {order.bed}</p>
              <p className="mt-1 text-xs text-slate-400">Admitted {getAdmittedDays(order.admissionDate)} day(s)</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-100 p-3">
                <p className="text-[10px] uppercase text-slate-400">Medicines</p>
                <p className="mt-1 text-sm font-bold text-slate-700">{order.medicines.length}</p>
              </div>
              <div className="rounded-lg border border-slate-100 p-3">
                <p className="text-[10px] uppercase text-slate-400">Balance Due</p>
                <p className={`mt-1 text-sm font-bold ${getBalanceDueValue(order) > 0 ? "text-red-600" : "text-emerald-600"}`}>₹{getBalanceDueValue(order).toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <OrderStatusBadge status={order.status} />
              <UrgencyBadge urgency={hasUrgent(order) ? "Urgent" : "Routine"} />
            </div>
            <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-2 text-center text-xs text-slate-500">
              Net Payable: <span className="font-bold text-slate-800">₹{getNetPayableValue(order).toFixed(2)}</span>
            </div>
            <Button className="mt-3 w-full border-blue-200 text-blue-700" variant="outline" onClick={() => onView(order)}>
              <Eye className="mr-2 h-4 w-4" />Manage Order
            </Button>
          </CardContent>
        </Card>
      ))}
      {orders.length === 0 && <div className="col-span-full py-16 text-center text-sm text-slate-400">No pharmacy IPD orders match the selected filters.</div>}
    </div>
  );
}