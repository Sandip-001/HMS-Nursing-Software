
export function DetailRow({ label, value, muted }: { label: string; value: React.ReactNode; muted?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className={muted ? "text-sm text-slate-400" : "text-sm font-semibold text-slate-800"}>{value}</p>
    </div>
  );
}