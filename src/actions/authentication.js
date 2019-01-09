/**
 * @module actions/authentication
 */

import { AuthPostRequestBody } from "@docket/docket-sdk";
import jwtDecode from 'jwt-decode';

import { sdkActions, meActions } from './index';
import { authenticationTypes } from '../types';
import { setJwt, removeJwt } from '../local-storage';
import { authApi } from '../api';

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
    if (!email || !password) {
      dispatch(authenticationFailed());
      dispatch(sdkActions.teardownSdkAuthentication());
      return;
    }
    try {
      const authPostRequestBody = new AuthPostRequestBody();
      authPostRequestBody.setEmail(email)
      authPostRequestBody.setPassword(password)
      const authResponse = await authApi.auth(authPostRequestBody)
      if (authResponse && authResponse.data.jwt) {
        const { jwt } = authResponse.data
        dispatch(authenticationSucceeded(jwt));
        // dispatch(sdkActions.setupSdkAuthentication());
        dispatch(meActions.getProfile())
      } else {
        dispatch(authenticationFailed());
        dispatch(sdkActions.teardownSdkAuthentication());
      }
    } catch (err) {
      dispatch(authenticationFailed());
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
  };
}
