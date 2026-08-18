
import { HeartPulse } from "lucide-react";
import { Input } from "@/components/ui/input";

export function BPInputCard({
  systolic,
  diastolic,
  onSystolicChange,
  onDiastolicChange,
}: {
  systolic: string;
  diastolic: string;
  onSystolicChange: (value: string) => void;
  onDiastolicChange: (value: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <HeartPulse className="h-4 w-4 text-violet-600" />
        <label className="text-xs font-semibold text-slate-600">Blood Pressure</label>
      </div>

      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <Input
          value={systolic}
          onChange={(e) => onSystolicChange(e.target.value)}
          className="border-0 bg-transparent text-center shadow-none focus-visible:ring-0"
          placeholder="120"
        />
        <div className="flex items-center px-2 text-slate-400">/</div>
        <Input
          value={diastolic}
          onChange={(e) => onDiastolicChange(e.target.value)}
          className="border-0 bg-transparent text-center shadow-none focus-visible:ring-0"
          placeholder="80"
        />
        <div className="flex min-w-[64px] items-center justify-center border-l border-slate-200 px-3 text-xs font-semibold text-slate-500">
          mmHg
        </div>
      </div>
    </div>
  );
}