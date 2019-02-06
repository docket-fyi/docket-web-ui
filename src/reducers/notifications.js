/**
 * @module reducers/notifications
 */

import { notificationTypes } from '../types';

const initialState = {
  permission: window.Notification.permission || 'default'
};

function notifications(state = initialState, action) {
  switch (action.type) {

    case notificationTypes.NOTIFICATION_PERMISSION_REQUESTED:
      return Object.assign({}, state, {
        ...state
      });

    case notificationTypes.NOTIFICATION_PERMISSION_GRANTED:
      return Object.assign({}, state, {
        ...state,
        permission: action.permission // 'granted'
      });

    case notificationTypes.NOTIFICATION_PERMISSION_DENIED:
      return Object.assign({}, state, {
        ...state,
        permission: action.permission // 'denied'
      });

    default:
      return state
  }
}

export default notifications;
