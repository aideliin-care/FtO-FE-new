import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../auth/AuthContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login(staffId, password);
    setSubmitting(false);
    if (ok) {
      navigate("/", { replace: true });
    } else {
      setError(true);
    }
  }

  return (
    <div className="login-page">
      <div className="login-page__language">
        <LanguageSwitcher />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>{t("login.title")}</h1>
        <label>
          {t("login.staffId")}
          <input
            type="text"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label>
          {t("login.password")}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="login-form__error">{t("login.error")}</p>}
        <button type="submit" disabled={submitting}>{t("login.submit")}</button>
      </form>
    </div>
  );
}
