// app/(dashboard)/doctor/icu/patients/[uhid]/_components/tab-oxygen-therapy.tsx
"use client";
import { Wind, Clock, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OxygenAdministration, OxygenObservation, OxygenOrder } from "@/types/nurse/icu/oxygen-therapy-types";
import { formatDeviceSettings } from "@/app/(dashboard)/nurse/icu/patients/[uhid]/_components/oxygen-device-fields";
import { OxygenOrderHistory } from "@/app/(dashboard)/nurse/icu/patients/[uhid]/_components/oxygen-order-history";

export function TabOxygenTherapy({
  patientName,
  activeOrder,
  orderHistory,
  administration,
  observations,
  onCreateOrder,
}: {
  patientName: string;
  activeOrder?: OxygenOrder;
  orderHistory: OxygenOrder[];
  administration?: OxygenAdministration;
  observations: OxygenObservation[];
  onCreateOrder: () => void;
}) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Oxygen Therapy</h3>
          <p className="text-sm text-slate-500">{patientName}</p>
        </div>
        <button
          onClick={onCreateOrder}
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
        >
          {activeOrder ? "Modify Order" : "Create Oxygen Order"}
        </button>
      </div>

      {/* Active Order */}
      {activeOrder ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Wind className="mt-1 h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm font-semibold uppercase text-amber-700">Active Oxygen Order</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{formatDeviceSettings(activeOrder.settings)}</p>
                <p className="mt-1 text-xs text-slate-600">
                  Target SpO₂: {activeOrder.targetSpo2Min}–{activeOrder.targetSpo2Max}%
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Ordered by {activeOrder.orderedBy} ({activeOrder.orderedByRole}) · {activeOrder.orderedAt}
                </p>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active</Badge>
          </div>

          {activeOrder.specialInstructions && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-white p-3">
              <p className="text-xs font-semibold text-amber-800">Special Instructions</p>
              <p className="mt-1 text-sm text-slate-700">{activeOrder.specialInstructions}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <Wind className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-3 text-sm font-semibold text-slate-700">No Active Oxygen Order</p>
          <p className="mt-1 text-xs text-slate-500">Click "Create Oxygen Order" to initiate oxygen therapy.</p>
        </div>
      )}

      {/* Administration Status */}
      {administration && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-semibold text-slate-800">Oxygen Therapy Started</p>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Started by {administration.startedBy} at {administration.startedAt}
          </p>
        </div>
      )}

      {/* Observations Timeline */}
      {observations.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-slate-600" />
            <p className="text-sm font-semibold text-slate-800">Oxygen Therapy Observations</p>
          </div>
          <div className="mt-4 space-y-3">
            {observations.map((obs, idx) => (
              <div key={obs.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  {idx < observations.length - 1 && <div className="mt-1 h-full w-0.5 bg-slate-200" />}
                </div>
                <div className="min-w-0 flex-1 pb-4">
                  <p className="text-xs font-semibold text-slate-500">{obs.recordedAt}</p>
                  <div className="mt-1 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-600">
                        <span className="font-semibold">SpO₂:</span> {obs.spo2}%
                      </p>
                      <p className="text-slate-600">
                        <span className="font-semibold">RR:</span> {obs.respiratoryRate}/min
                      </p>
                      <p className="text-slate-600">
                        <span className="font-semibold">HR:</span> {obs.heartRate}/min
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">
                        <span className="font-semibold">Condition:</span> {obs.patientCondition}
                      </p>
                      <p className="text-slate-600">
                        <span className="font-semibold">Response:</span> {obs.oxygenResponse}
                      </p>
                    </div>
                  </div>
                  {obs.remarks && (
                    <p className="mt-2 text-xs italic text-slate-600">Note: {obs.remarks}</p>
                  )}
                  {obs.belowTarget && (
                    <div className="mt-2 rounded bg-red-50 p-2 text-xs text-red-700">
                      ⚠️ SpO₂ below target · {obs.doctorNotified ? "Doctor notified" : "Requires escalation"}
                    </div>
                  )}
                  <p className="mt-1 text-xs text-slate-400">Recorded by {obs.recordedBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order History */}
      {orderHistory.length > 0 && (
        <OxygenOrderHistory orders={orderHistory} />
      )}
    </div>
  );
}