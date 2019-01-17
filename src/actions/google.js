/**
 * @module actions/google
 */

import { googleTypes } from '../types';
import { googleApi } from '../api';
import history from '../history';

/**
 * [oauthUrlRequested description]
 *
 * @return  {[type]}     [return description]
 */
export function oauthUrlRequested() {
  return {
    type: googleTypes.OAUTH_URL_REQUESTED,
    isLoading: true
  };
}

/**
 * [oauthUrlRequestSucceeded description]
 *
 * @param   {[type]}  responseBody  [responseBody description]
 *
 * @return  {[type]}                [return description]
 */
export function oauthUrlRequestSucceeded(responseBody) {
  return {
    type: googleTypes.OAUTH_URL_REQUEST_SUCCEEDED,
    isLoading: false,
    responseBody
  };
}

/**
 * [oauthUrlRequestFailed description]
 *
 * @return  {[type]}     [return description]
 */
export function oauthUrlRequestFailed() {
  return {
    type: googleTypes.OAUTH_URL_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [tokensRequested description]
 *
 * @return  {[type]} [return description]
 */
export function tokensRequested() {
  return {
    type: googleTypes.TOKENS_REQUESTED,
    isLoading: true
  }
}

/**
 * [tokensRequestFailed description]
 *
 * @return  {[type]} [return description]
 */
export function tokensRequestFailed() {
  return {
    type: googleTypes.TOKENS_REQUEST_FAILED,
    isLoading: false
  }
}

/**
 * [tokensRequestSucceeded description]
 *
 * @param   {[type]} responseBody [responseBody description]
 *
 * @return  {[type]} [return description]
 */
export function tokensRequestSucceeded(responseBody) {
  return {
    type: googleTypes.TOKENS_REQUEST_SUCCEEDED,
    isLoading: false,
    responseBody
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
      const response = await googleApi.getGoogleAuthUrl()
      if (response && response.data) {
        dispatch(oauthUrlRequestSucceeded(response));
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
      const response = await googleApi.getGoogleAuthTokens(code)
      if (response && response.data) {
        dispatch(tokensRequestSucceeded(response));
        history.push(response.data.url)
      } else {
        dispatch(tokensRequestFailed());
      }
    } catch (err) {
      dispatch(tokensRequestFailed());
    }
  };
}
