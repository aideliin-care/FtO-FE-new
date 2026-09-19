import type { Reservation } from "../types";
import { reservations } from "../mocks/reservations";

// TODO: 実API実装後は fetch("/api/reservations") 等に差し替える
export async function fetchReservations(): Promise<Reservation[]> {
  return reservations;
}
