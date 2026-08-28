// app/(dashboard)/pharmacy/ipd/orders/_components/tab-todays-orders.tsx
"use client";
import { useMemo, useState } from "react";
import { AlertTriangle, Bell, CalendarDays, PackageX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type {
  DailyDoseLog, DoseSlot, PharmacyIpdMedicineItem, PharmacyIpdOrder,
} from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";
import { getDefaultBatch, getMedicineStockStatus } from "@/lib/pharmacy/ipd/pharmacy-ipd-order-data";
import { DailyStatusBadge, UrgencyBadge } from "./pharmacy-ipd-badges";


const SLOT_ORDER: DoseSlot[] = ["Morning", "Afternoon", "Evening", "Night"];

function getTodayLabel() {
  const now = new Date();
  return now.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function getTodayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function dateToIso(value: string) {
  const dateText = value.split(",")[0]?.trim();
  if (!dateText) return "";
  const date = new Date(`${dateText} 12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

interface Props {
  order: PharmacyIpdOrder;
  onSelectBatch: (medicine: PharmacyIpdMedicineItem, batchId: string) => void;
  onDeliverDose: (medicine: PharmacyIpdMedicineItem, log: DailyDoseLog, qty: number) => void;
  onNotifyDoctor: (medicine: PharmacyIpdMedicineItem, log: DailyDoseLog) => void;
}


export function TabTodaysOrders({ order, onSelectBatch, onDeliverDose, onNotifyDoctor }: Props) {
  const [slotFilter, setSlotFilter] = useState<"All" | DoseSlot>("All");
  const todayLabel = getTodayLabel();
  const todayIso = getTodayIso();

  const sortedMedicines = useMemo(() => {
    return [...order.medicines].sort((a, b) => {
      if (a.urgency === b.urgency) return 0;
      return a.urgency === "Urgent" ? -1 : 1;
    });
  }, [order.medicines]);


  const todaysRows = useMemo(() => {
    return sortedMedicines.flatMap((medicine) =>
      medicine.dailyLogs
        .filter((log) => dateToIso(log.date) === todayIso)
        .filter((log) => slotFilter === "All" || log.slot === slotFilter)
        .map((log) => ({ medicine, log })),
    );
  }, [sortedMedicines, slotFilter, todayIso]);


  const pendingCount = todaysRows.filter((row) => row.log.status === "Pending").length;
  const doseCount = todaysRows.length;


  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><CalendarDays className="h-4 w-4 text-blue-600" />Today · {todayLabel}</p>
          <p className="mt-0.5 text-xs text-slate-500">{doseCount} dose(s) scheduled today · {pendingCount} pending</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {(["All", ...SLOT_ORDER] as const).map((slot) => (
            <button
              key={slot}
              onClick={() => setSlotFilter(slot)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${slotFilter === slot ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>


      <div className="space-y-3">
        {todaysRows.map(({ medicine, log }) => (
          <TodayDoseRow key={log.id} medicine={medicine} log={log} onSelectBatch={onSelectBatch} onDeliverDose={onDeliverDose} onNotifyDoctor={onNotifyDoctor} />
        ))}
        {todaysRows.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            No doses scheduled for the selected slot today.
          </div>
        )}
      </div>
    </div>
  );
}


function TodayDoseRow({ medicine, log, onSelectBatch, onDeliverDose, onNotifyDoctor }: {
  medicine: PharmacyIpdMedicineItem;
  log: DailyDoseLog;
  onSelectBatch: (medicine: PharmacyIpdMedicineItem, batchId: string) => void;
  onDeliverDose: (medicine: PharmacyIpdMedicineItem, log: DailyDoseLog, qty: number) => void;
  onNotifyDoctor: (medicine: PharmacyIpdMedicineItem, log: DailyDoseLog) => void;
}) {
  const stockStatus = getMedicineStockStatus(medicine);
  const defaultBatch = getDefaultBatch(medicine);
  const activeBatch = medicine.batches.find((batch) => batch.id === medicine.selectedBatchId) ?? defaultBatch;
  const isPending = log.status === "Pending";
  const canDeliverFull = isPending && Boolean(activeBatch) && (activeBatch?.availableQuantity ?? 0) >= log.orderedQtyForDose;
  const canDeliverPartial = isPending && Boolean(activeBatch) && (activeBatch?.availableQuantity ?? 0) > 0 && (activeBatch?.availableQuantity ?? 0) < log.orderedQtyForDose;
  const noStock = (isPending || log.status === "Out of Stock") && (!activeBatch || activeBatch.availableQuantity === 0);
  const twoOrMoreDosesToday = medicine.slots.length > 1;


  return (
    <div className={`rounded-xl border p-4 ${medicine.urgency === "Urgent" ? "border-red-200 bg-red-50/30" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-slate-200 bg-slate-100 text-slate-600">{log.slot}</Badge>
            <p className="font-bold text-slate-800">{medicine.medicineName}</p>
            <UrgencyBadge urgency={medicine.urgency} />
            {twoOrMoreDosesToday && (
              <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700">
                {medicine.slots.length}x today ({medicine.slots.join(" + ")})
              </Badge>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500">{medicine.strength} · {medicine.frequency} · {medicine.route} · {medicine.instructions}</p>
          <p className="mt-1 text-xs text-slate-400">Qty required this dose: <span className="font-semibold text-slate-600">{log.orderedQtyForDose}</span></p>
        </div>
        <DailyStatusBadge status={log.status} />
      </div>


      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 md:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-medium text-slate-500">Batch (FEFO — nearest expiry auto-selected)</p>
          <Select value={activeBatch?.id ?? ""} onValueChange={(value) => onSelectBatch(medicine, value)}>
            <SelectTrigger><SelectValue placeholder="No stock batch" /></SelectTrigger>
            <SelectContent>
              {medicine.batches.map((batch) => (
                <SelectItem key={batch.id} value={batch.id} disabled={batch.availableQuantity === 0}>
                  Batch {batch.batchNumber} · Stock {batch.availableQuantity} · ₹{batch.unitPrice} · Exp {batch.expiryDate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Mini label="Stock" value={activeBatch ? String(activeBatch.availableQuantity) : "0"} />
          <Mini label="Price" value={activeBatch ? `₹${activeBatch.unitPrice}` : "—"} />
          <Mini label="Rack/Shelf" value={activeBatch ? `${activeBatch.rackNumber}/${activeBatch.shelfNumber}` : "—"} />
        </div>
      </div>


      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <div className="text-xs text-slate-400">
          {log.deliveredBy && <span>Delivered by {log.deliveredBy} · {log.deliveredAt}</span>}
          {log.wardReceivedAt && <span> · Ward received {log.wardReceivedAt}</span>}
          {log.remarks && <span className="italic"> · {log.remarks}</span>}
        </div>
        <div className="flex items-center gap-2">
          {!isPending && <p className="text-sm font-bold text-slate-800">₹{log.amount.toFixed(2)}</p>}
          {canDeliverFull && <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => onDeliverDose(medicine, log, log.orderedQtyForDose)}>Mark Delivered & Send to Ward</Button>}
          {canDeliverPartial && activeBatch && <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50" onClick={() => onDeliverDose(medicine, log, activeBatch.availableQuantity)}>Add Available ({activeBatch.availableQuantity})</Button>}
          {noStock && (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-red-600"><PackageX className="h-3.5 w-3.5" />Excluded from bill</span>
              {!log.doctorNotified ? (
                <Button size="sm" variant="outline" className="gap-1 border-red-300 text-red-700 hover:bg-red-50" onClick={() => onNotifyDoctor(medicine, log)}>
                  <Bell className="h-3.5 w-3.5" />Notify Doctor/Nurse
                </Button>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-700"><AlertTriangle className="h-3 w-3" />Doctor notified {log.doctorNotifiedAt}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2 text-center">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-slate-700">{value}</p>
    </div>
  );
}