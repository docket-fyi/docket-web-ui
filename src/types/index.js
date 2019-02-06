/**
 * @module types
 */

/**********************************/
/* Keep these lists alphabetized! */
/**********************************/

import _authenticationTypes from './authentication';
import _errorTypes from './error';
import _googleTypes from './google';
// import _eventTypes from './event';
import _i18nTypes from './i18n';
import _meTypes from './me';
import _notificationTypes from './notification';
import _sdkTypes from './sdk';
import _userTypes from './user';

export default {
  authentication: _authenticationTypes,
  error: _errorTypes,
  // event: _eventTypes,
  i18n: _i18nTypes,
  me: _meTypes,
  notification: _notificationTypes,
  sdk: _sdkTypes,
  user: _userTypes
};

export const authenticationTypes = _authenticationTypes;
export const errorTypes = _errorTypes;
export const googleTypes = _googleTypes;
// export const eventTypes = _eventTypes;
export const i18nTypes = _i18nTypes;
export const meTypes = _meTypes;
export const notificationTypes = _notificationTypes;
export const sdkTypes = _sdkTypes;
export const userTypes = _userTypes;
