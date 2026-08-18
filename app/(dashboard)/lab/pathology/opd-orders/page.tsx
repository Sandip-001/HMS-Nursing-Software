// app/(dashboard)/lab/pathology/opd-orders/page.tsx
"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Grid2X2,
  IndianRupee,
  LayoutList,
  ReceiptText,
  TestTube2,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import type {
  PathologyOPDOrder,
  PathologyOrderFilters,
  PathologyPaymentMethod,
  PathologyTestItem,
} from "@/types/lab/pathology/pathology-opd-types";
import {
  PATHOLOGY_CATEGORIES,
  PATHOLOGY_DOCTORS,
  PATHOLOGY_OPD_ORDERS,
  getAggregateStatus,
  getTotalTestValue,
} from "@/lib/lab/pathology/pathology-opd-orders-data";
import { PathologyOrderStat } from "./_components/pathology-order-stats";
import { PathologyOrderFilters as Filters } from "./_components/pathology-order-filters";
import {
  PathologyOrdersGrid,
  PathologyOrdersList,
} from "./_components/pathology-orders-list";
import { PathologyOrderDetailDrawer } from "./_components/pathology-order-detail-drawer";

type ViewMode = "list" | "grid";
const initialFilters: PathologyOrderFilters = {
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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function PathologyOPDOrdersPage() {
  const [orders, setOrders] =
    useState<PathologyOPDOrder[]>(PATHOLOGY_OPD_ORDERS);
  const [filters, setFilters] = useState<PathologyOrderFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>("list");
  const [selectedOrder, setSelectedOrder] = useState<PathologyOPDOrder | null>(
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
        const matchesStatus =
          filters.status === "All" ||
          getAggregateStatus(order) === filters.status ||
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
    const totalIncome = orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((sum, order) => sum + getTotalTestValue(order), 0);
    const totalTests = orders.reduce(
      (sum, order) => sum + order.tests.length,
      0,
    );
    const reportsReady = orders.reduce(
      (sum, order) =>
        sum +
        order.tests.filter((test) => test.status === "Report Ready").length,
      0,
    );
    const pendingTests = orders.reduce(
      (sum, order) =>
        sum +
        order.tests.filter((test) => test.status !== "Report Ready").length,
      0,
    );
    const unpaid = orders.filter(
      (order) => order.paymentStatus === "Unpaid",
    ).length;
    return {
      totalIncome,
      totalOrders: orders.length,
      totalTests,
      reportsReady,
      pendingTests,
      unpaid,
    };
  }, [orders]);

  function updateFilter<K extends keyof PathologyOrderFilters>(
    key: K,
    value: PathologyOrderFilters[K],
  ) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function updateTest(orderId: string, updatedTest: PathologyTestItem) {
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
        ? `${updatedTest.testName} report finalized and locked.`
        : `${updatedTest.testName} status updated to ${updatedTest.status}.`,
    );
  }

  function collectPayment(orderId: string, method: PathologyPaymentMethod) {
    const timestamp = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const current = orders.find((order) => order.id === orderId);
    setOrders((previous) =>
      previous.map((order) =>
        order.id === orderId
          ? {
              ...order,
              paymentStatus: "Paid",
              paymentMethod: method,
              paidAt: timestamp,
            }
          : order,
      ),
    );
    setSelectedOrder(null);
    toast.success(
      `Payment collected successfully from ${current?.patient.name ?? "patient"}.`,
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Pathology OPD Orders
              </h1>
              <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                Laboratory Queue
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Collect samples, process diagnostic tests, finalize reports, and
              collect laboratory payments.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">
            <TestTube2 className="h-4 w-4" />
            {stats.pendingTests} tests pending completion
          </div>
        </header>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <PathologyOrderStat
            icon={<IndianRupee className="h-5 w-5" />}
            label="Total Pathology Income"
            value={`₹${stats.totalIncome}`}
            subtitle="Collected payments"
            tone="emerald"
          />
          <PathologyOrderStat
            icon={<ReceiptText className="h-5 w-5" />}
            label="Total OPD Orders"
            value={String(stats.totalOrders)}
            subtitle={`${stats.totalTests} ordered tests`}
            tone="blue"
          />
          <PathologyOrderStat
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Reports Ready"
            value={String(stats.reportsReady)}
            subtitle="Finalized laboratory reports"
            tone="violet"
          />
          <PathologyOrderStat
            icon={<Clock3 className="h-5 w-5" />}
            label="Pending / Unpaid"
            value={`${stats.pendingTests} / ${stats.unpaid}`}
            subtitle="Tests pending / orders unpaid"
            tone="amber"
          />
        </div>
        <Filters
          filters={filters}
          results={filteredOrders.length}
          doctors={PATHOLOGY_DOCTORS}
          categories={PATHOLOGY_CATEGORIES}
          onChange={updateFilter}
          onReset={() => setFilters(initialFilters)}
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-800">
              {filteredOrders.length}
            </span>{" "}
            pathology OPD order{filteredOrders.length !== 1 ? "s" : ""}
          </p>
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === "list" ? "bg-violet-50 text-violet-700" : "text-slate-500"}`}
            >
              <LayoutList className="inline h-4 w-4" />{" "}
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === "grid" ? "bg-violet-50 text-violet-700" : "text-slate-500"}`}
            >
              <Grid2X2 className="inline h-4 w-4" />{" "}
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>
        {view === "list" ? (
          <PathologyOrdersList
            orders={filteredOrders}
            onView={setSelectedOrder}
          />
        ) : (
          <PathologyOrdersGrid
            orders={filteredOrders}
            onView={setSelectedOrder}
          />
        )}
        <PathologyOrderDetailDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateTest={updateTest}
          onCollectPayment={collectPayment}
        />
      </div>
    </div>
  );
}
