/**
 * @module actions/sdk
 */

import * as DocketSdk from '@docket/docket.js';

import { sdkTypes } from '../types';
import environment from '../environment';

const defaultClient = DocketSdk.ApiClient.instance;
const jwtAuth = defaultClient.authentications['jwt'];

/**
 * [configureSdkBasePath description]
 * @return {[type]} [description]
 */
export function configureSdkBasePath() {
  const basePath = `${environment.apiBasePath}/${environment.apiVersion}`;
  defaultClient.basePath = basePath
  return {
    type: sdkTypes.SDK_BASE_PATH_CONFIGURED,
    basePath
  }
}

/**
 * [setupSdkAuthentication description]
 * @param  {[type]} jwt [description]
 * @return {[type]}     [description]
 */
export function setupSdkAuthentication(jwt) {
  jwtAuth.apiKey = jwt;
  jwtAuth.apiKeyPrefix = 'Bearer';
  return {
    type: sdkTypes.SDK_AUTHENTICATION_SET_UP
  };
}

/**
 * [teardownSdkAuthentication description]
 * @return {[type]} [description]
 */
export function teardownSdkAuthentication() {
  jwtAuth.apiKey = null;
  jwtAuth.apiKeyPrefix = '';
  // return dispatch => {
  //   dispatch({
  //     type: sdkTypes.SDK_AUTHENTICATION_TORN_DOWN
  //   });
  // }
  return {
    type: sdkTypes.SDK_AUTHENTICATION_TORN_DOWN
  };
}
