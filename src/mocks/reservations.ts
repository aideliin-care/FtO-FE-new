import type { Reservation } from "../types";

export const reservations: Reservation[] = [
  // Today (2026-09-19)
  { id: "r1", patientId: "p1", doctorId: "d1", date: "2026-09-19", time: "09:00", department: "Internal Medicine", status: "completed" },
  { id: "r2", patientId: "p2", doctorId: "d2", date: "2026-09-19", time: "10:30", department: "Pediatrics", status: "in-progress" },
  { id: "r3", patientId: "p3", doctorId: "d3", date: "2026-09-19", time: "13:00", department: "Orthopedics", status: "checked-in" },
  { id: "r4", patientId: "p5", doctorId: "d1", date: "2026-09-19", time: "15:30", department: "Internal Medicine", status: "checked-in" },

  // This week
  { id: "r5", patientId: "p4", doctorId: "d4", date: "2026-09-21", time: "11:00", department: "Dermatology", status: "checked-in" },
  { id: "r6", patientId: "p1", doctorId: "d1", date: "2026-09-22", time: "09:30", department: "Internal Medicine", status: "checked-in" },
  { id: "r7", patientId: "p2", doctorId: "d2", date: "2026-09-23", time: "14:00", department: "Pediatrics", status: "checked-in" },

  // Later in the year
  { id: "r8", patientId: "p3", doctorId: "d3", date: "2026-10-05", time: "10:00", department: "Orthopedics", status: "checked-in" },
  { id: "r9", patientId: "p5", doctorId: "d1", date: "2026-11-12", time: "16:00", department: "Internal Medicine", status: "checked-in" },
  { id: "r10", patientId: "p4", doctorId: "d4", date: "2026-12-01", time: "09:00", department: "Dermatology", status: "checked-in" },

  // Cancelled example
  { id: "r11", patientId: "p2", doctorId: "d2", date: "2026-09-19", time: "17:00", department: "Pediatrics", status: "cancelled" },
];
