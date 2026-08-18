// components/ipd-admission/package-card.tsx
"use client";

import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Package } from "@/types/admission-types";


interface PackageCardProps {
  pkg: Package;
  selected: boolean;
  onSelect: (pkg: Package) => void;
}

export function PackageCard({ pkg, selected, onSelect }: PackageCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(pkg)}
      className={cn(
        "relative flex flex-col rounded-xl border p-4 text-left transition-all hover:shadow-md",
        selected ? "border-blue-500 bg-blue-50/40 ring-1 ring-blue-500" : "border-slate-200 bg-white"
      )}
    >
      {pkg.isMostSelected && (
        <span className="absolute right-3 top-3 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
          Most Selected
        </span>
      )}
      <div className="mb-3 flex items-center gap-2">
        <span
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
            selected ? "border-blue-600 bg-blue-600" : "border-slate-300"
          )}
        >
          {selected && <Check className="h-2.5 w-2.5 text-white" />}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-800">{pkg.name}</p>
          <p className="text-xs text-slate-400">{pkg.subtitle}</p>
        </div>
      </div>

      <p className="mb-1 text-xl font-bold text-slate-900">
        ₹ {pkg.rate.toLocaleString("en-IN")}
      </p>
      <p className="mb-3 text-xs text-slate-400">Per Day</p>

      <div className="space-y-1.5 text-xs text-slate-500">
        <p><span className="font-medium text-slate-600">Room Type:</span> {pkg.roomType}</p>
        <p><span className="font-medium text-slate-600">Doctor Visit:</span> {pkg.doctorVisit ? "Included" : "—"}</p>
        <p><span className="font-medium text-slate-600">Nursing Care:</span> {pkg.nursingCare ? "Included" : "—"}</p>
        <p><span className="font-medium text-slate-600">Meals:</span> {pkg.meals ? "Included" : "—"}</p>
        <p><span className="font-medium text-slate-600">Investigations:</span> {pkg.investigations}</p>
      </div>

      <span className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600">
        <Info className="h-3.5 w-3.5" /> View Details
      </span>
    </button>
  );
}