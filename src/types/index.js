/**
 * @module types
 */

/**********************************/
/* Keep these lists alphabetized! */
/**********************************/

import _authenticationTypes from './authentication';
import _notificationTypes from './notification';
import _googleTypes from './google';
// import _eventTypes from './event';
import _i18nTypes from './i18n';
import _meTypes from './me';
import _microsoftTypes from './microsoft';
import _nativeNotificationTypes from './native-notification';
import _sdkTypes from './sdk';
import _userTypes from './user';
import _searchTypes from './search';
import _socketIoTypes from './socket-io';

export default {
  authentication: _authenticationTypes,
  notification: _notificationTypes,
  // event: _eventTypes,
  i18n: _i18nTypes,
  me: _meTypes,
  microsoft: _microsoftTypes,
  nativeNotification: _nativeNotificationTypes,
  sdk: _sdkTypes,
  user: _userTypes,
  search: _searchTypes,
  socket: _socketIoTypes
};

export const authenticationTypes = _authenticationTypes;
export const notificationTypes = _notificationTypes;
export const googleTypes = _googleTypes;
// export const eventTypes = _eventTypes;
export const i18nTypes = _i18nTypes;
export const meTypes = _meTypes;
export const microsoftTypes = _microsoftTypes;
export const nativeNotificationTypes = _nativeNotificationTypes;
export const sdkTypes = _sdkTypes;
export const userTypes = _userTypes;
export const searchTypes = _searchTypes;
export const socketIoTypes = _socketIoTypes;
