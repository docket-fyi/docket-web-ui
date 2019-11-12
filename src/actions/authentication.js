/**
 * @module actions/authentication
 */

import jwtDecode from 'jwt-decode';

import history from '../history';
import { sdkActions, meActions, notificationActions } from './index';
import { authenticationTypes } from '../types';
import { setJwt, removeJwt } from '../local-storage/jwt';
import { sessionsApi } from '../api';
import routes from '../routes'
import i18next from '../i18n'

/**
 * [authenticationRequested description]
 * @return {Object}
 */
export function authenticationRequested() {
  return {
    type: authenticationTypes.AUTHENTICATION_REQUESTED
    // isLoading: true
  };
}

/**
 * [authenticationSucceeded description]
 * @param  {String} jwt
 * @return {Object}
 */
export function authenticationSucceeded(jwt) {
  setJwt(jwt);
  const currentUser = jwtDecode(jwt);
  return {
    type: authenticationTypes.AUTHENTICATION_REQUEST_SUCCEEDED,
    // isLoading: false,
    jwt,
    currentUser
  };
}

/**
 * [authenticationFailed description]
 * @return {Object}
 */
export function authenticationFailed() {
  removeJwt();
  return {
    type: authenticationTypes.AUTHENTICATION_REQUEST_FAILED
    // isLoading: false,
    // jwt: null
  };
}

/**
 * [authenticationRevoked description]
 * @return {Object}
 */
export function authenticationRevoked() {
  removeJwt();
  return {
    type: authenticationTypes.AUTHENTICATION_REVOKED
  };
}

/**
 * [authenticate description]
 * @param  {String} email
 * @param  {String} password
 * @return {Function}
 */
export function authenticate(email = '', password = '') {
  return async dispatch => {
    dispatch(authenticationRequested());
    if (email || !password) {
      dispatch(authenticationFailed());
      dispatch(notificationActions.enqueued(i18next.t('login')))
      dispatch(sdkActions.teardownSdkAuthentication());
      return;
    }
    try {
      const body = {
        data: {
          attributes: {
            email,
            password
          }
        }
      }
      const authResponse = await sessionsApi.createSession(body)
      if (authResponse && authResponse.data.jwt) {
        const { jwt } = authResponse.data
        dispatch(authenticationSucceeded(jwt));
        // dispatch(sdkActions.setupSdkAuthentication());
        dispatch(notificationActions.enqueued({translationKey: 'welcomeBack', variant: 'primary'}))
        dispatch(meActions.getProfile())
      } else {
        dispatch(authenticationFailed());
        dispatch(notificationActions.enqueued(authResponse.errors[0]))
        dispatch(sdkActions.teardownSdkAuthentication());
      }
    } catch (authErrorResponse) {
      dispatch(authenticationFailed());
      dispatch(notificationActions.enqueued(authErrorResponse.response.body.errors[0]))
      dispatch(sdkActions.teardownSdkAuthentication());
    }
  };
}

/**
 * [logout description]
 * @return {Function}
 */
export function logout() {
  return dispatch => {
    dispatch(authenticationRevoked());
    dispatch(sdkActions.teardownSdkAuthentication());
    history.push(routes.logout);
  };
}
