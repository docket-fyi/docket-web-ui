/**
 * @module actions/me
 */

import { meTypes } from '../types';
import { usersApi } from '../api';
import history from '../history';
import { authenticationActions } from './index';
import routes from '../routes'

/**
 * [myEventsRequested description]
 *
 * @return {Object}
 */
export function myEventsRequested() {
  return {
    type: meTypes.MY_EVENTS_REQUESTED,
    isLoading: true
  };
}

/**
 * [myEventsSucceeded description]
 *
 * @param  {Array} responseBody
 * @return {Object}
 */
export function myEventsSucceeded(responseBody) {
  return {
    type: meTypes.MY_EVENTS_REQUEST_SUCCEEDED,
    isLoading: false,
    responseBody
  };
}

/**
 * [myEventsFailed description]
 *
 * @return {Object}
 */
export function myEventsFailed() {
  return {
    type: meTypes.MY_EVENTS_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [myEventRequested description]
 *
 * @return {Object}
 */
export function myEventRequested() {
  return {
    type: meTypes.MY_EVENT_REQUESTED,
    isLoading: true
  };
}

/**
 * [myEventSucceeded description]
 *
 * @return {Object}
 */
export function myEventSucceeded(responseBody) {
  return {
    type: meTypes.MY_EVENT_REQUEST_SUCCEEDED,
    responseBody,
    isLoading: false
  };
}

/**
 * [myEventFailed description]
 *
 * @return {Object}
 */
export function myEventFailed() {
  return {
    type: meTypes.MY_EVENT_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [updateMyEventRequested description]
 *
 * @return {Object}
 */
export function updateMyEventRequested() {
  return {
    type: meTypes.UPDATE_MY_EVENT_REQUESTED,
    isLoading: true
  };
}

/**
 * [updateMyEventSucceeded description]
 *
 * @return {Object}
 */
export function updateMyEventSucceeded(responseBody) {
  return {
    type: meTypes.UPDATE_MY_EVENT_REQUEST_SUCCEEDED,
    responseBody,
    isLoading: false
  };
}

/**
 * [updateMyEventFailed description]
 *
 * @return {Object}
 */
export function updateMyEventFailed() {
  return {
    type: meTypes.UPDATE_MY_EVENT_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [destroyMyEventRequested description]
 *
 * @return {Object}
 */
export function destroyMyEventRequested() {
  return {
    type: meTypes.DESTROY_MY_EVENT_REQUESTED,
    isLoading: true
  };
}

/**
 * [destroyMyEventSucceeded description]
 *
 * @return {Object}
 */
export function destroyMyEventSucceeded() {
  return {
    type: meTypes.DESTROY_MY_EVENT_REQUEST_SUCCEEDED,
    isLoading: false
  };
}

/**
 * [destroyMyEventFailed description]
 *
 * @return {Object}
 */
export function destroyMyEventFailed() {
  return {
    type: meTypes.DESTROY_MY_EVENT_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [createMyEventRequested description]
 *
 * @return {Object}
 */
export function createMyEventRequested() {
  return {
    type: meTypes.CREATE_MY_EVENT_REQUESTED,
    isLoading: true
  };
}

/**
 * [createMyEventSucceeded description]
 *
 * @return {Object}
 */
export function createMyEventSucceeded(requestBody) {
  return {
    type: meTypes.CREATE_MY_EVENT_REQUEST_SUCCEEDED,
    requestBody,
    isLoading: false
  };
}

/**
 * [createMyEventFailed description]
 *
 * @return {Object}
 */
export function createMyEventFailed() {
  return {
    type: meTypes.CREATE_MY_EVENT_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [myProfileRequested description]
 *
 * @return {Object}
 */
export function myProfileRequested() {
  return {
    type: meTypes.MY_PROFILE_REQUESTED,
    isLoading: true
  };
}

/**
 * [myProfileSucceeded description]
 *
 * @return {Object}
 */
export function myProfileSucceeded(responseBody) {
  return {
    type: meTypes.MY_PROFILE_REQUEST_SUCCEEDED,
    responseBody,
    isLoading: false
  };
}

/**
 * [myProfileFailed description]
 *
 * @return {Object}
 */
export function myProfileFailed() {
  return {
    type: meTypes.MY_PROFILE_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [destroyMeRequested description]
 *
 * @return {Object}
 */
export function destroyMeRequested() {
  return {
    type: meTypes.DESTROY_ME_REQUESTED,
    isLoading: true
  };
}

/**
 * [destroyMeSucceeded description]
 *
 * @return {Object}
 */
export function destroyMeSucceeded() {
  return {
    type: meTypes.DESTROY_ME_REQUEST_SUCCEEDED,
    isLoading: false
  };
}

/**
 * [destroyMeFailed description]
 *
 * @return {Object}
 */
export function destroyMeFailed() {
  return {
    type: meTypes.DESTROY_ME_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [updateMeRequested description]
 *
 * @return {Object}
 */
export function updateMeRequested() {
  return {
    type: meTypes.UPDATE_ME_REQUESTED,
    isLoading: true
  };
}

/**
 * [updateMeSucceeded description]
 *
 * @return {Object}
 */
export function updateMeSucceeded(responseBody) {
  return {
    type: meTypes.UPDATE_ME_REQUEST_SUCCEEDED,
    responseBody,
    isLoading: false
  };
}

/**
 * [updateMeFailed description]
 *
 * @return {Object}
 */
export function updateMeFailed() {
  return {
    type: meTypes.UPDATE_ME_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [updateMeRequested description]
 *
 * @return {Object}
 */
export function importMyEventsRequested() {
  return {
    type: meTypes.IMPORT_MY_EVENTS_REQUESTED,
    isLoading: true
  };
}

/**
 * [updateMeSucceeded description]
 *
 * @return {Object}
 */
export function importMyEventsSucceeded(responseBody) {
  return {
    type: meTypes.IMPORT_MY_EVENTS_REQUEST_SUCCEEDED,
    responseBody,
    isLoading: false
  };
}

/**
 * [updateMeFailed description]
 *
 * @return {Object}
 */
export function importMyEventsFailed() {
  return {
    type: meTypes.IMPORT_MY_EVENTS_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [destroy description]
 *
 * @return {Function}
 */
export function destroy() {
  return async dispatch => {
    dispatch(destroyMeRequested());
    try {
      const response = await usersApi.destroyMyProfile()
      if (response) {
        dispatch(destroyMeSucceeded())
        dispatch(authenticationActions.logout())
      } else {
        dispatch(destroyMeFailed())
      }
    } catch (err) {
      dispatch(destroyMeFailed());
    }
  };
}

/**
 * [profile description]
 *
 * @return {Function}
 */
export function getProfile() {
  return async dispatch => {
    dispatch(myProfileRequested());
    try {
      const meResponse = await usersApi.getMyProfile()
      if (meResponse && meResponse.data) {
        const profile = meResponse.data
        dispatch(myProfileSucceeded(profile))
      } else {
        dispatch(myProfileFailed())
      }
    } catch (err) {
      dispatch(myProfileFailed());
    }
  };
}

/**
 * [update description]
 *
 * @param  {FormData} formData
 * @return {Function}
 */
export function update(formData) {
  return async dispatch => {
    dispatch(updateMeRequested());
    try {
      const user = {};
      for (let entry of formData.entries()) {
        const key = entry[0];
        const value = entry[1];
        user[key] = value;
      }
      const requestBody = {
        data: {
          attributes: {
            ...user
          }
        }
      }
      const meResponse = await usersApi.updateMyProfile(requestBody)
      if (meResponse && meResponse.data) {
        const profile = meResponse.data
        dispatch(updateMeSucceeded(profile))
      } else {
        dispatch(updateMeFailed())
      }
    } catch (err) {
      dispatch(updateMeFailed());
    }
  };
}

/**
 * [getEvents description]
 *
 * @return {Function}
 */
export function getEvents() {
  return async dispatch => {
    dispatch(myEventsRequested());
    try {
      const myEventsResponse = await usersApi.listMyEvents()
      if (myEventsResponse && myEventsResponse.data) {
        const events = myEventsResponse.data
        dispatch(myEventsSucceeded(events))
      } else {
        dispatch(myEventsFailed())
      }
    } catch (err) {
      dispatch(myEventsFailed());
    }
  };
}

/**
 * [getEventById description]
 *
 * @param  {String} id
 * @return {Function}
 */
export function getEventById(id) {
  return async dispatch => {
    dispatch(myEventRequested());
    if (!id) {
      dispatch(myEventFailed())
      return
    }
    try {
      const myEventResponse = await usersApi.getMyEventById(id)
      if (myEventResponse && myEventResponse.data) {
        const event = myEventResponse.data
        dispatch(myEventSucceeded(event))
      } else {
        history.push(routes.events.list);
        dispatch(myEventFailed())
      }
    } catch (err) {
      history.push(routes.events.list);
      dispatch(myEventFailed());
    }
  };
}

/**
 * [createEvent description]
 *
 * @param  {FormData} formData
 * @return {Function}
 */
export function createEvent(formData) {
  return async dispatch => {
    dispatch(createMyEventRequested());
    try {
      const event = {};
      for (let entry of formData.entries()) {
        const key = entry[0];
        const value = entry[1];
        event[key] = value;
      }
      // const requestBody = new MeEventsPostRequestBody(event);
      const requestBody = {
        data: {
          attributes: {
            ...event
          }
        }
      };
      const myEventResponse = await usersApi.createMyEvent(requestBody);
      if (myEventResponse && myEventResponse.data) {
        const event = myEventResponse.data;
        dispatch(createMyEventSucceeded(event));
      } else {
        dispatch(createMyEventFailed());
      }
    } catch (err) {
      dispatch(createMyEventFailed());
    }
  };
}

/**
 * [importEvents description]
 *
 * @param  {FormData} formData
 * @return {Function}
 */
export function importEvents(events) {
  return async dispatch => {
    dispatch(importMyEventsRequested());
    try {
      const transformedEvents = events.map(event => ({
        name: event.summary || event.subject,
        date: event.start.date
      }))
      const requestBody = {
        data: transformedEvents
      };
      const importMyEventsResponse = await usersApi.importMyEvents(requestBody)
      if (importMyEventsResponse && importMyEventsResponse.data) {
        const events = importMyEventsResponse.data
        dispatch(importMyEventsSucceeded(events))
      } else {
        dispatch(importMyEventsFailed());
      }
    } catch (err) {
      // if (importMyEventsResponse.response.status === status.FORBIDDEN) {
        dispatch(importMyEventsFailed());
      //   dispatch(authenticationActions.logout());
      //   return
      // }
    }
  };
}

/**
 * [updateEventById description]
 *
 * @param  {String} id
 * @param  {FormData} formData
 * @return {Function}
 */
export function updateEventById(id, formData) {
  return async dispatch => {
    dispatch(updateMyEventRequested());
    if (!id) {
      dispatch(updateMyEventFailed())
      return
    }
    try {
      const event = {};
      for (let entry of formData.entries()) {
        const key = entry[0];
        const value = entry[1];
        event[key] = value;
      }
      const requestBody = {
        data: {
          attributes: {
            ...event
          }
        }
      };
      const myEventResponse = await usersApi.updateMyEventById(id, requestBody)
      if (myEventResponse && myEventResponse.data) {
        const event = myEventResponse.data
        dispatch(updateMyEventSucceeded(event))
      } else {
        dispatch(updateMyEventFailed())
      }
    } catch (err) {
      dispatch(updateMyEventFailed());
    }
  };
}

/**
 * [destroyEventById description]
 *
 * @param  {String} id
 * @return {Function}
 */
export function destroyEventById(id) {
  return async dispatch => {
    dispatch(destroyMyEventRequested());
    if (!id) {
      dispatch(destroyMyEventFailed())
      return
    }
    try {
      const response = await usersApi.deleteMyEventById(id)
      if (response) {
        dispatch(destroyMyEventSucceeded())
      } else {
        dispatch(destroyMyEventFailed())
      }
    } catch (err) {
      dispatch(destroyMyEventFailed());
    }
    history.push(routes.events.list);
  };
}
