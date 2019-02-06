/**
 * Some description...
 * @module reducers
 */

import { combineReducers } from 'redux';

/**********************************/
/* Keep these lists alphabetized! */
/**********************************/

import authentication from './authentication';
import errors from './errors';
import event from './event';
import events from './events';
import i18n from './i18n';
import me from './me';
import notifications from './notifications';
import sdk from './sdk';

/**
 * [reducers description]
 * @type {Object}
 */
const reducers = {
  authentication,
  errors,
  event,
  events,
  i18n,
  me,
  notifications,
  sdk
}

/**
 * The primary reducer.
 * @type {Function}
 */
const reducer = combineReducers(reducers);

export default reducer;
