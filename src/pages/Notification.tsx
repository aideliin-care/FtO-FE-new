import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchLogs } from "../api/logs";
import type { LogEntry } from "../types";

export function Notification() {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<LogEntry[] | null>(null);

  useEffect(() => {
    fetchLogs().then(setLogs);
  }, []);

  if (logs === null) {
    return (
      <div className="page">
        <h2>{t("notification.title")}</h2>
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  const sortedLogs = [...logs].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="page">
      <h2>{t("notification.title")}</h2>
      {sortedLogs.length === 0 ? (
        <p>{t("common.noData")}</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>{t("notification.timestamp")}</th>
              <th>{t("notification.action")}</th>
              <th>{t("notification.patient")}</th>
              <th>{t("notification.operator")}</th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.timestamp.replace("T", " ")}</td>
                <td>
                  <span className={`log-badge log-badge--${log.action}`}>
                    {t(`action.${log.action}`)}
                  </span>
                </td>
                <td>{log.patientName}</td>
                <td>{log.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
