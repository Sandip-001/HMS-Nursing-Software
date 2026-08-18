// app/ipd/new-admission/_components/confirm-admission-dialog.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, Loader2 } from "lucide-react";

interface ConfirmAdmissionDialogProps {
  onConfirm: () => Promise<void> | void;
  disabled?: boolean;
}

export function ConfirmAdmissionDialog({ onConfirm, disabled }: ConfirmAdmissionDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700" disabled={disabled}>
          <CheckCircle2 className="h-4 w-4" /> Confirm Admission
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm this admission?</AlertDialogTitle>
          <AlertDialogDescription>
            The bed will be reserved for the patient and the admission process will be completed.
            This action cannot be undone from this screen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={loading} className="gap-2 bg-blue-600 hover:bg-blue-700">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Yes, Confirm Admission
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}