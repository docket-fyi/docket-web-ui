import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import environment from './environment';

i18n
  .use(XHR)
  .use(LanguageDetector)
  /*
   * The following is only needed if not using the I18nextProvider component.
   * @see https://react.i18next.com/latest/i18nextprovider#when-to-use
  */
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: (languages, namespaces) => {
        return `${environment.apiBasePath}/${environment.apiVersion}/locales/${languages}/translations`;
      },
      parse: data => {
        return JSON.parse(data).data.reduce((acc, cur) => {
          acc[cur.attributes.key] = cur.attributes.text
          return acc
        }, {})
      }
    },
    ns: ['docket.ui.web'],
    defaultNS: 'docket.ui.web',
    fallbackLng: 'en-US',
    load: 'currentOnly',
    debug: environment.environment !== 'production',
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
