// app/(dashboard)/lab/pathology/ipd-orders/_components/pathology-ipd-filters.tsx
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
import type { PathologyIpdOrderFilters } from "@/types/lab/pathology/pathology-ipd-types";

interface Props {
  filters: PathologyIpdOrderFilters;
  results: number;
  doctors: string[];
  categories: string[];
  onChange: <K extends keyof PathologyIpdOrderFilters>(
    key: K,
    value: PathologyIpdOrderFilters[K],
  ) => void;
  onReset: () => void;
}

export function PathologyIpdFilters({
  filters,
  results,
  doctors,
  categories,
  onChange,
  onReset,
}: Props) {
  const active = Boolean(
    filters.search ||
    filters.date ||
    filters.doctor ||
    filters.category ||
    filters.status !== "All" ||
    filters.urgency !== "All" ||
    filters.paymentStatus !== "All",
  );
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-violet-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">
              Search & Filter IPD Pathology Orders
            </p>
            <p className="text-xs text-slate-500">
              Filter by patient, ward, doctor, urgency, category, or payment
              status.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {active && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
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
              onChange={(event) => onChange("search", event.target.value)}
              placeholder="Patient, UHID, IPD ID, ward or bed..."
            />
          </div>
          <Filter
            label="Doctor"
            value={filters.doctor}
            items={["All", ...doctors]}
            onChange={(value) => onChange("doctor", value)}
          />
          {/*<Filter
            label="Test category"
            value={filters.category}
            items={["All", ...categories]}
            onChange={(value) => onChange("category", value)}
          /> */}
          <Filter
            label="Test status"
            value={filters.status}
            items={[
              "All",
              "Ordered",
              "Sample Collected",
              "Processing",
              "Report Ready",
            ]}
            onChange={(value) =>
              onChange("status", value as PathologyIpdOrderFilters["status"])
            }
          />
          <Filter
            label="Urgency"
            value={filters.urgency}
            items={["All", "Routine", "Urgent"]}
            onChange={(value) =>
              onChange("urgency", value as PathologyIpdOrderFilters["urgency"])
            }
          />
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="h-10 pl-9"
              type="date"
              value={filters.date}
              onChange={(event) => onChange("date", event.target.value)}
            />
          </div>
          <Filter
            label="Payment"
            value={filters.paymentStatus}
            items={["All", "Paid", "Unpaid"]}
            onChange={(value) =>
              onChange(
                "paymentStatus",
                value as PathologyIpdOrderFilters["paymentStatus"],
              )
            }
          />
        </div>
        
      </CardContent>
    </Card>
  );
}

function Filter({
  label,
  value,
  items,
  onChange,
}: {
  label: string;
  value: string;
  items: string[];
  onChange: (value: string) => void;
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
