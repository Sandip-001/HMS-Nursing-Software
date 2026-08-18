// lib/cancel-admission-data.ts
import type { CancelledAdmissionRecord } from "@/types/cancel-admission-types";

export const CANCELLED_ADMISSIONS: CancelledAdmissionRecord[] = [
  {
    requestId: "REQ240520-0015", patientName: "Ravi Sharma", age: 48, gender: "Male", mobile: "9876543210", uhid: "UHID12345685",
    department: "Cardiology", cancelledOnDateTime: "20 May 2024, 11:45 AM", cancelledBy: "Patient/Family", cancelledByName: "Ravi Sharma (Patient)",
    reason: "Patient decided to take treatment later", remarks: "Patient will visit again next month.", status: "Patient Cancelled",
    wardRoom: "Semi Private Room 2 (B-203)", bedType: "General Bed", packageName: "Cardiology Care Package", packageAmount: 45000,
    history: [
      { dateTime: "20 May 2024, 11:20 AM", description: "Bed allocated (B-203) by Anjali Mehta" },
      { dateTime: "20 May 2024, 10:30 AM", description: "Request approved by Dr. Amit Verma" },
    ],
  },
  {
    requestId: "REQ240520-0013", patientName: "Sunita Devi", age: 60, gender: "Female", mobile: "9876543211", uhid: "UHID12345621",
    department: "Neurology", cancelledOnDateTime: "20 May 2024, 10:20 AM", cancelledBy: "Admission Desk", cancelledByName: "Anjali Mehta",
    reason: "Bed not available as per preference", remarks: "Patient offered alternate ward.", status: "Staff Cancelled",
    wardRoom: "General Ward 3 (G-105)", bedType: "General Bed", packageName: "Neurology Package", packageAmount: 32000,
    history: [{ dateTime: "20 May 2024, 09:55 AM", description: "Request submitted by OPD" }],
  },
  {
    requestId: "REQ240519-0098", patientName: "Mohd. Irfan", age: 55, gender: "Male", mobile: "9876543212", uhid: "UHID12345231",
    department: "Orthopedics", cancelledOnDateTime: "19 May 2024, 06:15 PM", cancelledBy: "Patient/Family", cancelledByName: "Mohd. Irfan (Patient)",
    reason: "Financial issues", remarks: "-", status: "Patient Cancelled",
    wardRoom: "General Ward 1 (G-021)", bedType: "General Bed", packageName: "Ortho Basic Package", packageAmount: 28000,
    history: [{ dateTime: "19 May 2024, 05:40 PM", description: "Admission confirmed" }],
  },
  {
    requestId: "REQ240519-0087", patientName: "Neha Gupta", age: 32, gender: "Female", mobile: "9876543213", uhid: "UHID12345111",
    department: "Gynecology", cancelledOnDateTime: "19 May 2024, 04:10 PM", cancelledBy: "Admission Desk", cancelledByName: "Rohit Singh",
    reason: "Duplicate request created", remarks: "Merged with earlier record.", status: "Staff Cancelled",
    wardRoom: "-", bedType: "-", packageName: "-", packageAmount: 0,
    history: [{ dateTime: "19 May 2024, 03:50 PM", description: "Duplicate flagged" }],
  },
  {
    requestId: "REQ240518-0076", patientName: "Arun Kumar", age: 67, gender: "Male", mobile: "9876543214", uhid: "UHID12345056",
    department: "General Medicine", cancelledOnDateTime: "18 May 2024, 02:05 PM", cancelledBy: "Patient/Family", cancelledByName: "Arun Kumar (Patient)",
    reason: "Patient admitted in another hospital", remarks: "-", status: "Patient Cancelled",
    wardRoom: "General Ward 2 (G-045)", bedType: "General Bed", packageName: "General Medicine Package", packageAmount: 22000,
    history: [{ dateTime: "18 May 2024, 01:30 PM", description: "Admission created" }],
  },
  {
    requestId: "REQ240518-0064", patientName: "Pooja Singh", age: 28, gender: "Female", mobile: "9876543215", uhid: "UHID12344999",
    department: "Dermatology", cancelledOnDateTime: "18 May 2024, 11:30 AM", cancelledBy: "Admission Desk", cancelledByName: "Anjali Mehta",
    reason: "Insurance not approved", remarks: "Awaiting re-submission.", status: "Staff Cancelled",
    wardRoom: "-", bedType: "-", packageName: "-", packageAmount: 0,
    history: [{ dateTime: "18 May 2024, 11:00 AM", description: "Insurance verification failed" }],
  },
  {
    requestId: "REQ240517-0048", patientName: "Ramesh Patel", age: 71, gender: "Male", mobile: "9876543216", uhid: "UHID12344877",
    department: "Cardiology", cancelledOnDateTime: "17 May 2024, 07:20 PM", cancelledBy: "Patient/Family", cancelledByName: "Ramesh Patel (Patient)",
    reason: "Health improved, no admission needed", remarks: "-", status: "Patient Cancelled",
    wardRoom: "-", bedType: "-", packageName: "-", packageAmount: 0,
    history: [{ dateTime: "17 May 2024, 06:50 PM", description: "Request submitted by OPD" }],
  },
  {
    requestId: "REQ240517-0039", patientName: "Kavita Verma", age: 45, gender: "Female", mobile: "9876543217", uhid: "UHID12344765",
    department: "Pulmonology", cancelledOnDateTime: "17 May 2024, 05:10 PM", cancelledBy: "Others", cancelledByName: "Transfer Desk",
    reason: "Patient shifted to government hospital", remarks: "-", status: "Others",
    wardRoom: "-", bedType: "-", packageName: "-", packageAmount: 0,
    history: [{ dateTime: "17 May 2024, 04:30 PM", description: "Transfer request received" }],
  },
];

export const CANCEL_DEPARTMENTS = Array.from(new Set(CANCELLED_ADMISSIONS.map((r) => r.department)));
export const CANCEL_REASONS = Array.from(new Set(CANCELLED_ADMISSIONS.map((r) => r.reason)));