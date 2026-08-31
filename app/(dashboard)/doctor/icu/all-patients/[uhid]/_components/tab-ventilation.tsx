// app/(dashboard)/doctor/icu/patients/[uhid]/_components/tab-ventilation.tsx
"use client";
import { Wind, Clock, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VentilatorOrder, VentilatorAdministration, VentilatorObservation } from "@/types/nurse/icu/ventilation-types";
import { formatVentilatorSettings } from "@/app/(dashboard)/nurse/icu/patients/[uhid]/_components/ventilator-mode-fields";
import { VentilatorOrderHistory } from "@/app/(dashboard)/nurse/icu/patients/[uhid]/_components/ventilator-order-history";

export function TabVentilation({
  patientName,
  activeOrder,
  orderHistory,
  administration,
  observations,
  onCreateOrder,
}: {
  patientName: string;
  activeOrder?: VentilatorOrder;
  orderHistory: VentilatorOrder[];
  administration?: VentilatorAdministration;
  observations: VentilatorObservation[];
  onCreateOrder: () => void;
}) {
  // Helper to get ventilator parameter
  const getVentParam = (obs: VentilatorObservation, key: string, defaultValue: string = "N/A") => {
    return String(obs.ventilatorParameters?.[key] ?? defaultValue);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Mechanical Ventilation</h3>
          <p className="text-sm text-slate-500">{patientName}</p>
        </div>
        <button
          onClick={onCreateOrder}
          className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
        >
          {activeOrder ? "Modify Order" : "Create Ventilator Order"}
        </button>
      </div>

      {/* Active Order */}
      {activeOrder ? (
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Wind className="mt-1 h-5 w-5 text-cyan-600" />
              <div>
                <p className="text-sm font-semibold uppercase text-cyan-700">Active Ventilator Order</p>
                <p className="mt-1 text-sm text-cyan-900">
                  {activeOrder.ventilationType} · {activeOrder.mode}
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {formatVentilatorSettings(activeOrder.mode, activeOrder.prescribedSettings)}
                </p>
                {activeOrder.oxygenationTarget && (
                  <p className="mt-1 text-xs text-slate-600">Target: {activeOrder.oxygenationTarget}</p>
                )}
                {activeOrder.ventilationTarget && (
                  <p className="mt-1 text-xs text-slate-600">Target: {activeOrder.ventilationTarget}</p>
                )}
                <p className="mt-2 text-xs text-slate-500">
                  Ordered by {activeOrder.orderedBy} ({activeOrder.orderedByRole}) · {activeOrder.orderedAt}
                </p>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active</Badge>
          </div>

          {activeOrder.specialInstructions && (
            <div className="mt-4 rounded-lg border border-cyan-200 bg-white p-3">
              <p className="text-xs font-semibold text-cyan-800">Special Instructions</p>
              <p className="mt-1 text-sm text-slate-700">{activeOrder.specialInstructions}</p>
            </div>
          )}

          {activeOrder.weaningPlan && (
            <div className="mt-3 rounded-lg border border-cyan-200 bg-white p-3">
              <p className="text-xs font-semibold text-cyan-800">Weaning Plan</p>
              <p className="mt-1 text-sm text-slate-700">
                {activeOrder.weaningPlan}
                {activeOrder.weaningPlanOther && `: ${activeOrder.weaningPlanOther}`}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <Wind className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-3 text-sm font-semibold text-slate-700">No Active Ventilator Order</p>
          <p className="mt-1 text-xs text-slate-500">Click "Create Ventilator Order" to initiate mechanical ventilation.</p>
        </div>
      )}

      {/* Administration Status */}
      {administration && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-semibold text-slate-800">Ventilator Setup Confirmed</p>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Confirmed by {administration.confirmedBy} at {administration.confirmedAt}
          </p>
        </div>
      )}

      {/* Observations Timeline */}
      {observations.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-slate-600" />
            <p className="text-sm font-semibold text-slate-800">Ventilation Observations</p>
          </div>
          <div className="mt-4 space-y-3">
            {observations.map((obs, idx) => (
              <div key={obs.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  {idx < observations.length - 1 && <div className="mt-1 h-full w-0.5 bg-slate-200" />}
                </div>
                <div className="min-w-0 flex-1 pb-4">
                  <p className="text-xs font-semibold text-slate-500">{obs.recordedAt}</p>
                  <div className="mt-1 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-600">
                        <span className="font-semibold">RR:</span> {obs.respiratoryRate ?? "N/A"}/min
                      </p>
                      <p className="text-slate-600">
                        <span className="font-semibold">VT:</span> {getVentParam(obs, "tidalVolume")} mL
                      </p>
                      <p className="text-slate-600">
                        <span className="font-semibold">PEEP:</span> {getVentParam(obs, "peep")} cmH₂O
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">
                        <span className="font-semibold">FiO₂:</span> {getVentParam(obs, "fiO2")} %
                      </p>
                      <p className="text-slate-600">
                        <span className="font-semibold">SpO₂:</span> {obs.spo2 ?? "N/A"}%
                      </p>
                      <p className="text-slate-600">
                        <span className="font-semibold">BP:</span> {obs.bloodPressureSystolic && obs.bloodPressureDiastolic ? `${obs.bloodPressureSystolic}/${obs.bloodPressureDiastolic}` : "N/A"}
                      </p>
                    </div>
                  </div>
                  {obs.remarks && (
                    <p className="mt-2 text-xs italic text-slate-600">Note: {obs.remarks}</p>
                  )}
                  {obs.hasDifference && (
                    <div className="mt-2 rounded bg-amber-50 p-2 text-xs text-amber-700">
                      ⚠️ Difference from order · {obs.doctorNotified ? "Doctor notified" : "Requires review"}
                    </div>
                  )}
                  <p className="mt-1 text-xs text-slate-400">
                    Recorded by {obs.recordedBy} · Status: {obs.patientStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order History */}
      {orderHistory.length > 0 && (
        <VentilatorOrderHistory orders={orderHistory} />
      )}
    </div>
  );
}