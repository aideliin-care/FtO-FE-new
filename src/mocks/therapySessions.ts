import type { TherapySession } from "../types";
import { offsetIso } from "../utils/date";

const today = offsetIso(0);

export const therapySessions: TherapySession[] = [
  { id: "t1", therapist: "Therapist A", patientId: "p1", doctorId: "d1", date: today, time: "09:00", durationMinutes: 15 },
  { id: "t2", therapist: "Therapist B", patientId: "p2", doctorId: "d2", date: today, time: "09:00", durationMinutes: 15 },
  { id: "t3", therapist: "Therapist C", patientId: "p3", doctorId: "d3", date: today, time: "09:00", durationMinutes: 15 },
  { id: "t4", therapist: "Therapist A", patientId: "p4", doctorId: "d4", date: today, time: "10:00", durationMinutes: 30 },
  { id: "t5", therapist: "Therapist B", patientId: "p5", doctorId: "d1", date: today, time: "11:00", durationMinutes: 15 },
  { id: "t6", therapist: "Therapist C", patientId: "p1", doctorId: "d3", date: today, time: "11:00", durationMinutes: 20 },
  { id: "t7", therapist: "Therapist A", patientId: "p2", doctorId: "d2", date: today, time: "13:00", durationMinutes: 15 },
  { id: "t8", therapist: "Therapist B", patientId: "p3", doctorId: "d3", date: today, time: "14:00", durationMinutes: 15 },
];
