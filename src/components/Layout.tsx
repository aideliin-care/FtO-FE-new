import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "../auth/AuthContext";

const NAV_ITEMS = [
  { to: "/", key: "nav.main" },
  { to: "/all-in-one", key: "nav.allInOne" },
  { to: "/notification", key: "nav.notification" },
  { to: "/patient-info", key: "nav.patientInfo" },
];

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 className="app-header__title">{t("app.title")}</h1>
        <nav className="app-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => "app-nav__link" + (isActive ? " app-nav__link--active" : "")}
              end={item.to === "/"}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="app-header__actions">
          <LanguageSwitcher />
          <button type="button" className="logout-button" onClick={logout}>
            {t("nav.logout")}
          </button>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
