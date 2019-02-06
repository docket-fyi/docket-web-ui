/**
 * @module actions/error
 */

import { errorTypes } from '../types';

/**
 * [enqueued description]
 * @return {Object}
 */
export function enqueued(error) {
  return {
    type: errorTypes.ERROR_ENQUEUED,
    error,
    // variant: error.variant
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
