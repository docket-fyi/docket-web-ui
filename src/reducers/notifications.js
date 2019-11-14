/**
 * @module reducers/errors
 */

import { notificationTypes } from '../types';

const initialState = {
  all: [],
  isOpen: false,
  // count: 0,
  current: {}
};

function notifications(state = initialState, action) {
  switch (action.type) {

    case notificationTypes.NOTIFICATION_ENQUEUED:
      return Object.assign({}, state, {
        ...state,
        isOpen: true,
        // all: state.all.concat(action.response.response.body.errors[0].title),
        all: state.all.concat({
          message: action.message,
          translationKey: action.translationKey,
          autoHide: action.options.autoHide,
          autoHideDuration: action.options.autoHideDuration,
          variant: action.options.variant
        }),
        // count: state.count + 1
      });

    case notificationTypes.NOTIFICATION_DEQUEUED:
      return Object.assign({}, state, {
        ...state,
        isOpen: !!state.all.slice(1).length,
        all: state.all.slice(1),
        // count: state.count - 1
      });

    case notificationTypes.NOTIFICATION_CLOSED:
      return Object.assign({}, state, {
        ...state,
        isOpen: false
      });

    case notificationTypes.NOTIFICATIONS_CLEARED:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}

export default notifications;
