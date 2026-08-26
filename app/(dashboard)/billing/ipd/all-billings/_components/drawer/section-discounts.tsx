// app/(dashboard)/billing/ipd/_components/drawer/section-discounts.tsx
import { BadgePercent, TicketPercent } from "lucide-react";
import type { DiscountEntry } from "@/types/billing/ipd/billing-types";
import { formatCurrency } from "@/lib/billing/ipd/billing-calculations";

export function SectionDiscounts({ discounts }: { discounts: DiscountEntry[] }) {
  const totalDiscount = discounts.reduce((sum, d) => sum + d.amountDeducted, 0);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><TicketPercent className="h-4 w-4 text-rose-600" />Discounts Applied</p>
        <p className="mt-1 text-xs text-slate-500">Percentage-based discounts applied to the total bill, with the date and staff member who granted them.</p>
      </div>

      {discounts.length > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 text-center">
          <p className="text-[10px] uppercase text-rose-500">Total Discount Given</p>
          <p className="mt-1 text-2xl font-bold text-rose-700">{formatCurrency(totalDiscount)}</p>
        </div>
      )}

      <div className="space-y-3">
        {discounts.map((discount) => (
          <div key={discount.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600"><BadgePercent className="h-4 w-4" /></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{discount.percentage}% Discount</p>
                  <p className="text-xs text-slate-400">{new Date(`${discount.date}T12:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
              </div>
              <span className="text-base font-bold text-rose-700">- {formatCurrency(discount.amountDeducted)}</span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-2.5"><p className="text-[10px] uppercase text-slate-400">Given By</p><p className="mt-0.5 text-sm font-semibold text-slate-700">{discount.givenBy}</p></div>
              {discount.reason && <div className="rounded-lg bg-slate-50 p-2.5"><p className="text-[10px] uppercase text-slate-400">Reason</p><p className="mt-0.5 text-sm font-semibold text-slate-700">{discount.reason}</p></div>}
            </div>
          </div>
        ))}
        {discounts.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No discounts have been applied to this bill.</div>}
      </div>
    </div>
  );
}