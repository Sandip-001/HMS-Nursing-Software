// app/ipd/admission-list/_components/detail-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface DetailField {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}

interface DetailCardProps {
  icon: LucideIcon;
  title: string;
  fields: DetailField[];
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  footer?: React.ReactNode;
}

export function DetailCard({ icon: Icon, title, fields, actionLabel, actionIcon: ActionIcon, onAction, footer }: DetailCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Icon className="h-4 w-4 shrink-0 text-blue-600" />
          {title}
        </CardTitle>
        {actionLabel && (
          <Button variant="outline" size="sm" className="h-7 shrink-0 gap-1.5 px-2.5 text-xs" onClick={onAction}>
            {ActionIcon && <ActionIcon className="h-3.5 w-3.5" />}
            {actionLabel}
          </Button>
        )}
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-6 gap-y-4 pt-4 sm:grid-cols-2">
        {fields.map((f, i) => (
          <div key={i} className={f.fullWidth ? "sm:col-span-2" : ""}>
            <p className="mb-1 text-xs text-slate-400">{f.label}</p>
            <div className="text-sm font-semibold leading-snug text-slate-800">{f.value}</div>
          </div>
        ))}
        {footer}
      </CardContent>
    </Card>
  );
}