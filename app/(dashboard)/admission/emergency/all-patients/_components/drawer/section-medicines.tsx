// app/(dashboard)/admission-desk/emergency/all-patients/_components/drawer/section-medicines.tsx
"use client";
import { useMemo, useState } from "react";
import { PackageX, Pill, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MedicineDose } from "@/types/emergency/emergency-types";
import { DateFilterBar } from "./date-filter-bar";
import { DoseStatusBadge } from "../emergency-badges";
import { Button } from "@/components/ui/button";

export function SectionMedicines({
  doses,
  onUpdateStatus,
}: {
  doses: MedicineDose[];
  onUpdateStatus?: (
    medicineId: string,
    medicineName: string,
    instructions: string,
  ) => void;
}) {
  const [date, setDate] = useState("");
  const todayIso = new Date().toISOString().slice(0, 10);
  const filtered = useMemo(
    () => (date ? doses.filter((d) => d.date === date) : doses),
    [doses, date],
  );
  const outOfStock = filtered.filter((d) => d.status === "Out of Stock");

  const groupedByDate = useMemo(() => {
    const map = new Map<string, MedicineDose[]>();
    filtered.forEach((d) => {
      const rows = map.get(d.date) ?? [];
      rows.push(d);
      map.set(d.date, rows);
    });
    return Array.from(map.entries()).sort((a, b) => {
      if (a[0] === todayIso) return -1;
      if (b[0] === todayIso) return 1;
      return b[0].localeCompare(a[0]);
    });
  }, [filtered, todayIso]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Pill className="h-4 w-4 text-blue-600" />
          Medicine Administration
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Today's and previous days' medicine, given/not given, out-of-stock,
          and pharmacy delivery timing.
        </p>
        <div className="mt-3">
          <DateFilterBar
            value={date}
            onChange={setDate}
            label="Filter medicines by date"
          />
        </div>
      </div>

      {outOfStock.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-red-800">
            <PackageX className="h-4 w-4" />
            {outOfStock.length} medicine(s) out of stock
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {outOfStock.map((d) => (
              <Badge
                key={d.id}
                variant="outline"
                className="border-red-200 bg-white text-red-700"
              >
                {d.medicineName} · {d.date}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {groupedByDate.map(([groupDate, rows]) => {
          const isToday = groupDate === todayIso;
          return (
            <div
              key={groupDate}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-800">
                  {isToday
                    ? "Today"
                    : new Date(`${groupDate}T12:00:00`).toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                  {isToday && (
                    <Badge
                      variant="outline"
                      className="ml-2 border-blue-200 bg-blue-50 text-blue-700"
                    >
                      Today
                    </Badge>
                  )}
                </p>
                <span className="text-xs text-slate-500">
                  {rows.length} dose{rows.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400">
                      <th className="py-2 pr-4">Medicine</th>
                      <th className="pr-4">Slot</th>
                      <th className="pr-4">Scheduled Time</th>
                      <th className="pr-4">Status</th>
                      <th className="pr-4">Pharmacy Delivery</th>
                      <th className="pr-4">Given By</th>
                      <th>Remarks</th>
                      {onUpdateStatus && <th className="py-2 pr-4">Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((dose) => (
                      <tr
                        key={dose.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="py-2.5 pr-4">
                          <p className="font-medium text-slate-800">
                            {dose.medicineName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {dose.strength} · {dose.route}
                          </p>
                        </td>
                        <td className="pr-4">
                          <Badge
                            variant="outline"
                            className="border-slate-200 bg-white text-slate-600"
                          >
                            {dose.slot}
                          </Badge>
                        </td>
                        <td className="pr-4 text-slate-600">
                          {dose.scheduledTime}
                        </td>
                        <td className="pr-4">
                          <DoseStatusBadge status={dose.status} />
                        </td>
                        <td className="pr-4 text-slate-600">
                          {dose.deliveredFromPharmacyAt ? (
                            <span className="flex items-center gap-1">
                              <Truck className="h-3 w-3 text-cyan-600" />
                              {dose.deliveredFromPharmacyAt}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="pr-4 text-slate-600">
                          {dose.givenBy
                            ? `${dose.givenBy} at ${dose.givenAt}`
                            : "—"}
                        </td>
                        <td className="text-slate-500">
                          {dose.outOfStockRemark ?? "—"}
                        </td>

                        {onUpdateStatus && (
                          <td className="pr-4">
                            {dose.status === "Pending" && (
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={() =>
                                  onUpdateStatus(
                                    dose.id,
                                    dose.medicineName,
                                    dose.instructions,
                                  )
                                }
                              >
                                Administer
                              </Button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        {groupedByDate.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            No medicine records found{date ? ` for ${date}` : ""}.
          </div>
        )}
      </div>
    </div>
  );
}
