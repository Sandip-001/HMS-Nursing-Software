
"use client";

import { useMemo, useState } from "react";
import { ClipboardList, CheckCircle2, PackageSearch } from "lucide-react";
import { PHARMACY_ORDERS } from "@/lib/pharmacy/ipd/pharmacy-order-data";
import type { PharmacyOrder } from "@/types/pharmacy/ipd/pharmacy-order-types";
import { PharmacyStatCard } from "./_components/pharmacy-stat-card";
import { PharmacyFilters } from "./_components/pharmacy-filters";
import { PharmacyOrdersTable } from "./_components/pharmacy-orders-table";
import { OrderDetailsDialog } from "./_components/order-details-dialog";

export default function PharmacyIpdPage() {
  const [orders, setOrders] = useState<PharmacyOrder[]>(PHARMACY_ORDERS);
  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("All Doctors");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedOrder, setSelectedOrder] = useState<PharmacyOrder | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const doctors = useMemo(() => Array.from(new Set(orders.map((o) => o.orderingDoctor))), [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.patientName.toLowerCase().includes(search.toLowerCase()) ||
        order.uhid.toLowerCase().includes(search.toLowerCase());
      const matchesDoctor = doctorFilter === "All Doctors" || order.orderingDoctor === doctorFilter;
      const matchesStatus = statusFilter === "All Status" || order.status === statusFilter;
      return matchesSearch && matchesDoctor && matchesStatus;
    });
  }, [orders, search, doctorFilter, statusFilter]);

  const pendingCount = orders.filter((o) => !o.status.startsWith("Medicine Delivered")).length;
  const completedCount = orders.filter((o) => o.status.startsWith("Medicine Delivered")).length;
  const totalMedicineLines = orders.reduce((sum, o) => sum + o.medicines.length, 0);

  function handleView(order: PharmacyOrder) {
    setSelectedOrder(order);
    setDetailsOpen(true);
  }

  function handleOrderUpdate(updated: PharmacyOrder) {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    setSelectedOrder(updated);
  }

  return (
    <div className="min-h-scree">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Pharmacy Order Management</h1>
          <p className="mt-1 text-sm text-slate-500">Review IPD medicine orders, manage stock availability, and process patient billing.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <PharmacyStatCard icon={ClipboardList} label="Pending Orders" value={String(pendingCount)} tint="amber" />
          <PharmacyStatCard icon={CheckCircle2} label="Completed Orders" value={String(completedCount)} tint="emerald" />
          <PharmacyStatCard icon={PackageSearch} label="Total Medicine Lines" value={String(totalMedicineLines)} tint="violet" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4">
            <PharmacyFilters
              search={search}
              onSearchChange={setSearch}
              doctorFilter={doctorFilter}
              onDoctorFilterChange={setDoctorFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              doctors={doctors}
            />
          </div>

          <PharmacyOrdersTable orders={filteredOrders} onView={handleView} />
        </div>
      </div>

      <OrderDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        order={selectedOrder}
        onOrderUpdate={handleOrderUpdate}
      />
    </div>
  );
}