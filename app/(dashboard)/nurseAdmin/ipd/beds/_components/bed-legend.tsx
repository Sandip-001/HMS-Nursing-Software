// app/(dashboard)/nurse-admin/ipd/beds/_components/bed-legend.tsx
import { BedSingle, Wrench } from "lucide-react";

const items: { label: string; card: string; icon: string }[] = [
  { label: "Available", card: "border-emerald-200 bg-emerald-50", icon: "text-emerald-600" },
  { label: "Occupied", card: "border-blue-200 bg-blue-50", icon: "text-blue-600" },
  { label: "Reserved", card: "border-amber-200 bg-amber-50", icon: "text-amber-600" },
  { label: "Maintenance", card: "border-slate-300 bg-slate-100", icon: "text-slate-500" },
];

export function BedLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
      <span className="text-xs font-semibold text-slate-500">Legend:</span>
      {items.map((item) => (
        <span key={item.label} className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium ${item.card}`}>
          {item.label === "Maintenance" ? <Wrench className={`h-3.5 w-3.5 ${item.icon}`} /> : <BedSingle className={`h-3.5 w-3.5 ${item.icon}`} />}
          {item.label}
        </span>
      ))}
    </div>
  );
}