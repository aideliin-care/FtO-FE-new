import type { LogEntry } from "../types";

export const logs: LogEntry[] = [
  { id: "l1", timestamp: "2026-09-19T08:15:00", action: "created", reservationId: "r1", patientName: "Yamada Taro", operator: "Front Desk A" },
  { id: "l2", timestamp: "2026-09-19T08:20:00", action: "created", reservationId: "r2", patientName: "Sato Hanako", operator: "Front Desk A" },
  { id: "l3", timestamp: "2026-09-18T16:40:00", action: "updated", reservationId: "r4", patientName: "Watanabe Ren", operator: "Front Desk B" },
  { id: "l4", timestamp: "2026-09-17T11:05:00", action: "cancelled", reservationId: "r11", patientName: "Sato Hanako", operator: "Front Desk B" },
  { id: "l5", timestamp: "2026-09-15T09:30:00", action: "created", reservationId: "r6", patientName: "Yamada Taro", operator: "Front Desk A" },
  { id: "l6", timestamp: "2026-09-10T13:00:00", action: "created", reservationId: "r8", patientName: "Park Jiwoo", operator: "Front Desk C" },
];
