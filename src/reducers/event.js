/**
 * @module reducers/event
 */

import { meTypes } from '../types';

const initialState = {
  isLoading: false
};

function event(state = initialState, action) {
  switch (action.type) {
    case meTypes.MY_EVENT_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading
      })

    case meTypes.MY_EVENT_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading,
        ...action.responseBody
      })

    case meTypes.MY_EVENT_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading
      })

    case meTypes.DESTROY_MY_EVENT_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading
      })

    case meTypes.DESTROY_MY_EVENT_REQUEST_SUCCEEDED:
      // return Object.assign({}, state, {
      //   ...state
      // })
      return initialState;

    case meTypes.DESTROY_MY_EVENT_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state
      })

    case meTypes.UPDATE_MY_EVENT_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading
      })

    case meTypes.UPDATE_MY_EVENT_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        ...action.responseBody,
        isLoading: action.isLoading
      })

    case meTypes.UPDATE_MY_EVENT_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading
      })

    default:
      return state
  }
}

export default event;
