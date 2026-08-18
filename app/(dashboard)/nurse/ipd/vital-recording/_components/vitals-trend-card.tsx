
export function VitalsTrendCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">Vitals Trend (Last 24 Hrs)</p>
        <button className="text-xs font-medium text-slate-500">All</button>
      </div>

      <div className="mb-4 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1 text-rose-500"><span className="h-2 w-2 rounded-full bg-rose-500" /> Pulse</span>
        <span className="flex items-center gap-1 text-blue-500"><span className="h-2 w-2 rounded-full bg-blue-500" /> BP (Systolic)</span>
        <span className="flex items-center gap-1 text-emerald-500"><span className="h-2 w-2 rounded-full bg-emerald-500" /> SpO₂</span>
      </div>

      <div className="relative h-40 rounded-xl bg-slate-50 p-3">
        <div className="absolute inset-3">
          <svg viewBox="0 0 300 120" className="h-full w-full">
            <polyline fill="none" stroke="#f43f5e" strokeWidth="2.5" points="10,42 80,42 150,41 220,42 290,42" />
            <polyline fill="none" stroke="#3b82f6" strokeWidth="2.5" points="10,72 80,71 150,71 220,71 290,71" />
            <polyline fill="none" stroke="#10b981" strokeWidth="2.5" points="10,85 80,84 150,86 220,92 290,93" />
            {[10, 80, 150, 220, 290].map((x) => (
              <g key={x}>
                <circle cx={x} cy="42" r="2.5" fill="#f43f5e" />
                <circle cx={x} cy="71" r="2.5" fill="#3b82f6" />
                <circle cx={x} cy={x === 220 ? 92 : x === 290 ? 93 : x === 150 ? 86 : x === 80 ? 84 : 85} r="2.5" fill="#10b981" />
              </g>
            ))}
          </svg>
        </div>

        <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[10px] text-slate-400">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>12 AM</span>
        </div>
      </div>
    </div>
  );
}