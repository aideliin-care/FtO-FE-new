import type { Reservation } from "../types";

function offsetIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const today = offsetIso(0);

export const reservations: Reservation[] = [
  // Today
  { id: "r1", patientId: "p1", doctorId: "d1", date: today, time: "09:00", department: "Internal Medicine", status: "completed", durationMinutes: 15 },
  { id: "r2", patientId: "p2", doctorId: "d2", date: today, time: "10:30", department: "Pediatrics", status: "in-progress", durationMinutes: 30 },
  { id: "r3", patientId: "p3", doctorId: "d3", date: today, time: "13:00", department: "Orthopedics", status: "checked-in", durationMinutes: 15 },
  { id: "r4", patientId: "p5", doctorId: "d1", date: today, time: "15:30", department: "Internal Medicine", status: "checked-in", durationMinutes: 20 },
  { id: "r11", patientId: "p2", doctorId: "d2", date: today, time: "17:00", department: "Pediatrics", status: "cancelled", durationMinutes: 15 },

  // This week
  { id: "r5", patientId: "p4", doctorId: "d4", date: offsetIso(2), time: "11:00", department: "Dermatology", status: "checked-in", durationMinutes: 15 },
  { id: "r6", patientId: "p1", doctorId: "d1", date: offsetIso(3), time: "09:30", department: "Internal Medicine", status: "checked-in", durationMinutes: 15 },
  { id: "r7", patientId: "p2", doctorId: "d2", date: offsetIso(4), time: "14:00", department: "Pediatrics", status: "checked-in", durationMinutes: 30 },

  // Later
  { id: "r8", patientId: "p3", doctorId: "d3", date: offsetIso(16), time: "10:00", department: "Orthopedics", status: "checked-in", durationMinutes: 15 },
  { id: "r9", patientId: "p5", doctorId: "d1", date: offsetIso(54), time: "16:00", department: "Internal Medicine", status: "checked-in", durationMinutes: 20 },
  { id: "r10", patientId: "p4", doctorId: "d4", date: offsetIso(73), time: "09:00", department: "Dermatology", status: "checked-in", durationMinutes: 15 },
];
