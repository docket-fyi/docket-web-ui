/**
 * @module actions/user
 */

import { userTypes } from '../types';
import { usersApi } from '../api';
import history from '../history';

/**
 * [createUserRequested description]
 * @return {Object}
 */
export function createUserRequested() {
  return {
    type: userTypes.CREATE_USER_REQUESTED,
    isLoading: true
  };
}

/**
 * [createUserSucceeded description]
 * @param  {String} jwt
 * @return {Object}
 */
export function createUserSucceeded(responseBody) {
  return {
    type: userTypes.CREATE_USER_REQUEST_SUCCEEDED,
    isLoading: false,
    responseBody
  };
}

/**
 * [createUserFailed description]
 * @return {Object}
 */
export function createUserFailed() {
  return {
    type: userTypes.CREATE_USER_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [confirmUserRequested description]
 *
 * @return  {[type]}  [return description]
 */
export function confirmUserRequested() {
  return {
    type: userTypes.CONFIRM_USER_REQUESTED,
    isLoading: true
  }
}

/**
 * [confirmUserFailed description]
 *
 * @return  {[type]}  [return description]
 */
export function confirmUserFailed() {
  return {
    type: userTypes.CONFIRM_USER_REQUEST_FAILED,
    isLoading: false
  }
}

/**
 * [confirmUserSucceeded description]
 *
 * @param   {[type]}  responseBody  [responseBody description]
 *
 * @return  {[type]}                [return description]
 */
export function confirmUserSucceeded(responseBody) {
  return {
    type: userTypes.CONFIRM_USER_REQUEST_SUCCEEDED,
    isLoading: false,
    responseBody
  }
}

/**
 * [forgotPasswordRequested description]
 *
 * @return  {Object} [return description]
 */
export function forgotPasswordRequested() {
  return {
    type: userTypes.FORGOT_PASSWORD_REQUESTED,
    isLoading: true
  };
}

/**
 * [forgotPasswordSucceeded description]
 *
 * @return  {Object} [return description]
 */
export function forgotPasswordSucceeded(responseBody) {
  return {
    type: userTypes.FORGOT_PASSWORD_REQUEST_SUCCEEDED,
    isLoading: false,
    responseBody
  };
}

/**
 * [forgotPasswordFailed description]
 *
 * @return  {Object} [return description]
 */
export function forgotPasswordFailed() {
  return {
    type: userTypes.FORGOT_PASSWORD_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [resetPasswordRequested description]
 *
 * @return  {[type]}                [return description]
 */
export function resetPasswordRequested() {
  return {
    type: userTypes.RESET_PASSWORD_REQUESTED,
    isLoading: false
  };
}

/**
 * [resetPasswordFailed description]
 *
 * @return  {[type]}                [return description]
 */
export function resetPasswordFailed() {
  return {
    type: userTypes.RESET_PASSWORD_REQUEST_FAILED,
    isLoading: false
  };
}

/**
 * [resetPasswordSucceeded description]
 *
 * @param   {[type]}  responseBody  [responseBody description]
 *
 * @return  {[type]}                [return description]
 */
export function resetPasswordSucceeded(responseBody) {
  return {
    type: userTypes.RESET_PASSWORD_REQUEST_SUCCEEDED,
    isLoading: false,
    responseBody
  };
}

/**
 * [register description]
 *
 * @param  {String} firstName
 * @param  {String} lastName
 * @param  {String} email
 * @param  {String} password
 * @return {Function}
 */
export function register(firstName = '', lastName = '', email = '') {
  return async dispatch => {
    dispatch(createUserRequested());
    if (!firstName || !lastName || !email) {
      dispatch(createUserFailed());
      return;
    }
    try {
      const usersPostRequestBody = {
        data: {
          attributes: {
            firstName,
            lastName,
            email
          }
        }
      };
      const usersResponse = await usersApi.createUser(usersPostRequestBody);
      if (usersResponse && usersResponse.data) {
        dispatch(createUserSucceeded(usersResponse.data));
        history.push('/register/success')
      } else {
        dispatch(createUserFailed());
      }
    } catch (err) {
      dispatch(createUserFailed());
    }
  };
}

/**
 * [confirm description]
 *
 * @param   {String} code [code description]
 *
 * @return  {Function} [return description]
 */
export function confirm(code = '') {
  return async dispatch => {
    dispatch(confirmUserRequested());
    if (!code) {
      dispatch(confirmUserFailed());
      return;
    }
    try {
      const body = {
        data: {
          attributes: {
            password: '',
            passwordConfirmation: ''
          }
        }
      }
      const confirmResponse = await usersApi.confirmRegistration(code, body);
      if (confirmResponse && confirmResponse.response.ok) {
        dispatch(confirmUserSucceeded(confirmResponse));
        history.push('/login');
      } else {
        dispatch(confirmUserFailed());
      }
    } catch (err) {
      dispatch(confirmUserFailed());
    }
  }
}

/**
 * [confirm description]
 *
 * @param   {String} email [code description]
 *
 * @return  {Function} [return description]
 */
export function forgotPassword(email = '') {
  return async dispatch => {
    dispatch(forgotPasswordRequested());
    if (!email) {
      dispatch(forgotPasswordFailed());
      return;
    }
    try {
      const forgotPasswordPostRequestBody = {
        data: {
          attributes: {
            email
          }
        }
      };
      const forgotPasswordResponse = await usersApi.forgotPassword(forgotPasswordPostRequestBody);
      if (forgotPasswordResponse && forgotPasswordResponse.response.ok) {
        dispatch(forgotPasswordSucceeded(forgotPasswordResponse));
        history.push('/login');
      } else {
        dispatch(forgotPasswordFailed());
      }
    } catch (err) {
      dispatch(forgotPasswordFailed());
    }
  }
}

/**
 * [resetPassword description]
 *
 * @param   {String} email [code description]
 *
 * @return  {Function} [return description]
 */
export function resetPassword(code = '', password = '', passwordConfirmation = '') {
  return async dispatch => {
    dispatch(resetPasswordRequested());
    if (!code) {
      dispatch(resetPasswordFailed());
      return;
    }
    if (!password || !passwordConfirmation) {
      dispatch(resetPasswordFailed());
      return;
    }
    if (password !== passwordConfirmation) {
      dispatch(resetPasswordFailed());
      return;
    }
    try {
      const resetPasswordPostRequestBody = {
        data: {
          attributes: {
            password,
            passwordConfirmation
          }
        }
      };
      const resetPasswordResponse = await usersApi.resetPassword(code, resetPasswordPostRequestBody);
      if (resetPasswordResponse && resetPasswordResponse.response.ok) {
        dispatch(resetPasswordSucceeded(resetPasswordResponse));
        history.push('/login');
      } else {
        dispatch(resetPasswordFailed());
      }
    } catch (err) {
      dispatch(resetPasswordFailed());
    }
  }
}
