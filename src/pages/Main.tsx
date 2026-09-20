import { useEffect, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { fetchReservations } from "../api/reservations";
import { fetchDoctors } from "../api/doctors";
import { fetchPatients } from "../api/patients";
import { getPatientName } from "../utils/lookup";
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
    return <p>{t("common.loading")}</p>;
  }

  const today = todayIso();
  const todaysReservations = reservations
    .filter((r) => r.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  const byDoctor = doctors.map((doctor) => ({
    doctor,
    list: todaysReservations.filter((r) => r.doctorId === doctor.id),
  }));

  const timeSlots = Array.from(new Set(todaysReservations.map((r) => r.time))).sort();

  return (
    <div className="dashboard">
      <div className="doctor-card-row">
        {byDoctor.map(({ doctor, list }) => {
          const current = list.filter((r) => r.status !== "checked-in").length;
          return (
            <div className="doctor-card" key={doctor.id}>
              <div className="doctor-card__header">
                <h3 className="doctor-card__name">{doctor.name}</h3>
                <div className="doctor-card__badges">
                  <span className="queue-badge queue-badge--current">
                    <span className="queue-badge__label">{t("main.queueCurrent")}</span>
                    <span className="queue-badge__value">{current}</span>
                  </span>
                  <span className="queue-badge queue-badge--total">
                    <span className="queue-badge__label">{t("main.queueTotal")}</span>
                    <span className="queue-badge__value">{list.length}</span>
                  </span>
                </div>
              </div>
              {list.length === 0 ? (
                <p className="doctor-card__empty">{t("common.noData")}</p>
              ) : (
                <table className="queue-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>{t("main.patient")}</th>
                      <th>{t("main.status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((r, index) => (
                      <tr key={r.id}>
                        <td>{index + 1}</td>
                        <td>{getPatientName(patients, r.patientId)}</td>
                        <td>
                          <span className={`queue-status queue-status--${r.status}`}>
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
        })}
      </div>

      {timeSlots.length > 0 && doctors.length > 0 && (
        <div
          className="schedule-grid"
          style={{ gridTemplateColumns: `100px repeat(${doctors.length}, 1fr)` } as CSSProperties}
        >
          <div className="schedule-grid__corner" />
          {doctors.map((doctor) => (
            <div className="schedule-grid__col-header" key={doctor.id}>
              {doctor.name}
            </div>
          ))}

          {timeSlots.map((slot) => (
            <div className="schedule-grid__row" key={slot} style={{ display: "contents" }}>
              <div className="schedule-grid__time">{slot}</div>
              {doctors.map((doctor) => {
                const r = todaysReservations.find((x) => x.doctorId === doctor.id && x.time === slot);
                return (
                  <div className="schedule-grid__cell" key={`${doctor.id}-${slot}`}>
                    {r && (
                      <div className="appointment-card">
                        <span className="appointment-card__name">{getPatientName(patients, r.patientId)}</span>
                        <span className="appointment-card__meta">
                          {r.department} · {r.durationMinutes}
                          {t("common.minutes")}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
