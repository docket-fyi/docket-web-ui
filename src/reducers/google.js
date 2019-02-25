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

    case googleTypes.OAUTH_URL_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case googleTypes.OAUTH_URL_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case googleTypes.OAUTH_URL_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case googleTypes.TOKENS_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        tokensIsLoading: action.tokensIsLoading
      });

    case googleTypes.TOKENS_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        tokensIsLoading: action.tokensIsLoading,
        hasTokens: action.hasTokens
      });

    case googleTypes.TOKENS_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        tokensIsLoading: action.tokensIsLoading,
        hasTokens: action.hasTokens
      });

    case googleTypes.CALENDARS_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        calendarsIsLoading: action.calendarsIsLoading
      });

    case googleTypes.CALENDARS_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        calendarsIsLoading: action.calendarsIsLoading
      });

    case googleTypes.CALENDARS_REQUEST_SUCCEEDED:
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
