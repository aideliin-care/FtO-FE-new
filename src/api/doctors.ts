import type { Doctor } from "../types";
import { doctors } from "../mocks/doctors";

// TODO: 実API実装後は fetch("/api/doctors") 等に差し替える
export async function fetchDoctors(): Promise<Doctor[]> {
  return doctors;
}
