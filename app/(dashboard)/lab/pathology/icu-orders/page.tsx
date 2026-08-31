// app/(dashboard)/lab/pathology/icu-orders/page.tsx
"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle, CalendarDays, CheckCircle2, Clock3, Grid2X2, IndianRupee,
  LayoutList, ReceiptText, TestTube2,
} from "lucide-react";
import { toast } from "sonner";
import type {
  PathologyIpdOrder, PathologyIpdOrderFilters, PathologyIpdTestItem,
} from "@/types/lab/pathology/pathology-ipd-types";
import type { PathologyPaymentMethod } from "@/types/lab/pathology/pathology-opd-types";
import {
  PATHOLOGY_ICU_CATEGORIES, PATHOLOGY_ICU_DOCTORS, PATHOLOGY_ICU_ORDERS,
  getIpdAggregateStatus, getTotalIpdTestValue, hasUrgentTest,
} from "@/lib/lab/pathology/pathology-icu-orders-data";
import { PathologyIpdOrdersGrid, PathologyIpdOrdersList } from "../ipd-orders/_components/pathology-ipd-orders-list";
import { PathologyIpdOrderDetailDrawer } from "../ipd-orders/_components/pathology-ipd-order-detail-drawer";
import { PathologyIpdStat } from "../ipd-orders/_components/pathology-ipd-stats";
import { PathologyICUFilters } from "./_components/icu-filters";


type ViewMode = "list" | "grid";
const initialFilters: PathologyIpdOrderFilters = { search: "", date: "", doctor: "", category: "", status: "All", urgency: "All", paymentStatus: "All" };

function dateToIso(value: string) {
  const dateText = value.split(",")[0]?.trim();
  if (!dateText) return "";
  const date = new Date(`${dateText} 12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function PathologyICUOrdersPage() {
  const [orders, setOrders] = useState<PathologyIpdOrder[]>(PATHOLOGY_ICU_ORDERS);
  const [filters, setFilters] = useState<PathologyIpdOrderFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>("list");
  const [selectedOrder, setSelectedOrder] = useState<PathologyIpdOrder | null>(null);

  const filteredOrders = useMemo(() => orders.filter((order) => {
    const query = filters.search.trim().toLowerCase();
    const matchesSearch = !query || [order.id, order.ipdId, order.patient.name, order.patient.uhid, order.patient.ward, order.patient.bed].join(" ").toLowerCase().includes(query);
    const matchesDate = !filters.date || dateToIso(order.orderedAt) === filters.date;
    const matchesDoctor = !filters.doctor || order.doctor.name === filters.doctor;
    const matchesCategory = !filters.category || order.tests.some((test) => test.category === filters.category);
    const matchesStatus = filters.status === "All" || getIpdAggregateStatus(order) === filters.status || order.tests.some((test) => test.status === filters.status);
    const matchesUrgency = filters.urgency === "All" || (filters.urgency === "Urgent" ? hasUrgentTest(order) : !hasUrgentTest(order));
    const matchesPayment = filters.paymentStatus === "All" || order.paymentStatus === filters.paymentStatus;
    return matchesSearch && matchesDate && matchesDoctor && matchesCategory && matchesStatus && matchesUrgency && matchesPayment;
  }), [orders, filters]);

  const stats = useMemo(() => {
    const totalIncome = orders.filter((order) => order.paymentStatus === "Paid").reduce((sum, order) => sum + getTotalIpdTestValue(order), 0);
    const totalTests = orders.reduce((sum, order) => sum + order.tests.length, 0);
    const reportsReady = orders.reduce((sum, order) => sum + order.tests.filter((test) => test.status === "Report Ready").length, 0);
    const pendingTests = orders.reduce((sum, order) => sum + order.tests.filter((test) => test.status !== "Report Ready").length, 0);
    const urgentOrders = orders.filter((order) => hasUrgentTest(order)).length;
    const billsSentToDept = orders.filter((order) => Boolean(order.billSentToBillingDeptAt)).length;
    return { totalIncome, totalOrders: orders.length, totalTests, reportsReady, pendingTests, urgentOrders, billsSentToDept };
  }, [orders]);

  function updateFilter<K extends keyof PathologyIpdOrderFilters>(key: K, value: PathologyIpdOrderFilters[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function updateTest(orderId: string, updatedTest: PathologyIpdTestItem) {
    setOrders((previous) => previous.map((order) => order.id === orderId ? { ...order, tests: order.tests.map((test) => test.id === updatedTest.id ? updatedTest : test) } : order));
    setSelectedOrder((previous) => previous?.id === orderId ? { ...previous, tests: previous.tests.map((test) => test.id === updatedTest.id ? updatedTest : test) } : previous);
    toast.success(updatedTest.status === "Report Ready" ? `${updatedTest.testName} report finalized and locked.` : `${updatedTest.testName} status updated to ${updatedTest.status}.`);
  }

  function collectPayment(orderId: string, method: PathologyPaymentMethod) {
    const timestamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const current = orders.find((order) => order.id === orderId);
    setOrders((previous) => previous.map((order) => order.id === orderId ? { ...order, paymentStatus: "Paid", paymentMethod: method, paidAt: timestamp } : order));
    setSelectedOrder(null);
    toast.success(`Payment collected successfully from ${current?.patient.name ?? "patient"}.`);
  }

  function sendToBillingDept(orderId: string) {
    const timestamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const current = orders.find((order) => order.id === orderId);
    setOrders((previous) => previous.map((order) => order.id === orderId ? { ...order, billSentToBillingDeptAt: timestamp } : order));
    setSelectedOrder(null);
    toast.success(`Reports delivered for ${current?.patient.name ?? "patient"}. Bill sent to ICU Billing Department.`);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Pathology ICU Orders</h1>
              <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">Critical Care Queue</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Process ICU-based diagnostic tests, finalize reports, and manage direct or department billing.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            <AlertTriangle className="h-4 w-4" />
            {stats.urgentOrders} urgent order{stats.urgentOrders !== 1 ? "s" : ""}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <PathologyIpdStat icon={<IndianRupee className="h-5 w-5" />} label="Total Pathology Income" value={`₹${stats.totalIncome}`} subtitle="Directly collected payments" tone="emerald" />
          <PathologyIpdStat icon={<ReceiptText className="h-5 w-5" />} label="Total ICU Orders" value={String(stats.totalOrders)} subtitle={`${stats.totalTests} ordered tests`} tone="blue" />
          <PathologyIpdStat icon={<CheckCircle2 className="h-5 w-5" />} label="Reports Ready" value={String(stats.reportsReady)} subtitle="Finalized laboratory reports" tone="violet" />
          <PathologyIpdStat icon={<Clock3 className="h-5 w-5" />} label="Pending / Billed to Dept." value={`${stats.pendingTests} / ${stats.billsSentToDept}`} subtitle="Tests pending / bills sent to billing dept." tone="amber" />
        </div>

        <PathologyICUFilters filters={filters} results={filteredOrders.length} doctors={PATHOLOGY_ICU_DOCTORS} categories={PATHOLOGY_ICU_CATEGORIES} onChange={updateFilter} onReset={() => setFilters(initialFilters)} />

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-800">{filteredOrders.length}</span> pathology ICU order{filteredOrders.length !== 1 ? "s" : ""}</p>
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button type="button" onClick={() => setView("list")} className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === "list" ? "bg-violet-50 text-violet-700" : "text-slate-500"}`}>
              <LayoutList className="inline h-4 w-4" /> <span className="hidden sm:inline">List</span>
            </button>
            <button type="button" onClick={() => setView("grid")} className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === "grid" ? "bg-violet-50 text-violet-700" : "text-slate-500"}`}>
              <Grid2X2 className="inline h-4 w-4" /> <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        {view === "list" ? (
          <PathologyIpdOrdersList orders={filteredOrders} onView={setSelectedOrder} />
        ) : (
          <PathologyIpdOrdersGrid orders={filteredOrders} onView={setSelectedOrder} />
        )}

        <PathologyIpdOrderDetailDrawer
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