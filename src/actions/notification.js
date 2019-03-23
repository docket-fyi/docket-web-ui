/**
 * @module actions/notification
 */

import { notificationTypes } from '../types';
// import { notificationApi } from '../api';

const GRANTED = 'granted';
const DENIED = 'denied';
const DEFAULT = 'default';

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
 * [notificationPermissionDenied description]
 * @return {Object}
 */
export function notificationStarted() {
  return {
    type: notificationTypes.NOTIFICATION_STARTED
  };
}

export function notificationFailed() {
  return {
    type: notificationTypes.NOTIFICATION_FAILED
  };
}

export function notificationSucceeded(notification) {
  return {
    type: notificationTypes.NOTIFICATION_SUCCEEDED,
    notification
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
      /*
      * TODO:
      * Show 'Docket needs your permission to enable desktop notifications' component
      * If user closes, show 'We strongly recommend...Enable / Ask me next time / Never ask again
      * If 'Enable', prompt
      * If 'Ask me next time', ...?
      * If 'Never ask again', deny
      */
      dispatch(notificationPermissionDenied(permission));
    }
  };
}

/**
 * [eventExpired description]
 *
 * @param {Object} data
 */
export function eventExpired(data) {
  return async dispatch => {
    dispatch(notificationStarted());
    if (Notification.permission === DENIED) {
      dispatch(notificationFailed());
      return;
    }
    if (Notification.permission === DEFAULT) {
      dispatch(requestPermission()); // TODO: If user accepts, reprompt?
      return;
    }
    const title = `${data.name} expired!`
    const options = {
      requireInteraction: true,
      body: 'test',
      icon: 'https://static.thenounproject.com/png/93779-200.png',
      image: 'https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg'
      // actions: [
      //   {
      //     action: 'dismiss',
      //     title: 'Dismiss'
      //   }
      // ]
    }
    const notification = new Notification(title, options)
    dispatch(notificationSucceeded(notification))
  }
}
