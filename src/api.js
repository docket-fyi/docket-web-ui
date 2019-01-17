/**
 * @module utils/api
 */

import * as DocketSdk from '@docket/docket-sdk';

export default DocketSdk;

export const meApi = new DocketSdk.MeApi();
export const userApi = new DocketSdk.UserApi();
export const authApi = new DocketSdk.AuthApi();
export const googleApi = new DocketSdk.GoogleApi();
