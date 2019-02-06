/**
 * @module actions
 */

/**********************************/
/* Keep these lists alphabetized! */
/**********************************/

import * as _authenticationActions from './authentication';
import * as _errorActions from './error';
// import * as _eventActions from './event';
import * as _googleActions from './google';
import * as _i18nActions from './i18n';
import * as _meActions from './me';
import * as _notitificationActions from './notification';
import * as _sdkActions from './sdk';
import * as _userActions from './user';

export default {
  authentication: _authenticationActions,
  error: _errorActions,
  // event: _eventActions,
  google: _googleActions,
  i18n: _i18nActions,
  me: _meActions,
  notification: _notitificationActions,
  sdk: _sdkActions,
  user: _userActions
};

export const authenticationActions = _authenticationActions;
export const errorActions = _errorActions;
export const googleActions = _googleActions;
// export const eventActions = _eventActions;
export const i18nActions = _i18nActions;
export const meActions = _meActions;
export const notificationActions = _notitificationActions;
export const sdkActions = _sdkActions;
export const userActions = _userActions;
