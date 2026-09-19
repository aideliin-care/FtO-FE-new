import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchReservations } from "../api/reservations";
import { fetchDoctors } from "../api/doctors";
import { fetchPatients } from "../api/patients";
import { getDoctorName, getPatientName } from "../utils/lookup";
import type { Doctor, Patient, Reservation } from "../types";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function Main() {
  const { t } = useTranslation();
  const [reservations, setReservations] = useState<Reservation[] | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchReservations().then(setReservations);
    fetchDoctors().then(setDoctors);
    fetchPatients().then(setPatients);
  }, []);

  if (reservations === null) {
    return (
      <div className="page">
        <h2>{t("main.title")}</h2>
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  const today = todayIso();
  const todaysReservations = reservations
    .filter((r) => r.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="page">
      <h2>{t("main.title")}</h2>
      {todaysReservations.length === 0 ? (
        <p>{t("common.noData")}</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>{t("main.time")}</th>
              <th>{t("main.patient")}</th>
              <th>{t("main.doctor")}</th>
              <th>{t("main.department")}</th>
              <th>{t("main.status")}</th>
            </tr>
          </thead>
          <tbody>
            {todaysReservations.map((r) => (
              <tr key={r.id}>
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
    </div>
  );
}
