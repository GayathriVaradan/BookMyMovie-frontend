import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import sverigeTranslation from "./locales/sverige/translation.json";
import tamilTranslation from "./locales/tamil/translation.json";

const resources = {
  sv: { translation: sverigeTranslation },
  tl: { translation: tamilTranslation },
};
i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "sv",
    resources,
    lng: "sv",

    keySeparator: false,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
  });

export default i18n;
