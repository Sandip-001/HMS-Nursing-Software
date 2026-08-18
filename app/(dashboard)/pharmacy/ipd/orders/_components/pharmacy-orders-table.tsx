
"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "./order-status-badge";
import type { PharmacyOrder } from "@/types/pharmacy/ipd/pharmacy-order-types";

export function PharmacyOrdersTable({
  orders,
  onView,
}: {
  orders: PharmacyOrder[];
  onView: (order: PharmacyOrder) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full min-w-[1080px] text-sm">
        <thead className="bg-slate-50 text-left text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Order ID</th>
            <th className="px-4 py-3 font-medium">Patient Details</th>
            <th className="px-4 py-3 font-medium">Ward / Bed</th>
            <th className="px-4 py-3 font-medium">Ordering Doctor / Dept</th>
            <th className="px-4 py-3 font-medium">Order Date & Time</th>
            <th className="px-4 py-3 font-medium">Order Qty</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-slate-100 hover:bg-slate-50/60">
              <td className="px-4 py-3 font-medium text-slate-700">{order.orderId}</td>
              <td className="px-4 py-3">
                <div className="font-medium text-slate-800">{order.patientName}</div>
                <div className="text-xs text-slate-400">
                  {order.age} Y / {order.gender} · {order.uhid}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600">
                {order.ward}
                <div className="text-xs text-slate-400">{order.room} / {order.bed}</div>
              </td>
              <td className="px-4 py-3 text-slate-600">
                {order.orderingDoctor}
                <div className="text-xs text-slate-400">{order.department}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-600">{order.orderDateTime}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {order.medicines.length} Medicines
                </span>
              </td>
              <td className="px-4 py-3"><OrderStatusBadge status={order.status} /></td>
              <td className="px-4 py-3">
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => onView(order)}>
                  <Eye className="h-3.5 w-3.5" /> View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}