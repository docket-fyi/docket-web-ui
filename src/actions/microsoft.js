/**
 * @module actions/microsoft
 */

import { microsoftTypes } from '../types';
import { microsoftApi } from '../api';
import history from '../history';

/**
 * [oauthUrlRequested description]
 *
 * @return  {[type]}     [return description]
 */
export function oauthUrlRequested() {
  return {
    type: microsoftTypes.OAUTH_URL_REQUESTED,
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
    type: microsoftTypes.OAUTH_URL_REQUEST_SUCCEEDED,
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
    type: microsoftTypes.OAUTH_URL_REQUEST_FAILED,
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
    type: microsoftTypes.TOKENS_REQUESTED,
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
    type: microsoftTypes.TOKENS_REQUEST_FAILED,
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
    type: microsoftTypes.TOKENS_REQUEST_SUCCEEDED,
    tokensIsLoading: false,
    hasTokens: true
  }
}

export function calendarListRequested() {
  return {
    type: microsoftTypes.CALENDARS_REQUESTED,
    calendarsIsLoading: true
  }
}

export function calendarListRequestSucceeded(responseBody) {
  return {
    type: microsoftTypes.CALENDARS_REQUEST_SUCCEEDED,
    calendarsIsLoading: false,
    responseBody
  }
}

export function calendarListRequestFailed() {
  return {
    type: microsoftTypes.CALENDARS_REQUEST_FAILED,
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
      const response = await microsoftApi.getMicrosoftOAuthUrl()
      if (response && response.data) {
        dispatch(oauthUrlRequestSucceeded());
        window.location = response.data.url
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
      const response = await microsoftApi.getMicrosoftAuthTokens(code)
      if (response.response.ok) {
        dispatch(tokensRequestSucceeded());
        history.push(`/microsoft/calendars`)
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
      const response = await microsoftApi.getAllMicrosoftCalendarLists()
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
