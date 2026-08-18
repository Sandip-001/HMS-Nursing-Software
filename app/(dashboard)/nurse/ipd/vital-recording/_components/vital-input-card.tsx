
import { Input } from "@/components/ui/input";

export function VitalInputCard({
  icon,
  label,
  value,
  onChange,
  unit,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  placeholder?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-blue-600">{icon}</span>
        <label className="text-xs font-semibold text-slate-600">{label}</label>
      </div>

      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
        {unit && (
          <div className="flex min-w-[58px] items-center justify-center border-l border-slate-200 px-3 text-xs font-semibold text-slate-500">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}