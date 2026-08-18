// app/ipd/new-admission/_components/important-instructions-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Info } from "lucide-react";

const INSTRUCTIONS = [
  "Advance payment collected and verified.",
  "Bed is allocated based on current availability.",
  "Package rate is valid for the selected duration only.",
  "Any additional services will be charged as per actuals.",
  "Discharge summary and final bill will be settled before discharge.",
];

export function ImportantInstructionsCard() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Info className="h-4 w-4 text-blue-600" />
          Important Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {INSTRUCTIONS.map((text) => (
          <div key={text} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>{text}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}