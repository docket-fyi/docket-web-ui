/**
 * @module actions/i18n
 */

// import i18n from 'i18next';
// import { reactI18nextModule } from 'react-i18next';

import { i18nTypes } from '../types';
import { localesApi, translationsApi } from '../api';
import * as localStorage from '../local-storage/locale';

/**
 * [i18nRequested description]
 * @return {Object}
 */
export function i18nRequested() {
  return {
    type: i18nTypes.I18N_REQUESTED,
    isLoading: true
  };
}

/**
 * [i18nSucceeded description]
 * @param  {String} jwt
 * @return {Object}
 */
export function i18nSucceeded(responseBody) {
  return {
    type: i18nTypes.I18N_REQUEST_SUCCEEDED,
    isLoading: false,
    translations: responseBody.translations
  };
}

/**
 * [createUserFailed description]
 * @return {Object}
 */
export function i18nFailed() {
  return {
    type: i18nTypes.I18N_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [localeSet description]
 * @return {Object}
 */
export function localeSet(locale) {
  return {
    type: i18nTypes.LOCALE_SET,
    locale
  };
}

/**
 * [register description]
 *
 * @param  {String} firstName
 * @param  {String} lastName
 * @param  {String} email
 * @param  {String} password
 * @return {Function}
 */
export function getTranslations(locale = localStorage.getLocale()) {
  return async dispatch => {
    dispatch(i18nRequested());
    if (!locale) {
      dispatch(i18nFailed());
      return;
    }
    try {
      const i18nResponse = await translationsApi.listTranslationsByLocale(locale)
      if (i18nResponse && i18nResponse.data) {
        dispatch(i18nSucceeded(i18nResponse.data));
        // i18n
        //   .use(reactI18nextModule)
        //   .init({
        //     resources: {
        //       en: {
        //         translation: i18nResponse.data.translations
        //       }
        //     },
        //     lng: 'en',
        //     fallbackLng: 'en',
        //     interpolation: {
        //       escapeValue: false
        //     }
        //   });
      } else {
        dispatch(i18nFailed());
      }
    } catch (err) {
      dispatch(i18nFailed());
    }
  };
}

/**
 * [setLocale description]
 * @param {String} locale
 * @return {Function}
 */
export function setLocale(locale = localStorage.getNavigatorLanguage()) {
  return async dispatch => {
    localStorage.setLocale(locale)
    dispatch(localeSet(locale))
  }
}
