// app/(dashboard)/nurse/icu/patients/[uhid]/_components/tab-oxygen-therapy.tsx
"use client";
import { useState } from "react";
import { Plus, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OxygenAdministration, OxygenObservation, OxygenOrder } from "@/types/nurse/icu/oxygen-therapy-types";
import { OxygenActiveOrderCard } from "./oxygen-active-order-card";
import { OxygenObservationForm } from "./oxygen-observation-form";
import { OxygenMonitoringTimeline } from "./oxygen-monitoring-timeline";
import { OxygenOrderHistory } from "./oxygen-order-history";

export function TabOxygenTherapy({
  patientName, nurseName, activeOrder, orderHistory, administration, observations,
  onStartOxygen, onSaveObservation,
}: {
  patientName: string;
  nurseName: string;
  activeOrder?: OxygenOrder;
  orderHistory: OxygenOrder[];
  administration?: OxygenAdministration;
  observations: OxygenObservation[];
  onStartOxygen: (administration: OxygenAdministration) => void;
  onSaveObservation: (observation: OxygenObservation) => void;
}) {
  const [addingObservation, setAddingObservation] = useState(false);

  if (!activeOrder) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
        <Wind className="mx-auto h-12 w-12 text-slate-300" />
        <p className="mt-4 text-sm font-semibold text-slate-600">No active oxygen therapy order</p>
        <p className="mt-1 text-xs text-slate-400">Doctor/RMO has not placed an oxygen order for this patient yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <OxygenActiveOrderCard order={activeOrder} administration={administration} nurseName={nurseName} onStartOxygen={onStartOxygen} />

      {administration?.isActive && (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
          <div>
            <p className="text-sm font-bold text-slate-800">Oxygen Monitoring</p>
            <p className="text-xs text-slate-500">Record patient observations as per monitoring schedule.</p>
          </div>
          <Button className="gap-2 bg-cyan-600 hover:bg-cyan-700" onClick={() => setAddingObservation(true)}>
            <Plus className="h-4 w-4" />Add Oxygen Observation
          </Button>
        </div>
      )}

      <div>
        <p className="mb-3 text-sm font-bold text-slate-800">Monitoring Timeline</p>
        <OxygenMonitoringTimeline observations={observations} orders={orderHistory} />
      </div>

      {orderHistory.length > 1 && <OxygenOrderHistory orders={orderHistory} />}

      {addingObservation && administration && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40" onClick={() => setAddingObservation(false)} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <OxygenObservationForm
              order={activeOrder}
              administration={administration}
              patientName={patientName}
              nurseName={nurseName}
              onSave={onSaveObservation}
              onClose={() => setAddingObservation(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}