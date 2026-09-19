import type { Patient } from "../types";
import { patients } from "../mocks/patients";

// TODO: 実API実装後は fetch("/api/patients") 等に差し替える
export async function fetchPatients(): Promise<Patient[]> {
  return patients;
}
