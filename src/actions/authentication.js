/**
 * @module actions/authentication
 */

import jwtDecode from 'jwt-decode';
import { Deserializer } from 'jsonapi-serializer'

import history from '../history';
import { sdkActions, /*meActions,*/ notificationActions } from './index';
import { authenticationTypes } from '../types';
import { setJwt, removeJwt } from '../local-storage/jwt';
import { sessionsApi } from '../api';
import routes from '../routes'
import i18next from '../i18n'
import serializers from '../serializers'

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
      dispatch(notificationActions.enqueued(i18next.t('pleaseProvidValidEmailAndPassword'), {autoHide: true}));
      dispatch(sdkActions.teardownSdkAuthentication());
      return;
    }
    try {
      const requestBody = serializers.sessions.create.serialize({ email, password });
      const response = await sessionsApi.createSession(requestBody);
      const deserializedResponse = await new Deserializer({keyForAttribute: attr => attr}).deserialize(response)
      // if (response && response.data.jwt) {
        const { jwt } = deserializedResponse;
        dispatch(authenticationSucceeded(jwt));
        // dispatch(sdkActions.setupSdkAuthentication());
        // dispatch(meActions.getProfile());
        dispatch(notificationActions.cleared());
        dispatch(notificationActions.enqueued(i18next.t('welcomeBack', {firstName: ''}), {variant: 'success', autoHide: true}));
      // } else {
      //   dispatch(authenticationFailed());
      //   dispatch(notificationActions.enqueued(response.errors[0]));
      //   dispatch(sdkActions.teardownSdkAuthentication());
      // }
    } catch (response) {
      dispatch(authenticationFailed());
      response.body.errors.forEach(error => {
        dispatch(notificationActions.enqueued(i18next.t(error.translationKey) || error.message));
      })
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
