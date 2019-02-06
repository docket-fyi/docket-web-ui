/**
 * @module utils/api
 */

import * as DocketSdk from '@docket/docket.js';

export default DocketSdk;

/********************************/
/* Keep this list alphabetized! */
/********************************/

export const authApi = new DocketSdk.AuthApi();
export const googleApi = new DocketSdk.GoogleApi();
export const i18nApi = new DocketSdk.I18nApi();
export const meApi = new DocketSdk.MeApi();
// export const notificationApi = new DocketSdk.NotificationApi();
export const userApi = new DocketSdk.UserApi();
