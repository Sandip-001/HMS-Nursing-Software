// lib/doctor/ipd/medicine-orders-data.ts
import type {
  MedicineOrdersPageData,
  MedicineReference,
} from "@/types/doctor/ipd/medicine-order-types";

// Master medicine reference list — selecting a name auto-fills dose/route/frequency
export const MEDICINE_REFERENCE_LIST: MedicineReference[] = [
  { name: "Tab. Ecosprin AV", strengthForm: "75 mg Tablet", dose: "75 mg", route: "Oral", frequency: "OD (Once a day)", timesPerDay: 1, defaultInstruction: "After meal", category: "Antiplatelet" },
  { name: "Tab. Atorvastatin", strengthForm: "20 mg Tablet", dose: "20 mg", route: "Oral", frequency: "OD (Once a day)", timesPerDay: 1, defaultInstruction: "After meal", category: "Statin" },
  { name: "Tab. Telmisartan", strengthForm: "40 mg Tablet", dose: "40 mg", route: "Oral", frequency: "OD (Once a day)", timesPerDay: 1, defaultInstruction: "After meal", category: "Antihypertensive" },
  { name: "Tab. Clopidogrel", strengthForm: "75 mg Tablet", dose: "75 mg", route: "Oral", frequency: "OD (Once a day)", timesPerDay: 1, defaultInstruction: "After meal", category: "Antiplatelet" },
  { name: "Tab. Pantoprazole", strengthForm: "40 mg Tablet", dose: "40 mg", route: "Oral", frequency: "OD (Once a day)", timesPerDay: 1, defaultInstruction: "Before meal", category: "PPI" },
  { name: "Tab. Metoprolol", strengthForm: "25 mg Tablet", dose: "25 mg", route: "Oral", frequency: "BD (Twice a day)", timesPerDay: 2, defaultInstruction: "After meal", category: "Beta Blocker" },
  { name: "Tab. Paracetamol", strengthForm: "650 mg Tablet", dose: "650 mg", route: "Oral", frequency: "TDS (Three times a day)", timesPerDay: 3, defaultInstruction: "After meal", category: "Analgesic / Antipyretic" },
  { name: "Cap. Amoxicillin", strengthForm: "500 mg Capsule", dose: "500 mg", route: "Oral", frequency: "TDS (Three times a day)", timesPerDay: 3, defaultInstruction: "After meal", category: "Antibiotic" },
  { name: "Inj. Piperacillin-Tazobactam", strengthForm: "4.5 g Vial", dose: "4.5 g", route: "IV", frequency: "QID (Four times a day)", timesPerDay: 4, defaultInstruction: "As per nursing schedule", category: "Antibiotic" },
  { name: "Inj. Pantoprazole", strengthForm: "40 mg Vial", dose: "40 mg", route: "IV", frequency: "OD (Once a day)", timesPerDay: 1, defaultInstruction: "Before meal", category: "PPI" },
  { name: "Tab. Metformin", strengthForm: "500 mg Tablet", dose: "500 mg", route: "Oral", frequency: "BD (Twice a day)", timesPerDay: 2, defaultInstruction: "After meal", category: "Antidiabetic" },
  { name: "Syrup ORS", strengthForm: "1 Sachet", dose: "1 Sachet", route: "Oral", frequency: "SOS (As needed)", timesPerDay: 1, defaultInstruction: "As needed", category: "Electrolyte" },
];

export const FREQUENCY_OPTIONS: Array<{ label: string; timesPerDay: number }> = [
  { label: "OD (Once a day)", timesPerDay: 1 },
  { label: "BD (Twice a day)", timesPerDay: 2 },
  { label: "TDS (Three times a day)", timesPerDay: 3 },
  { label: "QID (Four times a day)", timesPerDay: 4 },
  { label: "SOS (As needed)", timesPerDay: 1 },
  { label: "STAT (Immediately)", timesPerDay: 1 },
];

export const INSTRUCTION_OPTIONS = [
  "Before meal",
  "After meal",
  "With meal",
  "Empty stomach",
  "At bedtime",
  "As needed",
  "As per nursing schedule",
];

export const MEDICINE_ORDERS_DATA: Record<string, MedicineOrdersPageData> = {
  UHID12345685: {
    items: [
      {
        id: "MO1",
        medicineName: "Tab. Ecosprin AV",
        strengthForm: "75 mg Tablet",
        dose: "75 mg",
        route: "Oral",
        frequency: "OD (Once a day)",
        timesPerDay: 1,
        duration: "5 Days",
        startDate: "20 May 2024",
        endDate: "24 May 2024",
        instructions: "After meal",
        orderedBy: "Dr. Amit Verma",
        orderedOn: "20 May 2024, 08:30 AM",
        status: "Active",
        dailyLogs: [
          {
            date: "20 May 2024",
            deliveryStatus: "Delivered",
            deliveredBy: "Pharmacy - Central Store",
            deliveredAt: "20 May 2024, 07:30 AM",
            doses: [
              { time: "08:00 AM", status: "Given", nurseName: "Nurse Kavita", givenAt: "20 May 2024, 08:05 AM" },
            ],
          },
          {
            date: "21 May 2024",
            deliveryStatus: "Delivered",
            deliveredBy: "Pharmacy - Central Store",
            deliveredAt: "21 May 2024, 07:20 AM",
            doses: [
              { time: "08:00 AM", status: "Given", nurseName: "Nurse Priya", givenAt: "21 May 2024, 08:10 AM" },
            ],
          },
          {
            date: "22 May 2024",
            deliveryStatus: "Not Delivered",
            doses: [
              { time: "08:00 AM", status: "Not Given", remarks: "Stock not delivered by pharmacy" },
            ],
          },
        ],
      },
      {
        id: "MO2",
        medicineName: "Tab. Atorvastatin",
        strengthForm: "20 mg Tablet",
        dose: "20 mg",
        route: "Oral",
        frequency: "OD (Once a day)",
        timesPerDay: 1,
        duration: "30 Days",
        startDate: "20 May 2024",
        endDate: "18 Jun 2024",
        instructions: "At bedtime",
        orderedBy: "Dr. Amit Verma",
        orderedOn: "20 May 2024, 08:30 AM",
        status: "Active",
        dailyLogs: [
          {
            date: "20 May 2024",
            deliveryStatus: "Delivered",
            deliveredBy: "Pharmacy - Central Store",
            deliveredAt: "20 May 2024, 07:30 AM",
            doses: [{ time: "09:00 PM", status: "Given", nurseName: "Nurse Priya", givenAt: "20 May 2024, 09:05 PM" }],
          },
          {
            date: "21 May 2024",
            deliveryStatus: "Delivered",
            deliveredBy: "Pharmacy - Central Store",
            deliveredAt: "21 May 2024, 07:20 AM",
            doses: [{ time: "09:00 PM", status: "Given", nurseName: "Nurse Priya", givenAt: "21 May 2024, 09:00 PM" }],
          },
        ],
      },
      {
        id: "MO3",
        medicineName: "Tab. Metoprolol",
        strengthForm: "25 mg Tablet",
        dose: "25 mg",
        route: "Oral",
        frequency: "BD (Twice a day)",
        timesPerDay: 2,
        duration: "10 Days",
        startDate: "20 May 2024",
        endDate: "29 May 2024",
        instructions: "After meal",
        orderedBy: "Dr. Amit Verma",
        orderedOn: "20 May 2024, 08:30 AM",
        status: "Active",
        dailyLogs: [
          {
            date: "20 May 2024",
            deliveryStatus: "Delivered",
            deliveredBy: "Pharmacy - Central Store",
            deliveredAt: "20 May 2024, 07:30 AM",
            doses: [
              { time: "08:00 AM", status: "Given", nurseName: "Nurse Kavita", givenAt: "20 May 2024, 08:05 AM" },
              { time: "08:00 PM", status: "Given", nurseName: "Nurse Priya", givenAt: "20 May 2024, 08:10 PM" },
            ],
          },
          {
            date: "21 May 2024",
            deliveryStatus: "Partially Delivered",
            deliveredBy: "Pharmacy - Central Store",
            deliveredAt: "21 May 2024, 07:40 AM",
            doses: [
              { time: "08:00 AM", status: "Given", nurseName: "Nurse Kavita", givenAt: "21 May 2024, 08:05 AM" },
              { time: "08:00 PM", status: "Not Given", remarks: "Evening dose stock pending from pharmacy" },
            ],
          },
        ],
      },
      {
        id: "MO4",
        medicineName: "Tab. Clopidogrel",
        strengthForm: "75 mg Tablet",
        dose: "75 mg",
        route: "Oral",
        frequency: "OD (Once a day)",
        timesPerDay: 1,
        duration: "3 Days",
        startDate: "14 May 2024",
        endDate: "16 May 2024",
        instructions: "After meal",
        orderedBy: "Dr. Amit Verma",
        orderedOn: "14 May 2024, 09:00 AM",
        status: "Course Completed",
        dailyLogs: [
          { date: "14 May 2024", deliveryStatus: "Delivered", deliveredBy: "Pharmacy - Central Store", deliveredAt: "14 May 2024, 07:30 AM", doses: [{ time: "08:00 AM", status: "Given", nurseName: "Nurse Kavita", givenAt: "14 May 2024, 08:05 AM" }] },
          { date: "15 May 2024", deliveryStatus: "Delivered", deliveredBy: "Pharmacy - Central Store", deliveredAt: "15 May 2024, 07:30 AM", doses: [{ time: "08:00 AM", status: "Given", nurseName: "Nurse Priya", givenAt: "15 May 2024, 08:05 AM" }] },
          { date: "16 May 2024", deliveryStatus: "Delivered", deliveredBy: "Pharmacy - Central Store", deliveredAt: "16 May 2024, 07:30 AM", doses: [{ time: "08:00 AM", status: "Given", nurseName: "Nurse Kavita", givenAt: "16 May 2024, 08:00 AM" }] },
        ],
      },
      {
        id: "MO5",
        medicineName: "Tab. Pantoprazole",
        strengthForm: "40 mg Tablet",
        dose: "40 mg",
        route: "Oral",
        frequency: "OD (Once a day)",
        timesPerDay: 1,
        duration: "30 Days",
        startDate: "20 May 2024",
        endDate: "18 Jun 2024",
        instructions: "Before meal",
        orderedBy: "Dr. Amit Verma",
        orderedOn: "20 May 2024, 08:30 AM",
        status: "Pending",
        dailyLogs: [],
      },
    ],
    notes: "Monitor BP daily. Report any episode of chest pain / breathlessness immediately.",
    allergies: "No known drug allergies",
    preferredPharmacy: "Leads Hospital Pharmacy",
  },
};

export function getMedicineOrdersData(uhid: string): MedicineOrdersPageData {
  return MEDICINE_ORDERS_DATA[uhid] ?? MEDICINE_ORDERS_DATA.UHID12345685;
}

export function findMedicineReference(name: string): MedicineReference | undefined {
  return MEDICINE_REFERENCE_LIST.find((m) => m.name === name);
}