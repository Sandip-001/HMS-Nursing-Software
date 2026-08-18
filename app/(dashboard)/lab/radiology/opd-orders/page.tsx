// app/(dashboard)/lab/radiology/opd-orders/page.tsx
"use client";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Grid2X2,
  IndianRupee,
  LayoutList,
  ReceiptText,
  ScanLine,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import type {
  RadiologyOPDOrder,
  RadiologyOrderFilters,
  RadiologyPaymentMethod,
  RadiologyTestItem,
} from "@/types/lab/radiology/radiology-opd-types";
import {
  RADIOLOGY_CATEGORIES,
  RADIOLOGY_DOCTORS,
  RADIOLOGY_OPD_ORDERS,
  getRadiologyAggregateStatus,
  getTotalRadiologyValue,
} from "@/lib/lab/radiology/radiology-opd-orders-data";
import { RadiologyOrderStat } from "./_components/radiology-order-stats";
import { RadiologyOrderFilters as Filters } from "./_components/radiology-order-filters";
import {
  RadiologyOrdersGrid,
  RadiologyOrdersList,
} from "./_components/radiology-orders-list";
import { RadiologyOrderDetailDrawer } from "./_components/radiology-order-detail-drawer";

type ViewMode = "list" | "grid";
const initialFilters: RadiologyOrderFilters = {
  search: "",
  date: "",
  doctor: "",
  category: "",
  status: "All",
  paymentStatus: "All",
};
function dateToIso(value: string) {
  const dateText = value.split(",")[0]?.trim();
  if (!dateText) return "";
  const date = new Date(`${dateText} 12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function RadiologyOPDOrdersPage() {
  const [orders, setOrders] =
    useState<RadiologyOPDOrder[]>(RADIOLOGY_OPD_ORDERS);
  const [filters, setFilters] = useState<RadiologyOrderFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>("list");
  const [selectedOrder, setSelectedOrder] = useState<RadiologyOPDOrder | null>(
    null,
  );
  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const query = filters.search.trim().toLowerCase();
        const matchesSearch =
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
        const matchesDate =
          !filters.date || dateToIso(order.orderedAt) === filters.date;
        const matchesDoctor =
          !filters.doctor || order.doctor.name === filters.doctor;
        const matchesCategory =
          !filters.category ||
          order.tests.some((test) => test.category === filters.category);
        const aggregate = getRadiologyAggregateStatus(order);
        const matchesStatus =
          filters.status === "All" ||
          aggregate === filters.status ||
          order.tests.some((test) => test.status === filters.status);
        const matchesPayment =
          filters.paymentStatus === "All" ||
          order.paymentStatus === filters.paymentStatus;
        return (
          matchesSearch &&
          matchesDate &&
          matchesDoctor &&
          matchesCategory &&
          matchesStatus &&
          matchesPayment
        );
      }),
    [orders, filters],
  );
  const stats = useMemo(() => {
    const income = orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((sum, order) => sum + getTotalRadiologyValue(order), 0);
    const tests = orders.reduce((sum, order) => sum + order.tests.length, 0);
    const ready = orders.reduce(
      (sum, order) =>
        sum +
        order.tests.filter((test) => test.status === "Report Ready").length,
      0,
    );
    const processing = orders.reduce(
      (sum, order) =>
        sum + order.tests.filter((test) => test.status === "Processing").length,
      0,
    );
    const unpaid = orders.filter(
      (order) => order.paymentStatus === "Unpaid",
    ).length;
    return { income, orders: orders.length, tests, ready, processing, unpaid };
  }, [orders]);
  function updateFilter<K extends keyof RadiologyOrderFilters>(
    key: K,
    value: RadiologyOrderFilters[K],
  ) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }
  function updateTest(orderId: string, updatedTest: RadiologyTestItem) {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === orderId
          ? {
              ...order,
              tests: order.tests.map((test) =>
                test.id === updatedTest.id ? updatedTest : test,
              ),
            }
          : order,
      ),
    );
    setSelectedOrder((previous) =>
      previous?.id === orderId
        ? {
            ...previous,
            tests: previous.tests.map((test) =>
              test.id === updatedTest.id ? updatedTest : test,
            ),
          }
        : previous,
    );
    toast.success(
      updatedTest.status === "Report Ready"
        ? `${updatedTest.testName} report uploaded and locked.`
        : `${updatedTest.testName} moved to ${updatedTest.status}.`,
    );
  }
  function collectPayment(orderId: string, method: RadiologyPaymentMethod) {
    const stamp = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const target = orders.find((order) => order.id === orderId);
    setOrders((previous) =>
      previous.map((order) =>
        order.id === orderId
          ? {
              ...order,
              paymentStatus: "Paid",
              paymentMethod: method,
              paidAt: stamp,
            }
          : order,
      ),
    );
    setSelectedOrder(null);
    toast.success(
      `Payment collected successfully from ${target?.patient.name ?? "patient"}.`,
    );
  }
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Radiology OPD Orders
              </h1>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
                Imaging Queue
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Process imaging investigations, upload diagnostic reports, and
              collect radiology payments.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700">
            <ScanLine className="h-4 w-4" />
            {stats.processing} imaging test{stats.processing !== 1 ? "s" : ""}{" "}
            processing
          </div>
        </header>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <RadiologyOrderStat
            icon={<IndianRupee className="h-5 w-5" />}
            label="Total Radiology Income"
            value={`₹${stats.income}`}
            subtitle="Collected imaging payments"
            tone="emerald"
          />
          <RadiologyOrderStat
            icon={<ReceiptText className="h-5 w-5" />}
            label="Total OPD Orders"
            value={String(stats.orders)}
            subtitle={`${stats.tests} ordered imaging tests`}
            tone="blue"
          />
          <RadiologyOrderStat
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Reports Ready"
            value={String(stats.ready)}
            subtitle="Uploaded and finalized reports"
            tone="violet"
          />
          <RadiologyOrderStat
            icon={<Clock3 className="h-5 w-5" />}
            label="Processing / Unpaid"
            value={`${stats.processing} / ${stats.unpaid}`}
            subtitle="Imaging in progress / payment due"
            tone="amber"
          />
        </div>
        <Filters
          filters={filters}
          results={filteredOrders.length}
          doctors={RADIOLOGY_DOCTORS}
          categories={RADIOLOGY_CATEGORIES}
          onChange={updateFilter}
          onReset={() => setFilters(initialFilters)}
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-800">
              {filteredOrders.length}
            </span>{" "}
            radiology OPD order{filteredOrders.length !== 1 ? "s" : ""}
          </p>
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === "list" ? "bg-sky-50 text-sky-700" : "text-slate-500"}`}
            >
              <LayoutList className="inline h-4 w-4" />{" "}
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === "grid" ? "bg-sky-50 text-sky-700" : "text-slate-500"}`}
            >
              <Grid2X2 className="inline h-4 w-4" />{" "}
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>
        {view === "list" ? (
          <RadiologyOrdersList
            orders={filteredOrders}
            onView={setSelectedOrder}
          />
        ) : (
          <RadiologyOrdersGrid
            orders={filteredOrders}
            onView={setSelectedOrder}
          />
        )}
        <RadiologyOrderDetailDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateTest={updateTest}
          onCollectPayment={collectPayment}
        />
      </div>
    </div>
  );
}
