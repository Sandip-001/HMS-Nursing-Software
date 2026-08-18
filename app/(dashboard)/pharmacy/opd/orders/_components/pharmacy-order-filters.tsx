// app/(dashboard)/pharmacy/opd/orders/_components/pharmacy-order-filters.tsx
"use client";
import {
  CalendarDays,
  RefreshCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  PharmacyOrderFilters,
  PharmacyOrderStatus,
  StockStatus,
} from "@/types/pharmacy/opd/pharmacy-opd-types";

interface Props {
  filters: PharmacyOrderFilters;
  onChange: <K extends keyof PharmacyOrderFilters>(
    key: K,
    value: PharmacyOrderFilters[K],
  ) => void;
  onReset: () => void;
  doctors: string[];
  categories: string[];
  results: number;
}
export function PharmacyOrderFilters({
  filters,
  onChange,
  onReset,
  doctors,
  categories,
  results,
}: Props) {
  const active =
    filters.search ||
    filters.date ||
    filters.doctor ||
    filters.category ||
    filters.stockStatus !== "All" ||
    filters.orderStatus !== "All";
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">
              Search & Filter Orders
            </p>
            <p className="text-xs text-slate-500">
              Find prescription orders by patient, doctor, category, or status.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {active && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"
            >
              <RefreshCcw className="h-3.5 w-3.5" /> Reset
            </button>
          )}
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {results} Results
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-7">
          <div className="relative xl:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="h-10 pl-9"
              value={filters.search}
              onChange={(e) => onChange("search", e.target.value)}
              placeholder="Patient, UHID, appointment or order ID..."
            />
          </div>
          <Filter
            value={filters.doctor}
            onChange={(v) => onChange("doctor", v)}
            label="Doctor"
            items={["All", ...doctors]}
          />
          <Filter
            value={filters.category}
            onChange={(v) => onChange("category", v)}
            label="Medicine category"
            items={["All", ...categories]}
          />
          <Filter
            value={filters.stockStatus}
            onChange={(v) =>
              onChange("stockStatus", v as PharmacyOrderFilters["stockStatus"])
            }
            label="Stock status"
            items={[
              "All",
              "All Available",
              "Partially Available",
              "Out of Stock",
            ]}
          />
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="h-10 pl-9"
              type="date"
              value={filters.date}
              onChange={(e) => onChange("date", e.target.value)}
            />
          </div>

          <div className="">
            <Filter
              value={filters.orderStatus}
              onChange={(v) =>
                onChange("orderStatus", v as "All" | PharmacyOrderStatus)
              }
              label="Order status"
              items={["All", "Pending", "Paid", "Delivered"]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
function Filter({
  value,
  onChange,
  label,
  items,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  items: string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item === "All" ? `All ${label}s` : item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
