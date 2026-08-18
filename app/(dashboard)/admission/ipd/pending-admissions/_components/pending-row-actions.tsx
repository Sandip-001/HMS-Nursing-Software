
"use client";

import { useRouter } from "next/navigation";
import { Eye, MoreVertical, ArrowRight, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { PendingAdmissionRecord } from "@/types/pending-admission-types";

interface PendingRowActionsProps {
  record: PendingAdmissionRecord;
  onView: (r: PendingAdmissionRecord) => void;
  onCancel: (r: PendingAdmissionRecord) => void;
}

const stepRouteMap: Record<PendingAdmissionRecord["currentStep"], string> = {
  "Awaiting Package & Payment": "package-payment",
  "Awaiting Bed Allocation": "bed-allocation",
  "Awaiting Review & Confirm": "review-confirm",
};

export function PendingRowActions({ record, onView, onCancel }: PendingRowActionsProps) {
  const router = useRouter();

  function handleContinue() {
    console.log("Resume admission at step:", record.currentStep, record.admissionId);
    router.push(`/ipd/new-admission?admissionId=${record.admissionId}&step=${stepRouteMap[record.currentStep]}`);
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => onView(record)} title="View">
        <Eye className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleContinue}>
            <ArrowRight className="mr-2 h-4 w-4 text-blue-500" /> Continue Admission
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onCancel(record)} className="text-red-600 focus:text-red-600">
            <Ban className="mr-2 h-4 w-4" /> Cancel Admission
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}