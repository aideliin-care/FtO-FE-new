import type { Doctor } from "../types";

export const doctors: Doctor[] = [
  { id: "d1", name: "Tanaka Kenji", department: "Internal Medicine", workingDays: ["mon", "tue", "wed", "thu", "fri"] },
  { id: "d2", name: "Suzuki Aya", department: "Pediatrics", workingDays: ["mon", "wed", "fri"] },
  { id: "d3", name: "Kim Minjun", department: "Orthopedics", workingDays: ["tue", "thu", "sat"] },
  { id: "d4", name: "Lin Hsiaomei", department: "Dermatology", workingDays: ["mon", "tue", "thu", "fri"] },
];
