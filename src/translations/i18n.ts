import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en.json";
import translationPL from "./pl.json";

i18n.use(initReactI18next).init({
	debug: true,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	resources: {
		en: {
			translation: translationEN,
		},
		pl: {
			translation: translationPL,
		},
	},
});

export default i18n;
