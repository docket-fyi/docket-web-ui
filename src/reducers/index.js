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
import me from './me';
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
  me,
  sdk
}

/**
 * The primary reducer.
 * @type {Function}
 */
const reducer = combineReducers(reducers);

export default reducer;
