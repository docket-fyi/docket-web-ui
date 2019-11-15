import { nativeNotificationActions } from '../actions';

function eventExpired(dispatch, data) {
  dispatch(nativeNotificationActions.eventExpired(data))
}

export default eventExpired;
