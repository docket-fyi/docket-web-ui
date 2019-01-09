/**
 * @module reducers/me
 */

import { meTypes } from '../types';

const initialState = {
  isLoading: false
};

function me(state = initialState, action) {
  switch (action.type) {
    case meTypes.MY_PROFILE_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading
      });

    case meTypes.MY_PROFILE_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading,
        ...action.responseBody
      });

    case meTypes.MY_PROFILE_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading
      });

    case meTypes.DESTROY_ME_REQUESTED:
      // return Object.assign({}, state, {
      //   ...initialState
      // })
      return initialState;

    case meTypes.DESTROY_ME_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state
      })

    case meTypes.DESTROY_ME_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state
      })

      case meTypes.UPDATE_ME_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading
      })

    case meTypes.UPDATE_ME_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        ...action.responseBody,
        isLoading: action.isLoading
      })

    case meTypes.UPDATE_ME_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.isLoading
      })

    default:
      return state;
  }
}

export default me;
