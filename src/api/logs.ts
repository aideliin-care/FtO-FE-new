import type { LogEntry } from "../types";
import { logs } from "../mocks/logs";

// TODO: 実API実装後は fetch("/api/logs") 等に差し替える
export async function fetchLogs(): Promise<LogEntry[]> {
  return logs;
}
