// app/(dashboard)/pharmacy/opd/orders/_components/pharmacy-order-grid.tsx
"use client";
import { CalendarDays, Eye, Package, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PharmacyOPDOrder } from "@/types/pharmacy/opd/pharmacy-opd-types";
import {
  getOrderStockStatus,
  getOrderValue,
} from "@/lib/pharmacy/opd/pharmacy-opd-orders-data";
import { OrderBadge, StockBadge } from "./pharmacy-order-table";

export function PharmacyOrderGrid({
  orders,
  onView,
}: {
  orders: PharmacyOPDOrder[];
  onView: (order: PharmacyOPDOrder) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {orders.map((order) => (
        <Card
          key={order.id}
          className="overflow-hidden border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white">
                  {order.patient.name.split(" ").slice(-1)[0]?.charAt(0)}
                  {order.patient.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-800">
                    {order.patient.name}
                  </p>
                  <p className="text-xs text-slate-400">{order.patient.uhid}</p>
                </div>
              </div>
              <OrderBadge status={order.status} />
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Stethoscope className="h-3.5 w-3.5 text-violet-600" />
                {order.doctor.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {order.doctor.specialty} · {order.appointmentId}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-100 p-3">
                <p className="flex items-center gap-1 text-[10px] uppercase text-slate-400">
                  <Package className="h-3 w-3" />
                  Medicines
                </p>
                <p className="mt-1 text-sm font-bold text-slate-700">
                  {order.medicines.length} items
                </p>
              </div>
              <div className="rounded-lg border border-slate-100 p-3">
                <p className="flex items-center gap-1 text-[10px] uppercase text-slate-400">
                  <CalendarDays className="h-3 w-3" />
                  Order Value
                </p>
                <p className="mt-1 text-sm font-bold text-slate-700">
                  ₹{getOrderValue(order).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <StockBadge status={getOrderStockStatus(order)} />
              <span className="text-xs text-slate-400">
                {order.orderDateTime}
              </span>
            </div>
            <Button
              className="mt-4 w-full border-blue-200 text-blue-700"
              variant="outline"
              onClick={() => onView(order)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View & Dispense
            </Button>
          </CardContent>
        </Card>
      ))}
      {orders.length === 0 && (
        <div className="col-span-full py-16 text-center text-sm text-slate-400">
          No pharmacy orders match the selected filters.
        </div>
      )}
    </div>
  );
}
