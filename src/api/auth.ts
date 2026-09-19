import type { StaffUser } from "../types";

// TODO: 実API実装後は fetch("/api/auth/login") 等に差し替える
const MOCK_STAFF: { id: string; password: string; user: StaffUser } = {
  id: "staff01",
  password: "password123",
  user: { id: "staff01", name: "Front Desk A", role: "reception" },
};

export async function loginRequest(staffId: string, password: string): Promise<StaffUser | null> {
  if (staffId === MOCK_STAFF.id && password === MOCK_STAFF.password) {
    return MOCK_STAFF.user;
  }
  return null;
}
