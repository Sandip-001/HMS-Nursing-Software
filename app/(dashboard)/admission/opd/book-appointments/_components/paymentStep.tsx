// app/(dashboard)/admission/opd/book-appointments/_components/paymentStep.tsx
"use client";

import type { Dispatch, SetStateAction } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import type { PaymentMethod } from "@/types/admission-desk/opd/appointment-types";
import { Banknote, CreditCard, Landmark, Smartphone } from "lucide-react";

interface PaymentStepProps {
  total: number;
  payment: PaymentMethod | null;
  setPayment: Dispatch<SetStateAction<PaymentMethod | null>>;
}

const paymentOptions: Array<{
  value: PaymentMethod;
  label: string;
  icon: React.ElementType;
}> = [
  {
    value: "Cash",
    label: "Cash",
    icon: Banknote,
  },
  {
    value: "UPI",
    label: "UPI",
    icon: Smartphone,
  },
  {
    value: "Card",
    label: "Card",
    icon: CreditCard,
  },
  {
    value: "Net Banking",
    label: "Net Banking",
    icon: Landmark,
  },
];

export function PaymentStep({
  total,
  payment,
  setPayment,
}: PaymentStepProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-5 sm:p-7">
        <h2 className="text-xl font-bold text-slate-800">
          Choose Payment Method
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Total payable amount:{" "}
          <strong className="text-slate-800">
            ₹{total.toLocaleString("en-IN")}
          </strong>
        </p>

        <RadioGroup
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
          value={payment ?? ""}
          onValueChange={(value) =>
            setPayment(value as PaymentMethod)
          }
        >
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            const selected = payment === option.value;

            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  selected
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                }`}
              >
                <RadioGroupItem value={option.value} />

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Icon className="h-4 w-4" />
                </div>

                <span className="font-semibold text-slate-700">
                  {option.label}
                </span>
              </label>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}