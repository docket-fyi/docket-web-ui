/**
 * @module reducers/google
 */

import { googleTypes } from '../types';

const initialState = {
  oAuthUrlIsLoading: false,
  tokensIsLoading: false,
  calendarsIsLoading: false,
  hasTokens: false,
  calendars: []
};

function google(state = initialState, action) {
  switch (action.type) {

    case googleTypes.GOOGLE_OAUTH_URL_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case googleTypes.GOOGLE_OAUTH_URL_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case googleTypes.GOOGLE_OAUTH_URL_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case googleTypes.GOOGLE_TOKENS_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        tokensIsLoading: action.tokensIsLoading
      });

    case googleTypes.GOOGLE_TOKENS_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        tokensIsLoading: action.tokensIsLoading,
        hasTokens: action.hasTokens
      });

    case googleTypes.GOOGLE_TOKENS_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        tokensIsLoading: action.tokensIsLoading,
        hasTokens: action.hasTokens
      });

    case googleTypes.GOOGLE_CALENDARS_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        calendarsIsLoading: action.calendarsIsLoading
      });

    case googleTypes.GOOGLE_CALENDARS_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        calendarsIsLoading: action.calendarsIsLoading
      });

    case googleTypes.GOOGLE_CALENDARS_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        calendarsIsLoading: action.calendarsIsLoading,
        calendars: action.responseBody
      });

    default:
      return state
  }
}

export default google;
