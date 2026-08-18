
import { Download, FileText, Image as ImageIcon, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AttachedDocument } from "@/types/admission-request-types";

const iconMap = {
  pdf: { Icon: FileText, style: "bg-red-50 text-red-500" },
  image: { Icon: ImageIcon, style: "bg-blue-50 text-blue-500" },
  doc: { Icon: File, style: "bg-slate-100 text-slate-500" },
};

interface DocumentItemProps {
  doc: AttachedDocument;
  onDownload: (doc: AttachedDocument) => void;
}

export function DocumentItem({ doc, onDownload }: DocumentItemProps) {
  const { Icon, style } = iconMap[doc.fileType];
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${style}`}>
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-700">{doc.fileName}</p>
          <p className="text-xs text-slate-400">{doc.fileSizeLabel}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-slate-400 hover:text-blue-600" onClick={() => onDownload(doc)} title="Download">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}