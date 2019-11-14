/**
 * @module utils/api
 */

import * as DocketSdk from '@docket/docket.js';

export default DocketSdk;

/********************************/
/* Keep this list alphabetized! */
/********************************/

export const eventsApi = new DocketSdk.EventsApi();
export const googleApi = new DocketSdk.GoogleApi();
export const localesApi = new DocketSdk.LocalesApi();
export const microsoftApi = new DocketSdk.MicrosoftApi();
export const sessionsApi = new DocketSdk.SessionsApi();
export const translationsApi = new DocketSdk.TranslationsApi();
export const usersApi = new DocketSdk.UsersApi();
