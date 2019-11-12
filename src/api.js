/**
 * @module utils/api
 */

import * as DocketSdk from '@docket/docket.js';

export default DocketSdk;

/********************************/
/* Keep this list alphabetized! */
/********************************/

export const sessionsApi = new DocketSdk.SessionsApi();
export const googleApi = new DocketSdk.GoogleApi();
export const localesApi = new DocketSdk.LocalesApi();
export const translationsApi = new DocketSdk.TranslationsApi();
export const usersApi = new DocketSdk.UsersApi();
export const microsoftApi = new DocketSdk.MicrosoftApi();
