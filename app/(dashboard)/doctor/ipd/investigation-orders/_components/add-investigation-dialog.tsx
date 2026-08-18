//app/doctor/ipd/investigation-orders/_components/add-investigation-dialog.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, TestTube2, X, Radio } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PATHOLOGY_TESTS,
  RADIOLOGY_TESTS,
} from "@/lib/doctor/ipd/investigation-orders-data";
import type {
  InvestigationDepartment,
  InvestigationOrderItem,
  InvestigationPriority,
} from "@/types/doctor/ipd/investigation-order-types";

interface AddInvestigationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: InvestigationOrderItem | null;
  onSave: (item: InvestigationOrderItem) => void;
}

const emptyForm = {
  department: "" as InvestigationDepartment | "",
  investigationName: "",
  priority: "Normal" as InvestigationPriority,
};

export function AddInvestigationDialog({
  open,
  onOpenChange,
  editingItem,
  onSave,
}: AddInvestigationDialogProps) {
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [testDropdownOpen, setTestDropdownOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (editingItem) {
      setForm({
        department: editingItem.department,
        investigationName: editingItem.investigationName,
        priority: editingItem.priority,
      });
      setSearch(editingItem.investigationName);
    } else {
      setForm(emptyForm);
      setSearch("");
    }
  }, [editingItem, open]);

  const testsForDepartment =
    form.department === "Pathology"
      ? PATHOLOGY_TESTS
      : form.department === "Radiology"
        ? RADIOLOGY_TESTS
        : [];

  const filteredTests = useMemo(() => {
    const query = search.toLowerCase();

    return testsForDepartment.filter((test) =>
      test.name.toLowerCase().includes(query),
    );
  }, [search, testsForDepartment]);

  function handleDepartmentChange(value: InvestigationDepartment) {
    setForm({
      department: value,
      investigationName: "",
      priority: "Normal",
    });
    setSearch("");
    setTestDropdownOpen(false);
  }

  function handleSelectTest(testName: string) {
    setForm((previous) => ({
      ...previous,
      investigationName: testName,
    }));
    setSearch(testName);
    setTestDropdownOpen(false);
  }

  function closeDrawer() {
    onOpenChange(false);
    setSearch("");
    setTestDropdownOpen(false);
  }

  function saveInvestigation() {
    if (!form.department || !form.investigationName) {
      toast.error("Please select an investigation department and test");
      return;
    }

    const selectedTest = testsForDepartment.find(
      (test) => test.name === form.investigationName,
    );

    if (!selectedTest) {
      toast.error("Please select a test from the available list");
      return;
    }

    const item: InvestigationOrderItem = {
      id: editingItem?.id ?? `INV-${Date.now()}`,
      investigationName: selectedTest.name,
      department: selectedTest.department,
      category: selectedTest.category,
      priority: form.priority,
      sample: selectedTest.sample,
      orderDate:
        editingItem?.orderDate ??
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      orderedBy: editingItem?.orderedBy ?? "Dr. Amit Verma",
      status: "Pending",
      indication: editingItem?.indication ?? "",
      additionalInstructions: editingItem?.additionalInstructions ?? "",
      expectedReportTime: selectedTest.expectedReportTime,
      pathologyResults: editingItem?.pathologyResults,
      reportSummary: editingItem?.reportSummary,
      reportFileName: editingItem?.reportFileName,
      reportFileUrl: editingItem?.reportFileUrl,
      reportUploadedOn: editingItem?.reportUploadedOn,
      reportUploadedBy: editingItem?.reportUploadedBy,
    };

    onSave(item);
    closeDrawer();
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-slate-950/35 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeDrawer}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {editingItem ? "Edit Investigation" : "Add Investigation"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Create a pathology or radiology order.
            </p>
          </div>

          <Button variant="ghost" size="icon" onClick={closeDrawer}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6 p-5">
          <div>
            <Label className="text-xs text-slate-500">
              Investigation Department *
            </Label>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDepartmentChange("Pathology")}
                className={`rounded-xl border p-4 text-left transition ${
                  form.department === "Pathology"
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-slate-200 hover:border-blue-200"
                }`}
              >
                <TestTube2 className="h-5 w-5 text-blue-600" />
                <p className="mt-3 text-sm font-bold text-slate-800">
                  Pathology
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Blood, urine and laboratory tests
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleDepartmentChange("Radiology")}
                className={`rounded-xl border p-4 text-left transition ${
                  form.department === "Radiology"
                    ? "border-violet-500 bg-violet-50 shadow-sm"
                    : "border-slate-200 hover:border-violet-200"
                }`}
              >
                <Radio className="h-5 w-5 text-violet-600" />
                <p className="mt-3 text-sm font-bold text-slate-800">
                  Radiology
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  X-ray, CT, MRI, USG and ECG
                </p>
              </button>
            </div>
          </div>

          {form.department && (
            <>
              <div className="relative">
                <Label className="text-xs text-slate-500">
                  Select Investigation *
                </Label>

                <div className="relative mt-1">
                  <Input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setTestDropdownOpen(true);
                    }}
                    onFocus={() => setTestDropdownOpen(true)}
                    placeholder={`Search ${form.department.toLowerCase()} tests...`}
                    className="pr-9"
                  />

                  <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                {testDropdownOpen && filteredTests.length > 0 && (
                  <div className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-xl">
                    {filteredTests.map((test) => (
                      <button
                        key={test.name}
                        type="button"
                        onClick={() => handleSelectTest(test.name)}
                        className="block w-full rounded-md px-3 py-2.5 text-left hover:bg-blue-50"
                      >
                        <p className="text-sm font-medium text-slate-800">
                          {test.name}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {test.category} · {test.sample} ·{" "}
                          {test.expectedReportTime}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {form.investigationName && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  {(() => {
                    const test = testsForDepartment.find(
                      (row) => row.name === form.investigationName,
                    );

                    if (!test) return null;

                    return (
                      <div className="grid grid-cols-2 gap-3">
                        <InfoItem label="Category" value={test.category} />
                        <InfoItem label="Sample" value={test.sample} />
                        <InfoItem
                          label="Expected Report"
                          value={test.expectedReportTime}
                        />
                        <InfoItem
                          label="Workflow"
                          value={
                            form.department === "Pathology"
                              ? "Sample → Processing → Report"
                              : "Processing → Report"
                          }
                        />
                      </div>
                    );
                  })()}
                </div>
              )}

              <div>
                <Label className="text-xs text-slate-500">
                  Urgency *
                </Label>

                <Select
                  value={form.priority}
                  onValueChange={(value) =>
                    setForm((previous) => ({
                      ...previous,
                      priority: value as InvestigationPriority,
                    }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Urgent">
                      Urgent — expedited processing
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <div className="sticky bottom-0 flex gap-3 border-t border-slate-200 bg-white p-5">
          <Button variant="outline" className="flex-1" onClick={closeDrawer}>
            Cancel
          </Button>

          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={saveInvestigation}
          >
            {editingItem ? "Save Changes" : "Save Test"}
          </Button>
        </div>
      </aside>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="mt-0.5 text-xs font-semibold text-slate-700">{value}</p>
    </div>
  );
}