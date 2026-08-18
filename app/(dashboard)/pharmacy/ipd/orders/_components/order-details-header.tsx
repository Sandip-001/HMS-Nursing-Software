
import { OrderStatusBadge } from "./order-status-badge";
import type { PharmacyOrder } from "@/types/pharmacy/ipd/pharmacy-order-types";

export function OrderDetailsHeader({ order }: { order: PharmacyOrder }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-800">Order ID: {order.orderId}</p>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Info label="Patient Name" value={order.patientName} />
        <Info label="Age / Gender" value={`${order.age} Y / ${order.gender}`} />
        <Info label="UHID" value={order.uhid} />
        <Info label="Ward / Bed" value={`${order.ward} / ${order.bed}`} />
        <Info label="Ordering Doctor" value={order.orderingDoctor} />
        <Info label="Department" value={order.department} />
        <Info label="Order Date & Time" value={order.orderDateTime} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}