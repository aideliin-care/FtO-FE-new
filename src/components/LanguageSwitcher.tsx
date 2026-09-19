import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../i18n";

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  ja: "日本語",
  ko: "한국어",
  "zh-TW": "台湾語",
};

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <label className="language-switcher">
      <span className="language-switcher__label">{t("common.language")}</span>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <option key={lng} value={lng}>
            {LANGUAGE_LABELS[lng]}
          </option>
        ))}
      </select>
    </label>
  );
}
