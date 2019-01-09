/**
 * @module reducers/authentication
 */

import { authenticationTypes } from '../types';

/**
 * [initialState description]
 * @type {Object}
 */
const initialState = {
  jwt: null,
  isLoading: false,
  currentUser: {
    id: null
  }
};

/**
 * [authentication description]
 * @param  {Object} state  [description]
 * @param  {Object} action [description]
 * @return {Object}        [description]
 */
function authentication(state = initialState, action) {
  switch (action.type) {

    case authenticationTypes.AUTHENTICATION_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: true
      });

    case authenticationTypes.AUTHENTICATION_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        jwt: action.jwt,
        currentUser: action.currentUser,
        isLoading: false
      });

    case authenticationTypes.AUTHENTICATION_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        jwt: initialState.jwt,
        currentUser: initialState.currentUser
      });

    case authenticationTypes.AUTHENTICATION_REVOKED:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        jwt: initialState.jwt,
        currentUser: initialState.currentUser
      });

    default:
      return state;
  }
}

export default authentication;
