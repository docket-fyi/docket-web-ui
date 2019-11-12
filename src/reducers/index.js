/**
 * Some description...
 * @module reducers
 */

import { combineReducers } from 'redux';

/**********************************/
/* Keep these lists alphabetized! */
/**********************************/

import authentication from './authentication';
import notifications from './notifications';
import event from './event';
import events from './events';
import google from './google';
import i18n from './i18n';
import me from './me';
import microsoft from './microsoft';
import nativeNotifications from './native-notifications';
import sdk from './sdk';
import user from './user';

/**
 * [reducers description]
 * @type {Object}
 */
const reducers = {
  authentication,
  notifications,
  event,
  events,
  google,
  i18n,
  me,
  microsoft,
  nativeNotifications,
  sdk,
  user
}

/**
 * The primary reducer.
 * @type {Function}
 */
const reducer = combineReducers(reducers);

export default reducer;
