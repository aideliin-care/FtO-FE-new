import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import zhTW from "./locales/zh-TW.json";

export const SUPPORTED_LANGUAGES = ["ja", "ko", "zh-TW"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = "hospital-staff-app-language";

function getInitialLanguage(): SupportedLanguage {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
    return stored as SupportedLanguage;
  }
  return "ja";
}

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    ko: { translation: ko },
    "zh-TW": { translation: zhTW },
  },
  lng: getInitialLanguage(),
  fallbackLng: "ja",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  window.localStorage.setItem(STORAGE_KEY, lng);
});

export default i18n;
