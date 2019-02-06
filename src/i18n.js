import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(reactI18nextModule) // if not using I18nextProvider
  .init({
    backend: {
      loadPath: (languages, namespaces) => {
        return `${process.env.REACT_APP_API_BASE_PATH}/${process.env.REACT_APP_API_VERSION}/i18n/${languages}`;
      }
    },
    ns: ['docket.ui.web'],
    defaultNS: 'docket.ui.web',
    fallbackLng: 'en-US',
    load: 'currentOnly',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'fallback'
    }
  });

export default i18n;
