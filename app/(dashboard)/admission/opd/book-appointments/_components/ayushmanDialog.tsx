// app/(dashboard)/admission/opd/book-appointments/_components/ayushmanDialog.tsx
"use client";

import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

type LookupState = "idle" | "loading";

interface AyushmanDialogProps {
  open: boolean;
  close: () => void;
  cardNo: string;
  setCardNo: Dispatch<SetStateAction<string>>;
  state: LookupState;
  lookup: () => Promise<void>;
}

export function AyushmanDialog({
  open,
  close,
  cardNo,
  setCardNo,
  state,
  lookup,
}: AyushmanDialogProps) {
  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && state !== "loading") {
      close();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ayushman Bharat Card Lookup</DialogTitle>
        </DialogHeader>

        {state === "loading" ? (
          <div className="py-12 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />

            <p className="mt-4 font-semibold text-slate-700">
              Verifying patient details...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Connecting to Ayushman Bharat database
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              Enter the 16-digit Ayushman Bharat card number to retrieve
              patient data.
            </p>

            <Input
              maxLength={16}
              inputMode="numeric"
              value={cardNo}
              onChange={(event) =>
                setCardNo(event.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter 16-digit card number"
            />

            <p className="text-xs text-slate-400">
              Demo card: 1234567890123456
            </p>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={lookup}
            >
              Verify & Fetch Details
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}