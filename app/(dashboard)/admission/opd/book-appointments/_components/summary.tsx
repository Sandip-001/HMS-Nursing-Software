export function Summary({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <h3 className="font-bold text-slate-800">{title}</h3>
      <div className="mt-3 space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 text-sm">
            <span className="text-slate-500">{k}</span>
            <span className="text-right font-medium text-slate-700">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}