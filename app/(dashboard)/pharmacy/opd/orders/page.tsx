// app/(dashboard)/pharmacy/opd/orders/page.tsx
"use client";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Grid2X2,
  IndianRupee,
  LayoutList,
  PackageCheck,
  ReceiptText,
  Truck,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import type {
  PharmacyOPDOrder,
  PharmacyOrderFilters,
  PharmacyPaymentMethod,
} from "@/types/pharmacy/opd/pharmacy-opd-types";
import {
  PHARMACY_CATEGORIES,
  PHARMACY_DOCTORS,
  PHARMACY_OPD_ORDERS,
  getOrderStockStatus,
  getOrderValue,
} from "@/lib/pharmacy/opd/pharmacy-opd-orders-data";
import { PharmacyOrderStat } from "./_components/pharmacy-order-stats";
import { PharmacyOrderFilters as Filters } from "./_components/pharmacy-order-filters";
import { PharmacyOrderTable } from "./_components/pharmacy-order-table";
import { PharmacyOrderGrid } from "./_components/pharmacy-order-grid";
import { PharmacyOrderDetailDrawer } from "./_components/pharmacy-order-detail-drawer";

type ViewMode = "list" | "grid";
const today = "18 Aug 2026";
const initialFilters: PharmacyOrderFilters = {
  search: "",
  date: "",
  doctor: "",
  category: "",
  stockStatus: "All",
  orderStatus: "All",
};

export default function PharmacyOPDOrdersPage() {
  const [orders, setOrders] = useState<PharmacyOPDOrder[]>(PHARMACY_OPD_ORDERS);
  const [filters, setFilters] = useState<PharmacyOrderFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>("list");
  const [selectedOrder, setSelectedOrder] = useState<PharmacyOPDOrder | null>(
    null,
  );

  const filtered = useMemo(() => {
  return orders.filter((order) => {
    const query = filters.search.trim().toLowerCase();

    const matchSearch =
      !query ||
      [
        order.id,
        order.appointmentId,
        order.patient.name,
        order.patient.uhid,
        order.patient.mobile,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchDate =
      !filters.date ||
      getOrderDateAsIso(order.orderDateTime) === filters.date;

    const matchDoctor =
      !filters.doctor ||
      order.doctor.name === filters.doctor;

    const matchCategory =
      !filters.category ||
      order.medicines.some(
        (medicine) => medicine.category === filters.category,
      );

    const matchStock =
      filters.stockStatus === "All" ||
      getOrderStockStatus(order) === filters.stockStatus;

    const matchStatus =
      filters.orderStatus === "All" ||
      order.status === filters.orderStatus;

    return (
      matchSearch &&
      matchDate &&
      matchDoctor &&
      matchCategory &&
      matchStock &&
      matchStatus
    );
  });
}, [orders, filters]);


  const stats = useMemo(() => {
    const totalEarning = orders
      .filter((order) => order.status !== "Pending")
      .reduce((sum, order) => sum + getOrderValue(order), 0);
    const todayOrders = orders.filter((order) =>
      order.orderDateTime.includes(today),
    );
    const todayCollection = todayOrders
      .filter((order) => order.status !== "Pending")
      .reduce((sum, order) => sum + getOrderValue(order), 0);
    return {
      totalEarning,
      total: orders.length,
      delivered: orders.filter((o) => o.status === "Delivered").length,
      todayOrders: todayOrders.length,
      todayCollection,
      todayDelivered: todayOrders.filter((o) => o.status === "Delivered")
        .length,
      todayPending: todayOrders.filter((o) => o.status === "Pending").length,
    };
  }, [orders]);


  function change<K extends keyof PharmacyOrderFilters>(
    key: K,
    value: PharmacyOrderFilters[K],
  ) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function markDelivered(
    orderId: string,
    paymentMethod: PharmacyPaymentMethod,
  ) {
    const timestamp = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setOrders((previous) =>
      previous.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "Delivered",
              paymentMethod,
              deliveredAt: timestamp,
            }
          : order,
      ),
    );
    const delivered = orders.find((order) => order.id === orderId);
    setSelectedOrder(null);
    toast.success(
      `Medicines dispatched and delivered to ${delivered?.patient.name ?? "patient"} successfully.`,
    );
  }

  function getOrderDateAsIso(orderDateTime: string) {
  const datePart = orderDateTime.split(",")[0].trim();

  const parsedDate = new Date(`${datePart} 12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              OPD Pharmacy Orders
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Verify prescriptions, select FEFO batches, collect payment, and
              deliver medicines.
            </p>
          </div>
          <div className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
            Live OPD Dispensing Queue
          </div>
        </header>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <PharmacyOrderStat
            icon={<IndianRupee className="h-5 w-5" />}
            label="Total Earnings"
            value={`₹${stats.totalEarning.toFixed(2)}`}
            tone="emerald"
            subtitle="Paid & delivered orders"
          />
          <PharmacyOrderStat
            icon={<ReceiptText className="h-5 w-5" />}
            label="Total Orders"
            value={String(stats.total)}
            tone="blue"
            subtitle={`${stats.delivered} delivered`}
          />
          <PharmacyOrderStat
            icon={<CalendarDays className="h-5 w-5" />}
            label="Today's Orders"
            value={String(stats.todayOrders)}
            tone="violet"
            subtitle={`₹${stats.todayCollection.toFixed(2)} collection`}
          />
          <PharmacyOrderStat
            icon={<PackageCheck className="h-5 w-5" />}
            label="Today's Delivery Status"
            value={`${stats.todayDelivered} / ${stats.todayOrders}`}
            tone="amber"
            subtitle={`${stats.todayPending} pending orders`}
          />
        </div>
        <Filters
          filters={filters}
          onChange={change}
          onReset={() => setFilters(initialFilters)}
          doctors={PHARMACY_DOCTORS}
          categories={PHARMACY_CATEGORIES}
          results={filtered.length}
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-800">{filtered.length}</span>{" "}
            pharmacy order{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              onClick={() => setView("list")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === "list" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}
            >
              <LayoutList className="inline h-4 w-4" />{" "}
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === "grid" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}
            >
              <Grid2X2 className="inline h-4 w-4" />{" "}
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>
        {view === "list" ? (
          <PharmacyOrderTable orders={filtered} onView={setSelectedOrder} />
        ) : (
          <PharmacyOrderGrid orders={filtered} onView={setSelectedOrder} />
        )}
        <PharmacyOrderDetailDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onDelivered={markDelivered}
        />
      </div>
    </div>
  );
}
