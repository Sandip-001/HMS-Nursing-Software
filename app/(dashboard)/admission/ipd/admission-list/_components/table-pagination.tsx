// app/ipd/admission-list/_components/table-pagination.tsx
"use client";

import { Button } from "@/components/ui/button";

import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  totalEntries: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function TablePagination({
  page, totalPages, pageSize, totalEntries, onPageChange, onPageSizeChange,
}: TablePaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalEntries);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing {start} to {end} of {totalEntries} entries
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onPageChange(1)} disabled={page === 1}>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pageNumbers.map((p, idx) => (
          <span key={p} className="flex items-center">
            {idx > 0 && pageNumbers[idx - 1] !== p - 1 && <span className="px-1 text-slate-300">...</span>}
            <Button
              variant={p === page ? "default" : "outline"}
              size="icon"
              className={`h-8 w-8 ${p === page ? "bg-blue-600 hover:bg-blue-700" : ""}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Button>
          </span>
        ))}
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onPageChange(totalPages)} disabled={page === totalPages}>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}