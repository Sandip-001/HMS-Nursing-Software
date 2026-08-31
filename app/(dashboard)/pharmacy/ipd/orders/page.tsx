// app/(dashboard)/pharmacy/ipd/orders/page.tsx
"use client";
import { useMemo, useState } from "react";
import { AlertTriangle, CalendarClock, Grid2X2, IndianRupee, LayoutList, ReceiptText } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import type {
  DailyDoseLog, PharmacyIpdMedicineItem, PharmacyIpdOrder, PharmacyIpdOrderFilters, PharmacyPaymentMethod,
} from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";
import {
  CURRENT_PHARMACY_STAFF, PHARMACY_IPD_DOCTORS, PHARMACY_IPD_ORDERS, PHARMACY_IPD_WARDS,
  getBalanceDueValue, getDefaultBatch, getNetPayableValue, getTotalPaidValue,
} from "@/lib/pharmacy/ipd/pharmacy-ipd-order-data";
import { PharmacyIpdStat } from "./_components/pharmacy-ipd-stats";
import { PharmacyIpdFilters } from "./_components/pharmacy-ipd-filters";
import { PharmacyIpdOrdersGrid } from "./_components/pharmacy-ipd-orders-grid";
import { getPharmacyIpdColumns, defaultColumnVisibility } from "./_components/pharmacy-ipd-columns";
import { PharmacyIpdOrderDrawer } from "./_components/pharmacy-ipd-order-drawer";
import type { VisibilityState } from "@tanstack/react-table";
import { PharmacyIpdColumnToggle } from "./_components/pharmacy-ipd-column-toggle";

type ViewMode = "table" | "grid";
const initialFilters: PharmacyIpdOrderFilters = { search: "", date: "", doctor: "", ward: "", status: "All", paymentStatus: "All" };

function dateToIso(value: string) {
  const dateText = value.split(",")[0]?.trim();
  if (!dateText) return "";
  const date = new Date(`${dateText} 12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function hasUrgent(order: PharmacyIpdOrder) {
  return order.medicines.some((medicine) => medicine.urgency === "Urgent");
}

export default function PharmacyIpdOrdersPage() {
  const [orders, setOrders] = useState<PharmacyIpdOrder[]>(PHARMACY_IPD_ORDERS);
  const [filters, setFilters] = useState<PharmacyIpdOrderFilters>(initialFilters);
  const [view, setView] = useState<ViewMode>("table");
  const [selectedOrder, setSelectedOrder] = useState<PharmacyIpdOrder | null>(null);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultColumnVisibility);

  const filteredOrders = useMemo(() => orders.filter((order) => {
    const query = filters.search.trim().toLowerCase();
    const matchesSearch = !query || [order.id, order.ipdId, order.patientName, order.uhid, order.ward, order.bed].join(" ").toLowerCase().includes(query);
    const matchesDate = !filters.date || dateToIso(order.orderDateTime) === filters.date;
    const matchesDoctor = !filters.doctor || order.orderingDoctor === filters.doctor;
    const matchesWard = !filters.ward || order.ward === filters.ward;
    const matchesStatus = filters.status === "All" || order.status === filters.status;
    const matchesPayment = filters.paymentStatus === "All" || order.paymentStatus === filters.paymentStatus;
    return matchesSearch && matchesDate && matchesDoctor && matchesWard && matchesStatus && matchesPayment;
  }), [orders, filters]);

  const stats = useMemo(() => {
    const income = orders.reduce((sum, order) => sum + getTotalPaidValue(order), 0);
    const totalMedicines = orders.reduce((sum, order) => sum + order.medicines.length, 0);
    const urgentOrders = orders.filter(hasUrgent).length;
    const outstanding = orders.reduce((sum, order) => sum + getBalanceDueValue(order), 0);
    return { income, totalOrders: orders.length, totalMedicines, urgentOrders, outstanding };
  }, [orders]);

  function updateFilter<K extends keyof PharmacyIpdOrderFilters>(key: K, value: PharmacyIpdOrderFilters[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function syncSelected(orderId: string, updater: (order: PharmacyIpdOrder) => PharmacyIpdOrder) {
    setOrders((previous) => previous.map((order) => order.id === orderId ? updater(order) : order));
    setSelectedOrder((previous) => previous?.id === orderId ? updater(previous) : previous);
  }

  function handleSelectBatch(orderId: string, medicine: PharmacyIpdMedicineItem, batchId: string) {
    syncSelected(orderId, (order) => ({
      ...order,
      medicines: order.medicines.map((item) => item.id === medicine.id ? { ...item, selectedBatchId: batchId } : item),
    }));
  }

  function handleDeliverDose(orderId: string, medicine: PharmacyIpdMedicineItem, log: DailyDoseLog, qty: number) {
    const activeBatch = medicine.batches.find((batch) => batch.id === medicine.selectedBatchId) ?? getDefaultBatch(medicine);
    if (!activeBatch || activeBatch.availableQuantity <= 0) return;

    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const isFull = qty >= log.orderedQtyForDose;

    syncSelected(orderId, (order) => ({
      ...order,
      medicines: order.medicines.map((item) => {
        if (item.id !== medicine.id) return item;
        const updatedBatches = item.batches.map((batch) => batch.id === activeBatch.id ? { ...batch, availableQuantity: Math.max(0, batch.availableQuantity - qty) } : batch);
        const updatedLogs = item.dailyLogs.map((entry) => entry.id === log.id ? {
          ...entry,
          status: (isFull ? "Delivered" : "Partially Delivered") as DailyDoseLog["status"],
          deliveredQtyForDose: qty,
          batchNumberUsed: activeBatch.batchNumber,
          unitPriceUsed: activeBatch.unitPrice,
          amount: qty * activeBatch.unitPrice,
          deliveredBy: CURRENT_PHARMACY_STAFF.name,
          deliveredAt: stamp,
          wardReceivedAt: stamp,
        } : entry);
        return { ...item, batches: updatedBatches, dailyLogs: updatedLogs };
      }),
    }));
    toast.success(`${medicine.medicineName} (${log.slot}) marked delivered and sent to ward.`);
  }

  function handleNotifyDoctor(orderId: string, medicine: PharmacyIpdMedicineItem, log: DailyDoseLog) {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    syncSelected(orderId, (order) => ({
      ...order,
      medicines: order.medicines.map((item) => item.id === medicine.id ? {
        ...item,
        dailyLogs: item.dailyLogs.map((entry) => entry.id === log.id ? { ...entry, doctorNotified: true, doctorNotifiedAt: stamp } : entry),
      } : item),
    }));
    toast.success(`Doctor and nurse notified: ${medicine.medicineName} is out of stock.`);
  }

  function handleAddPayments(orderId: string, lines: Array<{ method: PharmacyPaymentMethod; amount: number }>) {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    syncSelected(orderId, (order) => {
      const newPayments = lines.map((line, index) => ({
        id: `PAY-${Date.now()}-${index}`,
        method: line.method,
        amount: line.amount,
        receivedOn: stamp,
        receivedBy: CURRENT_PHARMACY_STAFF.name,
      }));
      const updatedOrder = { ...order, payments: [...order.payments, ...newPayments] };
      const balance = getBalanceDueValue(updatedOrder);
      return { ...updatedOrder, paymentStatus: balance <= 0 ? "Paid" : "Partially Paid", status: balance <= 0 ? "Payment Received" : "Partially Paid" };
    });
    toast.success("Payment recorded successfully.");
  }

  function handleAddDiscount(orderId: string, percentage: number, amount: number, reason: string) {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    syncSelected(orderId, (order) => ({
      ...order,
      discounts: [...order.discounts, {
        id: `DIS-${Date.now()}`,
        percentage,
        amount,
        reason,
        givenBy: CURRENT_PHARMACY_STAFF.name,
        givenByRole: CURRENT_PHARMACY_STAFF.role,
        givenOn: stamp,
      }],
    }));
    toast.success(`${percentage}% discount (₹${amount.toFixed(2)}) applied by ${CURRENT_PHARMACY_STAFF.name}.`);
  }

  function handleSendToBillingDept(orderId: string) {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const current = orders.find((order) => order.id === orderId);
    syncSelected(orderId, (order) => ({ ...order, billSentToBillingDeptAt: stamp, status: "Billed to Department" }));
    toast.success(`Bill sent to IPD Billing Department for ${current?.patientName ?? "patient"}.`);
  }

  const columns = useMemo(() => getPharmacyIpdColumns(setSelectedOrder), []);
  const columnIds = useMemo(() => columns.map((column) => column.id as string).filter(Boolean), [columns]);

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Pharmacy IPD Orders</h1>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Inpatient Dispensing Queue</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Dispense recurring ward medicines, track day-wise delivery and billing, manage returns and payments.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            <AlertTriangle className="h-4 w-4" />{stats.urgentOrders} urgent order{stats.urgentOrders !== 1 ? "s" : ""}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <PharmacyIpdStat icon={<IndianRupee className="h-5 w-5" />} label="Total Collected" value={`₹${stats.income.toFixed(2)}`} subtitle="All recorded payments" tone="emerald" />
          <PharmacyIpdStat icon={<ReceiptText className="h-5 w-5" />} label="Total IPD Orders" value={String(stats.totalOrders)} subtitle={`${stats.totalMedicines} medicines ordered`} tone="blue" />
          <PharmacyIpdStat icon={<CalendarClock className="h-5 w-5" />} label="Outstanding Balance" value={`₹${stats.outstanding.toFixed(2)}`} subtitle="Across all active orders" tone="amber" />
          <PharmacyIpdStat icon={<AlertTriangle className="h-5 w-5" />} label="Urgent Orders" value={String(stats.urgentOrders)} subtitle="Contain at least one urgent medicine" tone="rose" />
        </div>

        <PharmacyIpdFilters name="IPD" filters={filters} results={filteredOrders.length} doctors={PHARMACY_IPD_DOCTORS} wards={PHARMACY_IPD_WARDS} onChange={updateFilter} onReset={() => setFilters(initialFilters)} />

       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <p className="min-w-0 shrink text-sm text-slate-500">
    Showing <span className="font-bold text-slate-800">{filteredOrders.length}</span> pharmacy IPD order{filteredOrders.length !== 1 ? "s" : ""}
  </p>

  <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
    {view === "table" && (
      <PharmacyIpdColumnToggle
        columnIds={columnIds}
        visibility={columnVisibility}
        onToggle={(id, visible) => setColumnVisibility((previous) => ({ ...previous, [id]: visible }))}
      />
    )}

    <div className="flex rounded-xl border border-slate-200 bg-white p-1">
      <button type="button" onClick={() => setView("table")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "table" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}>
        <LayoutList className="inline h-4 w-4" /> <span className="hidden sm:inline">Table</span>
      </button>
      <button type="button" onClick={() => setView("grid")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "grid" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}>
        <Grid2X2 className="inline h-4 w-4" /> <span className="hidden sm:inline">Grid</span>
      </button>
    </div>
  </div>
</div>

        {view === "table" ? (
          <DataTable columns={columns}
            data={filteredOrders}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            pageSize={8} />
        ) : (
          <PharmacyIpdOrdersGrid orders={filteredOrders} onView={setSelectedOrder} />
        )}

        <PharmacyIpdOrderDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onSelectBatch={handleSelectBatch}
          onDeliverDose={handleDeliverDose}
          onNotifyDoctor={handleNotifyDoctor}
          onAddPayments={handleAddPayments}
          onAddDiscount={handleAddDiscount}
          onSendToBillingDept={handleSendToBillingDept}
        />
      </div>
    </div>
  );
}