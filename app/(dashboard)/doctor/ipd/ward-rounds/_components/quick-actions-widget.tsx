
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, History, StickyNote, FileDown, ChevronRight } from "lucide-react";

const actions = [
  { label: "View All Notes", icon: FileText },
  { label: "View Previous Rounds", icon: History },
  { label: "Add General Note", icon: StickyNote },
  { label: "Download Summary", icon: FileDown },
];

export function QuickActionsWidget({ onAction }: { onAction: (label: string) => void }) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 pt-3">
        {actions.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => onAction(a.label)}
            className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm text-blue-600 hover:bg-blue-50"
          >
            <span className="flex items-center gap-2">
              <a.icon className="h-4 w-4" /> {a.label}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}