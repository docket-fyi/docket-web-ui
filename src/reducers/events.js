/**
 * @module reducers/events
 */

import { meTypes } from '../types';

const initialState = {
  all: [],
  isLoading: false
};

function events(state = initialState, action) {
  switch (action.type) {
    case meTypes.MY_EVENTS_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: true
      })

    case meTypes.MY_EVENTS_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        all: action.responseBody
      })

    case meTypes.MY_EVENTS_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: false
      })

    // case meTypes.MY_PROFILE_REQUESTED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.MY_PROFILE_REQUEST_SUCCEEDED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.MY_PROFILE_REQUEST_FAILED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.DESTROY_ME_REQUESTED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.DESTROY_ME_REQUEST_SUCCEEDED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.DESTROY_ME_REQUEST_FAILED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.UPDATE_ME_REQUESTED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.UPDATE_ME_REQUEST_SUCCEEDED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.UPDATE_ME_REQUEST_FAILED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.MY_EVENT_REQUESTED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.MY_EVENT_REQUEST_SUCCEEDED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.MY_EVENT_REQUEST_FAILED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    case meTypes.CREATE_MY_EVENT_REQUESTED:
      return Object.assign({}, state, {
        ...state
      })

    case meTypes.CREATE_MY_EVENT_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        all: state.all.concat(action.requestBody)
      })

    case meTypes.CREATE_MY_EVENT_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state
      })

    // case meTypes.DESTROY_MY_EVENT_REQUESTED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.DESTROY_MY_EVENT_REQUEST_SUCCEEDED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.DESTROY_MY_EVENT_REQUEST_FAILED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.UPDATE_MY_EVENT_REQUESTED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.UPDATE_MY_EVENT_REQUEST_SUCCEEDED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    // case meTypes.UPDATE_MY_EVENT_REQUEST_FAILED:
    //   return Object.assign({}, state, {
    //     ...state
    //   })

    default:
      return state
  }
}

export default events;
