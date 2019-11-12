/**
 * @module actions/notification
 */

import { notificationTypes } from '../types';

/**
 * [enqueued description]
 * @return {Object}
 */
export function enqueued(error) {
  return {
    type: notificationTypes.NOTIFICATION_ENQUEUED,
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
    type: notificationTypes.NOTIFICATION_DEQUEUED,
    response
  }
}

export function closed() {
  return {
    type: notificationTypes.NOTIFICATION_CLOSED
  }
}
