/**
 * @module reducers/i18n
 */

import { i18nTypes } from '../types';

const initialState = {
  translations: {},
  locale: 'en-US',
  isLoading: false
};

function i18n(state = initialState, action) {
  switch (action.type) {

    case i18nTypes.I18N_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: true
      });

    case i18nTypes.I18N_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        translations: action.translations
      });

    case i18nTypes.I18N_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: false
        // translations: initialState.translations
      });

    case i18nTypes.SET_LOCALE:
      return Object.assign({}, state, {
        ...state,
        locale: action.locale
      });

    default:
      return state
  }
}

export default i18n;
