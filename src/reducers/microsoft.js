/**
 * @module reducers/microsoft
 */

import { microsoftTypes } from '../types';

const initialState = {
  oAuthUrlIsLoading: false,
  tokensIsLoading: false,
  calendarsIsLoading: false,
  hasTokens: false,
  calendars: []
};

function microsoft(state = initialState, action) {
  switch (action.type) {

    case microsoftTypes.MICROSOFT_OAUTH_URL_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case microsoftTypes.MICROSOFT_OAUTH_URL_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case microsoftTypes.MICROSOFT_OAUTH_URL_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

      case microsoftTypes.MICROSOFT_TOKENS_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        tokensIsLoading: action.tokensIsLoading
      });

    case microsoftTypes.MICROSOFT_TOKENS_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        tokensIsLoading: action.tokensIsLoading,
        hasTokens: action.hasTokens
      });

    case microsoftTypes.MICROSOFT_TOKENS_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        tokensIsLoading: action.tokensIsLoading,
        hasTokens: action.hasTokens
      });

    case microsoftTypes.MICROSOFT_CALENDARS_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        calendarsIsLoading: action.calendarsIsLoading
      });

    case microsoftTypes.MICROSOFT_CALENDARS_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        calendarsIsLoading: action.calendarsIsLoading
      });

    case microsoftTypes.MICROSOFT_CALENDARS_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        calendarsIsLoading: action.calendarsIsLoading,
        calendars: action.responseBody
      });

    default:
      return state
  }
}

export default microsoft;
