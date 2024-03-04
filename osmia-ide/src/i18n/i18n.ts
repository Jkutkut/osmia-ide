// Use:
// import { useTranslation } from 'react-i18next';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.i18n.json";
import es from "./es.i18n.json";

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {translation: en},
    es: {translation: es},
  },
});
