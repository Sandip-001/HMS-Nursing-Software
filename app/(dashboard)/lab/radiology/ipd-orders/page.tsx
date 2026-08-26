// app/(dashboard)/lab/radiology/ipd-orders/page.tsx
"use client";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Grid2X2,
  IndianRupee,
  LayoutList,
  ReceiptText,
  ScanLine,
} from "lucide-react";
import { toast } from "sonner";
import type {
  RadiologyIpdOrder,
  RadiologyIpdOrderFilters,
  RadiologyIpdTestItem,
} from "@/types/lab/radiology/radiology-ipd-types";
import type { RadiologyPaymentMethod } from "@/types/lab/radiology/radiology-opd-types";
import {
  RADIOLOGY_IPD_CATEGORIES,
  RADIOLOGY_IPD_DOCTORS,
  RADIOLOGY_IPD_ORDERS,
  getRadiologyIpdAggregateStatus,
  getTotalRadiologyIpdValue,
  hasUrgentRadiologyIpdTest,
} from "@/lib/lab/radiology/radiology-ipd-orders-data";
import { RadiologyIpdStat } from "./_components/radiology-ipd-stats";
import { RadiologyIpdFilters } from "./_components/radiology-ipd-filters";
import {
  RadiologyIpdOrdersGrid,
  RadiologyIpdOrdersList,
} from "./_components/radiology-ipd-orders-list";
import { RadiologyIpdOrderDetailDrawer } from "./_components/radiology-ipd-order-detail-drawer";

type ViewMode = "list" | "grid";
const initialFilters: RadiologyIpdOrderFilters = {
  search: "",
  date: "",
  doctor: "",
  category: "",
  status: "All",
  urgency: "All",
  paymentStatus: "All",
};
function dateToIso(value: string) {
  const dateText = value.split(",")[0]?.trim();
  if (!dateText) return "";
  const date = new Date(`${dateText} 12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function RadiologyIpdOrdersPage() {
  const [orders, setOrders] =
    useState<RadiologyIpdOrder[]>(RADIOLOGY_IPD_ORDERS);
  const [filters, setFilters] =
    useState<RadiologyIpdOrderFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>("list");
  const [selectedOrder, setSelectedOrder] = useState<RadiologyIpdOrder | null>(
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
            order.ipdId,
            order.patient.name,
            order.patient.uhid,
            order.patient.ward,
            order.patient.bed,
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
          getRadiologyIpdAggregateStatus(order) === filters.status ||
          order.tests.some((test) => test.status === filters.status);
        const matchesUrgency =
          filters.urgency === "All" ||
          (filters.urgency === "Urgent"
            ? hasUrgentRadiologyIpdTest(order)
            : !hasUrgentRadiologyIpdTest(order));
        const matchesPayment =
          filters.paymentStatus === "All" ||
          order.paymentStatus === filters.paymentStatus;
        return (
          matchesSearch &&
          matchesDate &&
          matchesDoctor &&
          matchesCategory &&
          matchesStatus &&
          matchesUrgency &&
          matchesPayment
        );
      }),
    [orders, filters],
  );

  const stats = useMemo(() => {
    const income = orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((sum, order) => sum + getTotalRadiologyIpdValue(order), 0);
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
    const urgent = orders.filter((order) =>
      hasUrgentRadiologyIpdTest(order),
    ).length;
    const billingSent = orders.filter((order) =>
      Boolean(order.billSentToBillingDeptAt),
    ).length;
    return {
      income,
      totalOrders: orders.length,
      tests,
      ready,
      processing,
      urgent,
      billingSent,
    };
  }, [orders]);

  function updateFilter<K extends keyof RadiologyIpdOrderFilters>(
    key: K,
    value: RadiologyIpdOrderFilters[K],
  ) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }
  function updateTest(orderId: string, updatedTest: RadiologyIpdTestItem) {
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
    const current = orders.find((order) => order.id === orderId);
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
      `Payment collected successfully from ${current?.patient.name ?? "patient"}.`,
    );
  }
  function sendToBillingDept(orderId: string) {
    const stamp = new Date().toLocaleString("en-IN", {
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
          ? { ...order, billSentToBillingDeptAt: stamp }
          : order,
      ),
    );
    setSelectedOrder(null);
    toast.success(
      `Radiology reports delivered for ${current?.patient.name ?? "patient"}. Bill sent to IPD Billing Department.`,
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Radiology IPD Orders
              </h1>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
                Inpatient Imaging Queue
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Process ward imaging orders, upload reports, and manage direct or
              billing-department payments.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            <AlertTriangle className="h-4 w-4" />
            {stats.urgent} urgent order{stats.urgent !== 1 ? "s" : ""}
          </div>
        </header>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <RadiologyIpdStat
            icon={<IndianRupee className="h-5 w-5" />}
            label="Total Radiology Income"
            value={`₹${stats.income}`}
            subtitle="Directly collected payments"
            tone="emerald"
          />
          <RadiologyIpdStat
            icon={<ReceiptText className="h-5 w-5" />}
            label="Total IPD Orders"
            value={String(stats.totalOrders)}
            subtitle={`${stats.tests} imaging tests`}
            tone="blue"
          />
          <RadiologyIpdStat
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Reports Ready"
            value={String(stats.ready)}
            subtitle="Uploaded and finalized reports"
            tone="sky"
          />
          <RadiologyIpdStat
            icon={<Clock3 className="h-5 w-5" />}
            label="Processing / Billed"
            value={`${stats.processing} / ${stats.billingSent}`}
            subtitle="Imaging in progress / bills sent"
            tone="amber"
          />
        </div>
        <RadiologyIpdFilters
          filters={filters}
          results={filteredOrders.length}
          doctors={RADIOLOGY_IPD_DOCTORS}
          categories={RADIOLOGY_IPD_CATEGORIES}
          onChange={updateFilter}
          onReset={() => setFilters(initialFilters)}
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-800">
              {filteredOrders.length}
            </span>{" "}
            radiology IPD order{filteredOrders.length !== 1 ? "s" : ""}
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
          <RadiologyIpdOrdersList
            orders={filteredOrders}
            onView={setSelectedOrder}
          />
        ) : (
          <RadiologyIpdOrdersGrid
            orders={filteredOrders}
            onView={setSelectedOrder}
          />
        )}
        <RadiologyIpdOrderDetailDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateTest={updateTest}
          onCollectPayment={collectPayment}
          onSendToBillingDept={sendToBillingDept}
        />
      </div>
    </div>
  );
}
