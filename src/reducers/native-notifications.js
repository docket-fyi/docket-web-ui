/**
 * @module reducers/native-notifications
 */

import { nativeNotificationTypes } from '../types';

const initialState = {
  permission: window.Notification.permission || 'default'
};

function nativeNotifications(state = initialState, action) {
  switch (action.type) {

    case nativeNotificationTypes.NATIVE_NOTIFICATION_PERMISSION_REQUESTED:
      return Object.assign({}, state, {
        ...state
      });

    case nativeNotificationTypes.NATIVE_NOTIFICATION_PERMISSION_GRANTED:
      return Object.assign({}, state, {
        ...state,
        permission: action.permission // 'granted'
      });

    case nativeNotificationTypes.NATIVE_NOTIFICATION_PERMISSION_DENIED:
      return Object.assign({}, state, {
        ...state,
        permission: action.permission // 'denied'
      });

    default:
      return state
  }
}

export default nativeNotifications;
