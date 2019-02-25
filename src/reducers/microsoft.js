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

    case microsoftTypes.OAUTH_URL_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case microsoftTypes.OAUTH_URL_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    case microsoftTypes.OAUTH_URL_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        oAuthUrlIsLoading: action.oAuthUrlIsLoading
      });

    default:
      return state
  }
}

export default microsoft;