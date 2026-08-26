// app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-order-drawer.tsx
"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  DailyDoseLog, PharmacyIpdMedicineItem, PharmacyIpdOrder, PharmacyPaymentMethod,
} from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";
import { getAdmittedDays, getBalanceDueValue, getMedicinesGrossValue } from "@/lib/pharmacy/ipd/pharmacy-ipd-order-data";
import { TabTodaysOrders } from "./tab-todays-orders";
import { TabPreviousDays } from "./tab-previous-days";
import { TabReturns } from "./tab-returns";
import { TabBilling } from "./tab-billing";
import { TabAudit } from "./tab-audit";

interface Props {
  order: PharmacyIpdOrder | null;
  onClose: () => void;
  onSelectBatch: (orderId: string, medicine: PharmacyIpdMedicineItem, batchId: string) => void;
  onDeliverDose: (orderId: string, medicine: PharmacyIpdMedicineItem, log: DailyDoseLog, qty: number) => void;
  onNotifyDoctor: (orderId: string, medicine: PharmacyIpdMedicineItem, log: DailyDoseLog) => void;
  onAddPayments: (orderId: string, lines: Array<{ method: PharmacyPaymentMethod; amount: number }>) => void;
  onAddDiscount: (orderId: string, percentage: number, amount: number, reason: string) => void;
  onSendToBillingDept: (orderId: string) => void;
}

export function PharmacyIpdOrderDrawer({ order, onClose, onSelectBatch, onDeliverDose, onNotifyDoctor, onAddPayments, onAddDiscount, onSendToBillingDept }: Props) {
  const [tab, setTab] = useState("today");
  if (!order) return null;
  const selectedOrder = order;

  const pendingToday = selectedOrder.medicines.reduce((sum, medicine) => sum + medicine.dailyLogs.filter((log) => log.date === "21 Aug 2026" && log.status === "Pending").length, 0);
  const orderedToday = selectedOrder.medicines.reduce((sum, medicine) => sum + medicine.dailyLogs.filter((log) => log.date === "21 Aug 2026").length, 0);
  const balanceDue = getBalanceDueValue(selectedOrder);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-4xl overflow-hidden bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          <header className="border-b border-slate-200 bg-white px-5 py-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-violet-600">IPD Patient Medication Workspace</p>
                <h2 className="mt-0.5 text-xl font-bold text-slate-800">{selectedOrder.patientName} · {selectedOrder.bed}</h2>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedOrder.uhid} · {selectedOrder.ipdId} · {selectedOrder.department} · LOS {getAdmittedDays(selectedOrder.admissionDate)} days · {selectedOrder.orderingDoctor}
                </p>
              </div>
              <Button variant="outline" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:grid-cols-4">
              <Info label="Diagnosis" value={selectedOrder.diagnosis} />
              <Info label="Allergy" value={selectedOrder.allergy} tone="emerald" />
              <Info label="Today's Medicines" value={`${orderedToday} ordered · ${pendingToday} pending`} />
              <Info label="Billing" value={`₹${balanceDue.toFixed(2)} due`} tone={balanceDue > 0 ? "amber" : "emerald"} />
            </div>
          </header>

          <Tabs value={tab} onValueChange={setTab} className="flex flex-1 flex-col overflow-hidden">
            <TabsList className="justify-start rounded-none border-b border-slate-200 bg-white px-5">
              <TabsTrigger value="today">Today&apos;s orders</TabsTrigger>
              <TabsTrigger value="previous">Previous days</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="audit">Audit</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-5">
              <TabsContent value="today" className="mt-0">
                <TabTodaysOrders
                  order={selectedOrder}
                  onSelectBatch={(medicine, batchId) => onSelectBatch(selectedOrder.id, medicine, batchId)}
                  onDeliverDose={(medicine, log, qty) => onDeliverDose(selectedOrder.id, medicine, log, qty)}
                  onNotifyDoctor={(medicine, log) => onNotifyDoctor(selectedOrder.id, medicine, log)}
                />
              </TabsContent>
              <TabsContent value="previous" className="mt-0">
                <TabPreviousDays order={selectedOrder} />
              </TabsContent>
              <TabsContent value="returns" className="mt-0">
                <TabReturns order={selectedOrder} />
              </TabsContent>
              <TabsContent value="billing" className="mt-0">
                <TabBilling
                  order={selectedOrder}
                  onAddPayments={(lines) => onAddPayments(selectedOrder.id, lines)}
                  onAddDiscount={(percentage, amount, reason) => onAddDiscount(selectedOrder.id, percentage, amount, reason)}
                  onSendToBillingDept={() => onSendToBillingDept(selectedOrder.id)}
                />
              </TabsContent>
              <TabsContent value="audit" className="mt-0">
                <TabAudit order={selectedOrder} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </aside>
    </div>
  );
}

function Info({ label, value, tone }: { label: string; value: string; tone?: "emerald" | "amber" }) {
  const toneClass = tone === "emerald" ? "text-emerald-700" : tone === "amber" ? "text-amber-700" : "text-slate-800";
  return (
    <div>
      <p className="text-[10px] uppercase text-slate-400">{label}</p>
      <p className={`mt-0.5 text-sm font-bold ${toneClass}`}>{value}</p>
    </div>
  );
}