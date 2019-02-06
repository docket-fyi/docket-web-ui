/**
 * @module actions/notification
 */

import { notificationTypes } from '../types';
// import { notificationApi } from '../api';

const GRANTED = 'granted';
const DENIED = 'denied';

/**
 * [notificationPermissionRequested description]
 * @return {Object}
 */
export function notificationPermissionRequested() {
  return {
    type: notificationTypes.NOTIFICATION_PERMISSION_REQUESTED
  };
}

/**
 * [notificationPermissionGranted description]
 * @return {Object}
 */
export function notificationPermissionGranted(permission) {
  return {
    type: notificationTypes.NOTIFICATION_PERMISSION_GRANTED,
    permission
  };
}

/**
 * [notificationPermissionDenied description]
 * @return {Object}
 */
export function notificationPermissionDenied(permission) {
  return {
    type: notificationTypes.NOTIFICATION_PERMISSION_DENIED,
    permission
  };
}

/**
 * [requestPermission description]
 *
 * @return {Function}
 */
export function requestPermission() {
  return async dispatch => {
    dispatch(notificationPermissionRequested());
    const permission = await window.Notification.requestPermission();
    if (permission === GRANTED) {
      dispatch(notificationPermissionGranted(permission));
    } else if (permission === DENIED) {
      dispatch(notificationPermissionDenied(permission));
    }
  };
}
