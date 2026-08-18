
export function RequestDetailField({ label, value, fullWidth }: { label: string; value: React.ReactNode; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <p className="mb-0.5 text-xs text-slate-400">{label}</p>
      <div className="text-sm font-semibold leading-snug text-slate-800">{value}</div>
    </div>
  );
}