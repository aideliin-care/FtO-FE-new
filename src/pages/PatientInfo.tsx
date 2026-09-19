import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchPatients } from "../api/patients";
import { fetchDoctors } from "../api/doctors";
import { getDoctorName } from "../utils/lookup";
import type { Doctor, Patient } from "../types";

export function PatientInfo() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchPatients().then(setPatients);
    fetchDoctors().then(setDoctors);
  }, []);

  if (patients === null) {
    return (
      <div className="page">
        <h2>{t("patientInfo.title")}</h2>
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page">
      <h2>{t("patientInfo.title")}</h2>

      <div className="toolbar">
        <input
          type="text"
          placeholder={t("patientInfo.search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p>{t("common.noData")}</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>{t("main.patient")}</th>
              <th>{t("patientInfo.birthDate")}</th>
              <th>{t("patientInfo.phone")}</th>
              <th>{t("patientInfo.lastVisit")}</th>
              <th>{t("patientInfo.primaryDoctor")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.birthDate}</td>
                <td>{p.phone}</td>
                <td>{p.lastVisit ?? t("patientInfo.noVisit")}</td>
                <td>{getDoctorName(doctors, p.primaryDoctorId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
