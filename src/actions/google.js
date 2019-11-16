/**
 * @module actions/google
 */

import { Deserializer } from 'jsonapi-serializer'

import { googleTypes } from '../types';
import { googleApi } from '../api';
import history from '../history';
import routes from '../routes'

/**
 * [oauthUrlRequested description]
 *
 * @return  {[type]}     [return description]
 */
export function oauthUrlRequested() {
  return {
    type: googleTypes.GOOGLE_OAUTH_URL_REQUESTED,
    oAuthUrlIsLoading: true
  };
}

/**
 * [oauthUrlRequestSucceeded description]
 *
 * @param   {[type]}  responseBody  [responseBody description]
 *
 * @return  {[type]}                [return description]
 */
export function oauthUrlRequestSucceeded() {
  return {
    type: googleTypes.GOOGLE_OAUTH_URL_REQUEST_SUCCEEDED,
    oAuthUrlIsLoading: false
  };
}

/**
 * [oauthUrlRequestFailed description]
 *
 * @return  {[type]}     [return description]
 */
export function oauthUrlRequestFailed() {
  return {
    type: googleTypes.GOOGLE_OAUTH_URL_REQUEST_FAILED,
    oAuthUrlIsLoading: false
  };
}

/**
 * [tokensRequested description]
 *
 * @return  {[type]} [return description]
 */
export function tokensRequested() {
  return {
    type: googleTypes.GOOGLE_TOKENS_REQUESTED,
    tokensIsLoading: true
  }
}

/**
 * [tokensRequestFailed description]
 *
 * @return  {[type]} [return description]
 */
export function tokensRequestFailed() {
  return {
    type: googleTypes.GOOGLE_TOKENS_REQUEST_FAILED,
    tokensIsLoading: false,
    hasTokens: false
  }
}

/**
 * [tokensRequestSucceeded description]
 *
 * @param   {[type]} responseBody [responseBody description]
 *
 * @return  {[type]} [return description]
 */
export function tokensRequestSucceeded() {
  return {
    type: googleTypes.GOOGLE_TOKENS_REQUEST_SUCCEEDED,
    tokensIsLoading: false,
    hasTokens: true
  }
}

export function calendarListRequested() {
  return {
    type: googleTypes.GOOGLE_CALENDARS_REQUESTED,
    calendarsIsLoading: true
  }
}

export function calendarListRequestSucceeded(responseBody) {
  return {
    type: googleTypes.GOOGLE_CALENDARS_REQUEST_SUCCEEDED,
    calendarsIsLoading: false,
    responseBody
  }
}

export function calendarListRequestFailed() {
  return {
    type: googleTypes.GOOGLE_CALENDARS_REQUEST_FAILED,
    calendarsIsLoading: false
  }
}

/**
 * [getOAuthUrl description]
 *
 * @return {Function}
 */
export function getAuthUrl() {
  return async dispatch => {
    dispatch(oauthUrlRequested());
    try {
      const response = await googleApi.getGoogleOAuthUrl()
      if (response && response.data) {
        const deserializedBody = await new Deserializer({keyForAttribute: attr => attr}).deserialize(response)
        dispatch(oauthUrlRequestSucceeded());
        window.location = deserializedBody.url
      } else {
        dispatch(oauthUrlRequestFailed());
      }
    } catch (err) {
      dispatch(oauthUrlRequestFailed());
    }
  };
}

/**
 * [getTokens description]
 *
 * @return {Function}
 */
export function getTokens(code = '') {
  return async dispatch => {
    dispatch(tokensRequested());
    if (!code) {
      dispatch(tokensRequestFailed())
      return
    }
    try {
      const response = await googleApi.getGoogleAuthTokens(code)
      if (response.response.ok) {
        dispatch(tokensRequestSucceeded());
        history.push(routes.google.calendars.list)
      } else {
        dispatch(tokensRequestFailed());
      }
    } catch (err) {
      dispatch(tokensRequestFailed());
    }
  };
}

/**
 * [getCalendarList description]
 *
 * @return {Function}
 */
export function getCalendarList() {
  return async dispatch => {
    dispatch(calendarListRequested());
    try {
      const response = await googleApi.getAllGoogleCalendarLists()
      if (response && response.data) {
        dispatch(calendarListRequestSucceeded(response.data));
      } else {
        dispatch(calendarListRequestFailed());
      }
    } catch (err) {
      dispatch(calendarListRequestFailed());
    }
  };
}
