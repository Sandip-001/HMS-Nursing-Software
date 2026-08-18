
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import type { PharmacyMedicineItem } from "@/types/pharmacy/ipd/pharmacy-order-types";

function getMedicineBillingInfo(med: PharmacyMedicineItem) {
  const isOutOfStock = med.stockAvailable === 0;
  const isPartial = med.stockAvailable > 0 && med.stockAvailable < med.orderedQty;

  // Reference amount: always shown so pharmacy can check pricing, regardless of stock
  const referenceQty = isOutOfStock || isPartial ? med.orderedQty : med.orderedQty;
  const referenceAmount = referenceQty * med.pricePerUnit;

  // Amount actually counted in the running total
  let countedQty = 0;
  if (isOutOfStock) {
    countedQty = 0;
  } else if (isPartial) {
    countedQty = med.includeAvailableStockOnly ? med.stockAvailable : 0;
  } else {
    countedQty = med.orderedQty;
  }
  const countedAmount = countedQty * med.pricePerUnit;

  const isIncludedInTotal = countedQty > 0;

  return { isOutOfStock, isPartial, referenceAmount, countedAmount, isIncludedInTotal };
}

export function OrderMedicinesTable({
  medicines,
  onIncludeAvailableStock,
}: {
  medicines: PharmacyMedicineItem[];
  onIncludeAvailableStock: (medicineId: string) => void;
}) {
  return (
    <>
      {/* Desktop / tablet-landscape table view */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-100 md:block">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-3 py-2.5 font-medium">Medicine</th>
              <th className="px-3 py-2.5 font-medium">Strength</th>
              <th className="px-3 py-2.5 font-medium">Frequency</th>
              <th className="px-3 py-2.5 font-medium">Duration</th>
              <th className="px-3 py-2.5 font-medium">Route</th>
              <th className="px-3 py-2.5 font-medium">Order Qty</th>
              <th className="px-3 py-2.5 font-medium">Stock</th>
              <th className="px-3 py-2.5 font-medium">Price/Unit</th>
              <th className="px-3 py-2.5 font-medium">Billable Amount</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => {
              const { isOutOfStock, isPartial, referenceAmount, countedAmount, isIncludedInTotal } = getMedicineBillingInfo(med);

              return (
                <tr key={med.id} className="border-t border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-800">{med.medicineName}</td>
                  <td className="px-3 py-3 text-slate-600">{med.strength}</td>
                  <td className="px-3 py-3 text-slate-600">{med.frequency}</td>
                  <td className="px-3 py-3 text-slate-600">{med.duration}</td>
                  <td className="px-3 py-3 text-slate-600">{med.route}</td>
                  <td className="px-3 py-3 text-slate-600">{med.orderedQty} pcs</td>
                  <td className="px-3 py-3">
                    {isOutOfStock ? (
                      <Badge className="bg-red-50 text-red-700">Out of Stock</Badge>
                    ) : isPartial ? (
                      <Badge className="bg-amber-50 text-amber-700">{med.stockAvailable} pcs Only</Badge>
                    ) : (
                      <Badge className="bg-emerald-50 text-emerald-700">{med.stockAvailable} pcs</Badge>
                    )}
                  </td>
                  <td className="px-3 py-3 text-slate-600">₹{med.pricePerUnit}</td>
                  <td className="px-3 py-3">
                    <div className={`font-semibold ${isIncludedInTotal ? "text-slate-800" : "text-slate-400 line-through decoration-slate-300"}`}>
                      ₹{referenceAmount}
                    </div>

                    {isIncludedInTotal && countedAmount !== referenceAmount && (
                      <div className="text-xs font-semibold text-emerald-600">
                        ₹{countedAmount} added to total
                      </div>
                    )}

                    {isPartial && (
                      med.includeAvailableStockOnly ? (
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Billing {med.stockAvailable} pcs
                        </span>
                      ) : (
                        <Button
                          variant="link"
                          className="h-auto p-0 text-xs text-blue-600"
                          onClick={() => onIncludeAvailableStock(med.id)}
                        >
                          Bill only {med.stockAvailable} pcs available?
                        </Button>
                      )
                    )}
                    {isOutOfStock && <p className="text-xs text-red-500">Not included in total</p>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet-portrait card view */}
      <div className="space-y-3 md:hidden">
        {medicines.map((med) => {
          const { isOutOfStock, isPartial, referenceAmount, countedAmount, isIncludedInTotal } = getMedicineBillingInfo(med);

          return (
            <div key={med.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{med.medicineName}</p>
                  <p className="text-xs text-slate-500">{med.strength}</p>
                </div>
                {isOutOfStock ? (
                  <Badge className="bg-red-50 text-red-700">Out of Stock</Badge>
                ) : isPartial ? (
                  <Badge className="bg-amber-50 text-amber-700">{med.stockAvailable} pcs Only</Badge>
                ) : (
                  <Badge className="bg-emerald-50 text-emerald-700">{med.stockAvailable} pcs</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-600">
                <div><span className="text-slate-400">Frequency:</span> {med.frequency}</div>
                <div><span className="text-slate-400">Duration:</span> {med.duration}</div>
                <div><span className="text-slate-400">Route:</span> {med.route}</div>
                <div><span className="text-slate-400">Order Qty:</span> {med.orderedQty} pcs</div>
                <div><span className="text-slate-400">Price/Unit:</span> ₹{med.pricePerUnit}</div>
                <div>
                  <span className="text-slate-400">Amount:</span>{" "}
                  <span className={`font-semibold ${isIncludedInTotal ? "text-slate-800" : "text-slate-400 line-through decoration-slate-300"}`}>
                    ₹{referenceAmount}
                  </span>
                </div>
              </div>

              {isIncludedInTotal && countedAmount !== referenceAmount && (
                <p className="mt-2 text-xs font-semibold text-emerald-600">₹{countedAmount} added to total</p>
              )}

              {isPartial && (
                <div className="mt-3 border-t border-slate-100 pt-3">
                  {med.includeAvailableStockOnly ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Billing {med.stockAvailable} pcs (confirmed)
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs text-blue-600"
                      onClick={() => onIncludeAvailableStock(med.id)}
                    >
                      Bill only {med.stockAvailable} pcs available?
                    </Button>
                  )}
                </div>
              )}
              {isOutOfStock && <p className="mt-2 text-xs text-red-500">Not included in total</p>}
            </div>
          );
        })}
      </div>
    </>
  );
}