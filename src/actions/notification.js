/**
 * @module actions/notification
 */

import { notificationTypes } from '../types';

const NOTIFICATION_VARIANTS = [
  'info',
  'error',
  'warning',
  'success'
]

/**
 * [enqueued description]
 * @return {Object}
 */
export function enqueued(message = 'An unknown error occurred', options = {}) {
  const defaultOptions = {
    autoHide: false,
    autoHideDuration: null,
    variant: 'error'
  }
  const mergedOptions = Object.assign({}, defaultOptions, options)
  if (!NOTIFICATION_VARIANTS.includes(mergedOptions.variant)) {
    mergedOptions.variant = defaultOptions.variant
  }
  if (mergedOptions.autoHide && !mergedOptions.autoHideDuration) {
    // Set a sensible duration (in milliseconds) based on the number of
    // words in the message, plus a little buffer.
    mergedOptions.autoHideDuration = ((message.split(' ').length * 1000) / 2) + 500;
  }
  return {
    type: notificationTypes.NOTIFICATION_ENQUEUED,
    message,
    options: mergedOptions
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
