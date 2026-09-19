import type { Doctor, Patient } from "../types";

export function getDoctorName(doctors: Doctor[], doctorId: string): string {
  return doctors.find((d) => d.id === doctorId)?.name ?? doctorId;
}

export function getPatientName(patients: Patient[], patientId: string): string {
  return patients.find((p) => p.id === patientId)?.name ?? patientId;
}
