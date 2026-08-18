// app/ipd/new-admission/_components/bed-legend.tsx
export function BedLegend() {
  const items = [
    { label: "Available", color: "bg-emerald-500" },
    { label: "Occupied", color: "bg-red-400" },
    { label: "Reserved / Hold", color: "bg-amber-400" },
    { label: "Maintenance", color: "bg-slate-400" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-3 text-xs text-slate-500">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}