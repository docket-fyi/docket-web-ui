/**
 * @module actions/error
 */

import { errorTypes } from '../types';

/**
 * [enqueued description]
 * @return {Object}
 */
export function enqueued(message, autoHide = false, autoHideDuration = 4000) {
  if (autoHide && !autoHideDuration) {
    autoHideDuration = (message.split(' ').length * 1000) / 2;
  }
  return {
    type: errorTypes.ERROR_ENQUEUED,
    message,
    autoHide,
    autoHideDuration
  }
}

/**
 * [dequeued description]
 * @return {Object}
 */
export function dequeued(response) {
  return {
    type: errorTypes.ERROR_DEQUEUED,
    response
  }
}

export function closed() {
  return {
    type: errorTypes.ERROR_CLOSED
  }
}
