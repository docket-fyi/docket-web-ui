import { notificationActions } from '../actions';

function eventExpired(dispatch, data) {
  dispatch(notificationActions.eventExpired(data))
}

export default eventExpired;
