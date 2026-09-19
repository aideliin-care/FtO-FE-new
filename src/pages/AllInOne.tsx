import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchReservations } from "../api/reservations";
import { fetchDoctors } from "../api/doctors";
import { fetchPatients } from "../api/patients";
import { getDoctorName, getPatientName } from "../utils/lookup";
import type { Doctor, Patient, Reservation } from "../types";

type ViewMode = "week" | "year";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function AllInOne() {
  const { t } = useTranslation();
  const [view, setView] = useState<ViewMode>("week");
  const [doctorFilter, setDoctorFilter] = useState<string>("all");
  const [reservations, setReservations] = useState<Reservation[] | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchReservations().then(setReservations);
    fetchDoctors().then(setDoctors);
    fetchPatients().then(setPatients);
  }, []);

  const today = useMemo(() => new Date(), []);
  const todayIso = toIso(today);
  const weekEndIso = toIso(addDays(today, 7));
  const currentYear = today.getFullYear();

  if (reservations === null) {
    return (
      <div className="page">
        <h2>{t("allInOne.title")}</h2>
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  const filtered = reservations
    .filter((r) => doctorFilter === "all" || r.doctorId === doctorFilter)
    .filter((r) => {
      if (view === "week") {
        return r.date >= todayIso && r.date <= weekEndIso;
      }
      return r.date.slice(0, 4) === String(currentYear);
    })
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  return (
    <div className="page">
      <h2>{t("allInOne.title")}</h2>

      <div className="toolbar">
        <div className="toolbar__group">
          <button
            type="button"
            className={view === "week" ? "toggle-button toggle-button--active" : "toggle-button"}
            onClick={() => setView("week")}
          >
            {t("allInOne.weekView")}
          </button>
          <button
            type="button"
            className={view === "year" ? "toggle-button toggle-button--active" : "toggle-button"}
            onClick={() => setView("year")}
          >
            {t("allInOne.yearView")}
          </button>
        </div>
        <label className="toolbar__group">
          {t("allInOne.filterByDoctor")}
          <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)}>
            <option value="all">{t("allInOne.allDoctors")}</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p>{t("common.noData")}</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>{t("allInOne.date")}</th>
              <th>{t("main.time")}</th>
              <th>{t("main.patient")}</th>
              <th>{t("main.doctor")}</th>
              <th>{t("main.department")}</th>
              <th>{t("main.status")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{getPatientName(patients, r.patientId)}</td>
                <td>{getDoctorName(doctors, r.doctorId)}</td>
                <td>{r.department}</td>
                <td>
                  <span className={`status-badge status-badge--${r.status}`}>
                    {t(`status.${r.status}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>{t("allInOne.doctorInfo")}</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>{t("main.doctor")}</th>
            <th>{t("main.department")}</th>
            <th>{t("allInOne.workingDays")}</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.department}</td>
              <td>{d.workingDays.map((day) => t(`days.${day}`)).join(" / ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
