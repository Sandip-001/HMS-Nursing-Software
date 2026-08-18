
export function BillSummaryCard({ totalAmount, excludedCount }: { totalAmount: number; excludedCount: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">Total Medicine Bill</p>
        <p className="text-2xl font-bold text-slate-900">₹{totalAmount}</p>
      </div>
      {excludedCount > 0 && (
        <p className="mt-1 text-xs text-amber-600">
          {excludedCount} medicine(s) excluded from bill due to zero stock.
        </p>
      )}
    </div>
  );
}