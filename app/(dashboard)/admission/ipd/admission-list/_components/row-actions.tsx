// app/ipd/admission-list/_components/row-actions.tsx
"use client";

import { Eye, Bed, MoreVertical, Ban, Download, NotebookPen, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AdmissionRecord } from "@/types/admission-list-types";
import { MdEmail } from "react-icons/md";
import { FaWhatsappSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";


interface RowActionsProps {
  record: AdmissionRecord;
  onView: (r: AdmissionRecord) => void;
  onBedTransfer: (r: AdmissionRecord) => void;
  onPrint: (r: AdmissionRecord) => void;
  onCancel: (r: AdmissionRecord) => void;
}

export function RowActions({ record, onView, onBedTransfer, onPrint, onCancel }: RowActionsProps) {
  const router = useRouter();

  function handleEdit() {
    //console.log("Edit admission:", record.admissionId);
    router.push(`/admission/ipd/admission-list/edit/${record.admissionId}`);
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => onView(record)} title="View">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => onBedTransfer(record)} title="Bed / Ward">
        <Bed className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4 text-blue-500" /> Edit Admission Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=> onPrint(record)}> 
            <Download className="mr-2 h-4 w-4 text-blue-500" /> Download Admission Summary
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem >
            <MdEmail className="mr-2 h-4 w-4 text-blue-500" /> Send Via Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem >
            <FaWhatsappSquare className="mr-2 h-4 w-4 text-green-500" /> Send Via WhatsApp
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem >
            <NotebookPen className="mr-2 h-4 w-4 text-blue-500" /> Notes
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