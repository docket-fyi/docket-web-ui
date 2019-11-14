/**
 * @module actions/user
 */

import { Deserializer } from 'jsonapi-serializer'

import { userTypes } from '../types';
import { usersApi } from '../api';
import history from '../history';
import routes from '../routes'
import serializers from '../serializers'
import { notificationActions } from '../actions'
import i18next from '../i18n'

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
 * @param  {Object} attributes
 * @param  {String} attributes.email
 * @param  {String} attributes.firstName
 * @return {Object}
 */
export function createUserSucceeded(attributes) {
  return {
    type: userTypes.CREATE_USER_REQUEST_SUCCEEDED,
    isLoading: false,
    attributes
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
 * @param  {String} email
 * @return {Function}
 */
export function register(firstName = '', email = '') {
  return async dispatch => {
    dispatch(createUserRequested());
    if (!firstName || !email) {
      dispatch(createUserFailed());
      return;
    }
    try {
      const requestBody = serializers.users.create.serialize({ firstName, email })
      const response = await usersApi.createUser(requestBody);
      if (response && response.data) {
        const deserializedResponse = await new Deserializer({keyForAttribute: attr => attr}).deserialize(response)
        dispatch(createUserSucceeded(deserializedResponse));
        dispatch(notificationActions.enqueued(i18next.t('thanksForRegistering', {firstName: deserializedResponse.firstName}), {variant: 'success'}));
        history.push(routes.login)
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
export function confirm(code = '', password = '', passwordConfirmation = '') {
  return async dispatch => {
    dispatch(confirmUserRequested());
    if (!code || !password || !passwordConfirmation) {
      dispatch(confirmUserFailed());
      return;
    }
    try {
      const requestBody = serializers.users.confirmRegistration.serialize({password, passwordConfirmation})
      const response = await usersApi.confirmRegistration(code, requestBody);
      if (response && response.errors) {
        dispatch(confirmUserFailed());
      } else {
        dispatch(confirmUserSucceeded());
        dispatch(notificationActions.enqueued(i18next.t('thanksForConfirming', {firstName: ''}), {variant: 'success'}))
        history.push(routes.login);
      }
    } catch (response) {
      response.body.errors.forEach(error => {
        dispatch(notificationActions.enqueued(i18next.t(error.translationKey) || error.message))
      })
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
      const requestBody = serializers.users.forgotPassword.serialize({ email });
      const response = await usersApi.forgotPassword(requestBody);
      if (response && response.response.ok) {
        const deserializedResponse = await new Deserializer({keyForAttribute: attr => attr}).deserialize(response)
        dispatch(forgotPasswordSucceeded(deserializedResponse));
        dispatch(notificationActions.enqueued(i18next.t('forgotPasswordCheckEmail'), {variant: 'success'}));
        history.push(routes.login);
      } else {
        dispatch(forgotPasswordFailed());
      }
    } catch (response) {
      response.body.errors.forEach(error => {
        dispatch(notificationActions.enqueued(i18next.t(error.translationKey) || error.message))
      })
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
    if (!code || !password || !passwordConfirmation) {
      dispatch(resetPasswordFailed());
      return;
    }
    try {
      const requestBody = serializers.users.resetPassword.serialize({ password, passwordConfirmation})
      const response = await usersApi.resetPassword(code, requestBody);
      if (response && response.errors) {
        dispatch(resetPasswordFailed());
      } else {
        const deserializedResponse = await new Deserializer({keyForAttribute: attr => attr}).deserialize(response)
        dispatch(resetPasswordSucceeded(deserializedResponse));
        dispatch(notificationActions.enqueued(i18next.t('passwordSuccessfullyReset', {firstName: ''}), {variant: 'success'}))
        history.push(routes.login);
      }
    } catch (response) {
      response.body.errors.forEach(error => {
        dispatch(notificationActions.enqueued(i18next.t(error.translationKey) || error.message))
      })
      dispatch(resetPasswordFailed());
    }
  }
}
