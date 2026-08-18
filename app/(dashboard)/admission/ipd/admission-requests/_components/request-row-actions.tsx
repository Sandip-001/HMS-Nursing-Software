"use client";

import {
  Eye,
  MoreVertical,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { AdmissionRequestRecord } from "@/types/admission-request-types";
import { useRouter } from "next/navigation";

interface RequestRowActionsProps {
  record: AdmissionRequestRecord;
  onView: (r: AdmissionRequestRecord) => void;
  onApprove: (r: AdmissionRequestRecord) => void;
  onReject: (r: AdmissionRequestRecord) => void;
}

export function RequestRowActions({
  record,
  onView,
  onApprove,
  onReject,
}: RequestRowActionsProps) {
  const isPending = record.requestStatus === "Pending Review";

  const router = useRouter();

  function handleEdit() {
    //console.log("Edit admission:", record.admissionId);
    router.push(`/admission/ipd/admission-list/edit/${record.requestId}`);
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-slate-500 hover:text-blue-600"
        onClick={() => onView(record)}
        title="View"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(record)}>
            <FileText className="mr-2 h-4 w-4 text-blue-500" /> View Full
            Request
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit}  >
            <Edit className="mr-2 h-4 w-4 text-blue-500" /> Edit Admission
            Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4 text-blue-500" /> Download
            Admission Summary
          </DropdownMenuItem>
          {isPending && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onApprove(record)}
                className="text-emerald-600 focus:text-emerald-600"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Request
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onReject(record)}
                className="text-red-600 focus:text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" /> Reject Request
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
