// lib/emergency/rmo-emergency-data.ts
import type { AvailableDoctor, AvailableNurse, BedOption, EmergencyDepartment } from "@/types/emergency/rmo-emergency-types";

export const RMO_DEPARTMENTS: EmergencyDepartment[] = ["Cardiology", "Neurology", "Trauma & Orthopaedics", "General Medicine", "Paediatrics", "Surgery", "Critical Care"];

export const AVAILABLE_DOCTORS: AvailableDoctor[] = [
  { id: "DOC-001", name: "Dr. Amit Verma", department: "Cardiology", specialization: "Interventional Cardiology", available: true, currentLoad: 3, maxLoad: 6 },
  { id: "DOC-002", name: "Dr. Rahul Mehta", department: "Trauma & Orthopaedics", specialization: "Trauma Surgery", available: true, currentLoad: 2, maxLoad: 5 },
  { id: "DOC-003", name: "Dr. Priya Nair", department: "General Medicine", specialization: "Internal Medicine", available: true, currentLoad: 4, maxLoad: 6 },
  { id: "DOC-004", name: "Dr. Sanjana Ghosh", department: "Neurology", specialization: "Stroke Medicine", available: true, currentLoad: 1, maxLoad: 4 },
  { id: "DOC-005", name: "Dr. Vikram Shah", department: "Surgery", specialization: "Emergency Surgery", available: false, currentLoad: 5, maxLoad: 5 },
  { id: "DOC-006", name: "Dr. Nidhi Kapoor", department: "Critical Care", specialization: "Critical Care Medicine", available: true, currentLoad: 2, maxLoad: 4 },
  { id: "DOC-007", name: "Dr. Arjun Rao", department: "Paediatrics", specialization: "Paediatric Emergency", available: true, currentLoad: 1, maxLoad: 5 },
];

export const AVAILABLE_NURSES: AvailableNurse[] = [
  { id: "NUR-001", name: "Nurse Kavita", shift: "Morning", ward: "Emergency", available: true, currentPatients: 3, maxPatients: 5 },
  { id: "NUR-002", name: "Nurse Priya", shift: "Morning", ward: "Emergency", available: true, currentPatients: 4, maxPatients: 5 },
  { id: "NUR-003", name: "Nurse Anjali", shift: "Morning", ward: "Trauma", available: true, currentPatients: 2, maxPatients: 4 },
  { id: "NUR-004", name: "Nurse Neha", shift: "Evening", ward: "Emergency", available: true, currentPatients: 1, maxPatients: 5 },
  { id: "NUR-005", name: "Nurse Ravi", shift: "Night", ward: "Emergency", available: false, currentPatients: 5, maxPatients: 5 },
  { id: "NUR-006", name: "Nurse Pooja", shift: "Evening", ward: "ICU", available: true, currentPatients: 2, maxPatients: 4 },
  { id: "NUR-007", name: "Nurse Ritu", shift: "Night", ward: "Emergency", available: true, currentPatients: 2, maxPatients: 5 },
];

export const RMO_BEDS: BedOption[] = [
  { id: "IPD-1-101-A", unit: "IPD", floor: "1st Floor", ward: "Medical Ward", room: "101", bed: "A", bedType: "Semi-Private", status: "Available", gender: "Any" },
  { id: "IPD-1-101-B", unit: "IPD", floor: "1st Floor", ward: "Medical Ward", room: "101", bed: "B", bedType: "Semi-Private", status: "Occupied", gender: "Any" },
  { id: "IPD-2-205-A", unit: "IPD", floor: "2nd Floor", ward: "Cardiology", room: "205", bed: "A", bedType: "Private", status: "Available", gender: "Any" },
  { id: "IPD-2-205-B", unit: "IPD", floor: "2nd Floor", ward: "Cardiology", room: "205", bed: "B", bedType: "Private", status: "Cleaning", gender: "Any" },
  { id: "IPD-3-310-A", unit: "IPD", floor: "3rd Floor", ward: "Trauma Ward", room: "310", bed: "A", bedType: "General", status: "Available", gender: "Any" },
  { id: "ICU-G-01", unit: "ICU", floor: "Ground Floor", ward: "Medical ICU", room: "Bay 1", bed: "ICU-01", bedType: "Ventilator Bed", status: "Available", gender: "Any" },
  { id: "ICU-G-02", unit: "ICU", floor: "Ground Floor", ward: "Medical ICU", room: "Bay 1", bed: "ICU-02", bedType: "Monitored Bed", status: "Occupied", gender: "Any" },
  { id: "ICU-G-03", unit: "ICU", floor: "Ground Floor", ward: "Medical ICU", room: "Bay 2", bed: "ICU-03", bedType: "Ventilator Bed", status: "Available", gender: "Any" },
  { id: "ICU-1-05", unit: "ICU", floor: "1st Floor", ward: "Cardiac ICU", room: "Bay 1", bed: "CICU-05", bedType: "Cardiac Bed", status: "Available", gender: "Any" },
];

export const INITIAL_RMO_NOTES = [
  {
    id: "PN-1001", uhid: "UHID12345685", title: "Morning Ward Round", author: "Dr. Amit Verma", role: "Doctor" as const, category: "Doctor Round", priority: "Routine" as const, createdAt: "Today · 08:40 AM", status: "Signed & Locked" as const,
    subjective: "Patient comfortable at rest. No recurrent chest pain since last evening.", objective: "Hemodynamically stable. BP 120/80 mmHg, pulse 78/min, SpO₂ 98%.", assessment: "Stable angina with controlled symptoms. No signs of acute cardiac event.", plan: "Continue ACS protocol. Continue antiplatelet and statin therapy. Await serial cardiology review.", noteText: "Patient comfortable at rest. No recurrent chest pain since last evening. Hemodynamically stable. Continue ACS protocol. Await serial cardiology decision.",
  },
];