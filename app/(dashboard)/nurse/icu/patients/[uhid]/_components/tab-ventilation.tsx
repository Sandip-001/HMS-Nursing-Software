// app/(dashboard)/nurse/icu/patients/[uhid]/_components/tab-ventilation.tsx
"use client";
import { useState } from "react";
import { Plus, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VentilatorAdministration, VentilatorObservation, VentilatorOrder } from "@/types/nurse/icu/ventilation-types";
import { VentilatorActiveOrderCard } from "./ventilator-active-order-card";
import { VentilatorObservationForm } from "./ventilator-observation-form";
import { VentilatorMonitoringTimeline } from "./ventilator-monitoring-timeline";
import { VentilatorOrderHistory } from "./ventilator-order-history";


export function TabVentilation({
  patientName, nurseName, activeOrder, orderHistory, administration, observations,
  onConfirmSetup, onSaveObservation,
}: {
  patientName: string;
  nurseName: string;
  activeOrder?: VentilatorOrder;
  orderHistory: VentilatorOrder[];
  administration?: VentilatorAdministration;
  observations: VentilatorObservation[];
  onConfirmSetup: (administration: VentilatorAdministration) => void;
  onSaveObservation: (observation: VentilatorObservation) => void;
}) {
  const [addingObservation, setAddingObservation] = useState(false);

  if (!activeOrder) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
        <Wind className="mx-auto h-12 w-12 text-slate-300" />
        <p className="mt-4 text-sm font-semibold text-slate-600">No active mechanical ventilation order</p>
        <p className="mt-1 text-xs text-slate-400">Doctor/RMO has not placed a ventilator order for this patient yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <VentilatorActiveOrderCard order={activeOrder} administration={administration} nurseName={nurseName} onConfirmSetup={onConfirmSetup} />

      {administration?.isActive && (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
          <div>
            <p className="text-sm font-bold text-slate-800">Ventilator Monitoring</p>
            <p className="text-xs text-slate-500">Record ventilator and patient observations as per monitoring schedule.</p>
          </div>
          <Button className="gap-2 bg-cyan-600 hover:bg-cyan-700" onClick={() => setAddingObservation(true)}>
            <Plus className="h-4 w-4" />Add Ventilator Observation
          </Button>
        </div>
      )}

      <div>
        <p className="mb-3 text-sm font-bold text-slate-800">Monitoring Timeline</p>
        <VentilatorMonitoringTimeline observations={observations} orders={orderHistory} />
      </div>

      {orderHistory.length > 1 && <VentilatorOrderHistory orders={orderHistory} />}

      {addingObservation && administration && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40" onClick={() => setAddingObservation(false)} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <VentilatorObservationForm
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