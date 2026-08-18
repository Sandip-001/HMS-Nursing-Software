// lib/pharmacy/ipd/pharmacy-order-data.ts
import type { PharmacyOrder } from "@/types/pharmacy/ipd/pharmacy-order-types";

// This flag will come from Super Admin panel per hospital configuration.
// true  = Pharmacy collects payment directly from patient (Cash/UPI)
// false = Pharmacy only delivers medicine, billing goes to IPD Billing Department
export const PHARMACY_BILLING_ENABLED = false;

export const PHARMACY_ORDERS: PharmacyOrder[] = [
  {
    id: "1",
    orderId: "PHM240520001",
    uhid: "UHID12345685",
    patientName: "Ravi Sharma",
    age: 48,
    gender: "Male",
    ward: "Semi Private",
    room: "Room-2",
    bed: "B-203",
    orderingDoctor: "Dr. Amit Verma",
    department: "Cardiology",
    orderDateTime: "20 May 2024, 11:40 AM",
    status: "Pending",
    medicines: [
      { id: "M1", medicineName: "Tab. Aspirin", strength: "75 mg", frequency: "Once daily", duration: "30 Days", route: "Oral, After Food", orderedQty: 30, stockAvailable: 30, pricePerUnit: 2, includeAvailableStockOnly: false },
      { id: "M2", medicineName: "Tab. Atorvastatin", strength: "20 mg", frequency: "Once at night", duration: "30 Days", route: "Oral, After Food", orderedQty: 30, stockAvailable: 12, pricePerUnit: 5, includeAvailableStockOnly: false },
      { id: "M3", medicineName: "Tab. Metoprolol", strength: "25 mg", frequency: "Twice daily", duration: "15 Days", route: "Oral, Before Food", orderedQty: 30, stockAvailable: 0, pricePerUnit: 3, includeAvailableStockOnly: false },
      { id: "M4", medicineName: "Tab. Pantoprazole", strength: "40 mg", frequency: "Once daily", duration: "10 Days", route: "Oral, Before Food", orderedQty: 10, stockAvailable: 10, pricePerUnit: 4, includeAvailableStockOnly: false },
    ],
  },
  {
    id: "2",
    orderId: "PHM240520002",
    uhid: "UHID12345686",
    patientName: "Sunita Devi",
    age: 60,
    gender: "Female",
    ward: "General Ward",
    room: "Room-5",
    bed: "G-105",
    orderingDoctor: "Dr. Priya Nair",
    department: "Neurology",
    orderDateTime: "20 May 2024, 10:15 AM",
    status: "Medicine Delivered & Payment Received",
    medicines: [
      { id: "M5", medicineName: "Tab. Gabapentin", strength: "100 mg", frequency: "Twice daily", duration: "15 Days", route: "Oral, After Food", orderedQty: 30, stockAvailable: 30, pricePerUnit: 6, includeAvailableStockOnly: false },
      { id: "M6", medicineName: "Cap. Vitamin D3", strength: "60000 IU", frequency: "Once a week", duration: "4 Weeks", route: "Oral", orderedQty: 4, stockAvailable: 4, pricePerUnit: 15, includeAvailableStockOnly: false },
    ],
  },
  {
    id: "3",
    orderId: "PHM240520003",
    uhid: "UHID12345687",
    patientName: "Mohd. Irfan",
    age: 55,
    gender: "Male",
    ward: "Semi Private",
    room: "Room-3",
    bed: "B-205",
    orderingDoctor: "Dr. Rajesh Iyer",
    department: "Orthopedics",
    orderDateTime: "20 May 2024, 09:50 AM",
    status: "Partially Available",
    medicines: [
      { id: "M7", medicineName: "Tab. Diclofenac", strength: "50 mg", frequency: "Twice daily", duration: "7 Days", route: "Oral, After Food", orderedQty: 14, stockAvailable: 6, pricePerUnit: 3, includeAvailableStockOnly: false },
      { id: "M8", medicineName: "Cap. Calcium + D3", strength: "500 mg", frequency: "Once daily", duration: "30 Days", route: "Oral", orderedQty: 30, stockAvailable: 30, pricePerUnit: 4, includeAvailableStockOnly: false },
    ],
  },
];

export function getPharmacyOrders(): PharmacyOrder[] {
  return PHARMACY_ORDERS;
}