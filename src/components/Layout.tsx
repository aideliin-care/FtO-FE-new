import { useEffect, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "../auth/AuthContext";
import {
  AppointmentsIcon,
  CalendarIcon,
  DashboardIcon,
  HelpIcon,
  LogoutIcon,
  PatientInfoIcon,
  SettingsIcon,
  UserIcon,
} from "./icons";

const NAV_ITEMS = [
  { to: "/", key: "nav.main", Icon: DashboardIcon },
  { to: "/all-in-one", key: "nav.allInOne", Icon: CalendarIcon },
  { to: "/notification", key: "nav.notification", Icon: AppointmentsIcon },
  { to: "/patient-info", key: "nav.patientInfo", Icon: PatientInfoIcon },
];

function useClock(locale: string) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 15);
    return () => window.clearInterval(id);
  }, []);

  const parts = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(now);

  const time = parts
    .filter((p) => p.type === "hour" || p.type === "minute" || p.type === "literal")
    .map((p) => p.value)
    .join("")
    .trim();
  const period = parts.find((p) => p.type === "dayPeriod")?.value ?? "";

  return { time, period };
}

export function Layout({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { time, period } = useClock(i18n.language);

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-clock">
          <span className="app-clock__time">{time}</span>
          <span className="app-clock__period">{period}</span>
        </div>

        <nav className="app-nav">
          {NAV_ITEMS.map(({ to, key, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => "app-nav__link" + (isActive ? " app-nav__link--active" : "")}
            >
              <span className="app-nav__icon">
                <Icon />
              </span>
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className="app-sidebar__footer">
          <span className="app-user">
            <span className="app-user__icon">
              <UserIcon />
            </span>
            {user?.name ?? ""}
          </span>
          <button type="button" className="app-logout" onClick={logout} aria-label={t("nav.logout")}>
            <LogoutIcon />
          </button>
        </div>
      </aside>

      <div className="app-content">
        <div className="app-topbar">
          <LanguageSwitcher />
          <button type="button" className="pill-button">
            <HelpIcon />
            {t("nav.helpCenter")}
          </button>
          <button type="button" className="pill-button">
            <SettingsIcon />
            {t("nav.settings")}
          </button>
        </div>
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
