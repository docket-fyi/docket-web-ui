/**
 * @module reducers/user
 */

import { userTypes } from '../types';

const initialState = {
  isLoading: false
};

function user(state = initialState, action) {
  switch (action.type) {

    case userTypes.CREATE_USER_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.CREATE_USER_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        ...action.responseBody,
        isLoading: state.isLoading
      });

    case userTypes.CREATE_USER_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.CONFIRM_USER_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.CONFIRM_USER_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.CONFIRM_USER_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.FORGOT_PASSWORD_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.FORGOT_PASSWORD_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.FORGOT_PASSWORD_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.RESET_PASSWORD_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.RESET_PASSWORD_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    case userTypes.RESET_PASSWORD_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        isLoading: state.isLoading
      });

    default:
      return state;
  }
}

export default user;
