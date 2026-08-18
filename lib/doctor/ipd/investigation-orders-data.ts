//lib/doctor/ipd/investigation-orders-data.ts
import type {
  InvestigationOrdersPageData,
  InvestigationOrderItem,
} from "@/types/doctor/ipd/investigation-order-types";

export interface InvestigationReference {
  name: string;
  department: "Pathology" | "Radiology";
  category: string;
  sample: string;
  expectedReportTime: string;
}

export const PATHOLOGY_TESTS: InvestigationReference[] = [
  {
    name: "Complete Blood Count (CBC)",
    department: "Pathology",
    category: "Hematology",
    sample: "EDTA Whole Blood",
    expectedReportTime: "6 Hours",
  },
  {
    name: "Liver Function Test (LFT)",
    department: "Pathology",
    category: "Biochemistry",
    sample: "Serum",
    expectedReportTime: "24 Hours",
  },
  {
    name: "Kidney Function Test (KFT)",
    department: "Pathology",
    category: "Biochemistry",
    sample: "Serum",
    expectedReportTime: "24 Hours",
  },
  {
    name: "Serum Electrolytes (Na, K, Cl)",
    department: "Pathology",
    category: "Biochemistry",
    sample: "Serum",
    expectedReportTime: "6 Hours",
  },
  {
    name: "Fasting Blood Sugar",
    department: "Pathology",
    category: "Biochemistry",
    sample: "Fluoride Plasma",
    expectedReportTime: "4 Hours",
  },
  {
    name: "HbA1c (Glycated Hemoglobin)",
    department: "Pathology",
    category: "Biochemistry",
    sample: "EDTA Whole Blood",
    expectedReportTime: "24 Hours",
  },
  {
    name: "Urine Routine & Microscopy",
    department: "Pathology",
    category: "Microbiology",
    sample: "Urine Sample",
    expectedReportTime: "8 Hours",
  },
  {
    name: "Thyroid Profile (T3, T4, TSH)",
    department: "Pathology",
    category: "Biochemistry",
    sample: "Serum",
    expectedReportTime: "24 Hours",
  },
];

export const RADIOLOGY_TESTS: InvestigationReference[] = [
  {
    name: "Chest X-Ray (PA View)",
    department: "Radiology",
    category: "Radiology",
    sample: "Not Applicable",
    expectedReportTime: "2 Hours",
  },
  {
    name: "X-Ray Abdomen (Erect / Supine)",
    department: "Radiology",
    category: "Radiology",
    sample: "Not Applicable",
    expectedReportTime: "2 Hours",
  },
  {
    name: "Ultrasound Abdomen & Pelvis",
    department: "Radiology",
    category: "Radiology",
    sample: "Not Applicable",
    expectedReportTime: "4 Hours",
  },
  {
    name: "CT Scan Brain (Plain)",
    department: "Radiology",
    category: "Radiology",
    sample: "Not Applicable",
    expectedReportTime: "4 Hours",
  },
  {
    name: "MRI Brain",
    department: "Radiology",
    category: "Radiology",
    sample: "Not Applicable",
    expectedReportTime: "8 Hours",
  },
  {
    name: "2D Echo",
    department: "Radiology",
    category: "Cardiology",
    sample: "Not Applicable",
    expectedReportTime: "4 Hours",
  },
  {
    name: "ECG (12 Lead)",
    department: "Radiology",
    category: "Cardiology",
    sample: "Not Applicable",
    expectedReportTime: "Immediate",
  },
];

export const INVESTIGATION_TESTS = [
  ...PATHOLOGY_TESTS,
  ...RADIOLOGY_TESTS,
];

export const INVESTIGATION_ORDERS_DATA: Record<
  string,
  InvestigationOrdersPageData
> = {
  UHID12345685: {
    items: [
      {
        id: "INV1",
        investigationName: "Complete Blood Count (CBC)",
        department: "Pathology",
        category: "Hematology",
        priority: "Normal",
        sample: "EDTA Whole Blood",
        orderDate: "20 May 2024, 11:20 AM",
        orderedBy: "Dr. Amit Verma",
        status: "Report Ready",
        indication: "Evaluation of general health status",
        additionalInstructions: "",
        expectedReportTime: "6 Hours",
        reportSummary:
          "Mild reduction in hemoglobin. Total WBC and platelet counts are within normal limits.",
        reportFileName: "CBC_Report_20_May_2024.pdf",
        reportFileUrl: "#",
        reportUploadedOn: "20 May 2024, 05:30 PM",
        reportUploadedBy: "Lab Tech Sunil",
        pathologyResults: [
          {
            parameter: "Hemoglobin (Hb)",
            result: "13.2",
            unit: "g/dL",
            referenceRange: "13.5 - 17.5",
            status: "Low",
          },
          {
            parameter: "Total WBC Count",
            result: "7,400",
            unit: "/µL",
            referenceRange: "4,000 - 11,000",
            status: "Normal",
          },
          {
            parameter: "Platelet Count",
            result: "2.15",
            unit: "Lakh/µL",
            referenceRange: "1.50 - 4.50",
            status: "Normal",
          },
        ],
      },
      {
        id: "INV2",
        investigationName: "Liver Function Test (LFT)",
        department: "Pathology",
        category: "Biochemistry",
        priority: "Normal",
        sample: "Serum",
        orderDate: "20 May 2024, 11:20 AM",
        orderedBy: "Dr. Amit Verma",
        status: "Sample Collected",
        indication: "Monitoring of ongoing treatment",
        additionalInstructions: "",
        expectedReportTime: "24 Hours",
      },
      {
        id: "INV3",
        investigationName: "Serum Electrolytes (Na, K, Cl)",
        department: "Pathology",
        category: "Biochemistry",
        priority: "Urgent",
        sample: "Serum",
        orderDate: "20 May 2024, 11:20 AM",
        orderedBy: "Dr. Amit Verma",
        status: "Processing",
        indication: "Assessment of electrolyte balance",
        additionalInstructions: "Inform doctor immediately if potassium is abnormal.",
        expectedReportTime: "6 Hours",
      },
      {
        id: "INV4",
        investigationName: "ECG (12 Lead)",
        department: "Radiology",
        category: "Cardiology",
        priority: "Normal",
        sample: "Not Applicable",
        orderDate: "20 May 2024, 11:20 AM",
        orderedBy: "Dr. Amit Verma",
        status: "Report Ready",
        indication: "Cardiac evaluation",
        additionalInstructions: "",
        expectedReportTime: "Immediate",
        reportSummary:
          "Sinus rhythm. No acute ST-T segment changes. Clinical correlation advised.",
        reportFileName: "ECG_20_May_2024.jpg",
        reportFileUrl: "#",
        reportUploadedOn: "20 May 2024, 11:45 AM",
        reportUploadedBy: "Radiology Technician Rahul",
      },
      {
        id: "INV5",
        investigationName: "Chest X-Ray (PA View)",
        department: "Radiology",
        category: "Radiology",
        priority: "Urgent",
        sample: "Not Applicable",
        orderDate: "20 May 2024, 11:20 AM",
        orderedBy: "Dr. Amit Verma",
        status: "Ordered",
        indication: "Chest pain / respiratory evaluation",
        additionalInstructions: "",
        expectedReportTime: "2 Hours",
      },
    ],
    indication:
      "Evaluation of general health status and monitoring of ongoing treatment.",
    instructions:
      "Ensure patient follows fasting requirements where applicable. Collect pathology samples in the morning where possible.",
  },
};

export function getInvestigationOrdersData(
  uhid: string,
): InvestigationOrdersPageData {
  return (
    INVESTIGATION_ORDERS_DATA[uhid] ??
    INVESTIGATION_ORDERS_DATA.UHID12345685
  );
}