/**
 * @module actions
 */

/**********************************/
/* Keep these lists alphabetized! */
/**********************************/

import * as _authenticationActions from './authentication';
import * as _notificationActions from './notification';
// import * as _eventActions from './event';
import * as _googleActions from './google';
import * as _i18nActions from './i18n';
import * as _meActions from './me';
import * as _microsoftActions from './microsoft';
import * as _nativeNotificationActions from './native-notification';
import * as _sdkActions from './sdk';
import * as _userActions from './user';

export default {
  authentication: _authenticationActions,
  error: _notificationActions,
  // event: _eventActions,
  google: _googleActions,
  i18n: _i18nActions,
  me: _meActions,
  microsoft: _microsoftActions,
  notification: _nativeNotificationActions,
  sdk: _sdkActions,
  user: _userActions
};

export const authenticationActions = _authenticationActions;
export const errorActions = _notificationActions;
export const googleActions = _googleActions;
// export const eventActions = _eventActions;
export const i18nActions = _i18nActions;
export const meActions = _meActions;
export const microsoftActions = _microsoftActions;
export const notificationActions = _nativeNotificationActions;
export const sdkActions = _sdkActions;
export const userActions = _userActions;
