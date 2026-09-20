import type { TherapySession } from "../types";
import { therapySessions } from "../mocks/therapySessions";

// TODO: 実API実装後は fetch("/api/therapy-sessions") 等に差し替える
export async function fetchTherapySessions(): Promise<TherapySession[]> {
  return therapySessions;
}
