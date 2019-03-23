/**
 * @module components/AppRouter
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter, Switch, Redirect } from 'react-router';

import {
  AuthenticatedRoute,
  UnauthenticatedRoute,
  Login,
  Logout,
  EventsList,
  EventDetail,
  Profile,
  NewUser,
  NewUserSuccess,
  RegistrationConfirmation,
  ForgotPassword,
  ResetPassword,
  OAuthGoogleCallback,
  OAuthMicrosoftCallback,
  GoogleCalendarsList,
  MicrosoftCalendarsList
} from '../../components';
import { sdkActions } from '../../actions';

const AppRouter = props => {

  const { dispatch } = props;
  dispatch(sdkActions.configureSdkBasePath());
  // dispatch(i18nActions.setLocale());
  // dispatch(i18nActions.getTranslations());

  return (
    <Switch>
      <UnauthenticatedRoute path="/login" component={Login} />
      <UnauthenticatedRoute path="/logout" component={Logout} />
      <UnauthenticatedRoute path="/register/success" component={NewUserSuccess} />
      <UnauthenticatedRoute path="/register" component={NewUser} />
      <UnauthenticatedRoute path="/users/confirm/:code" component={RegistrationConfirmation} />
      <UnauthenticatedRoute path="/forgot-password" component={ForgotPassword} />
      <UnauthenticatedRoute path="/reset-password/:code" component={ResetPassword} />

      <AuthenticatedRoute path="/event/:id" component={EventDetail} />
      <AuthenticatedRoute path="/events" component={EventsList} />
      <AuthenticatedRoute path="/profile" component={Profile} />
      <AuthenticatedRoute path="/oauth/google/callback" component={OAuthGoogleCallback} />
      <AuthenticatedRoute path="/oauth/microsoft/callback" component={OAuthMicrosoftCallback} />
      <AuthenticatedRoute path="/google/calendars" component={GoogleCalendarsList} />
      <AuthenticatedRoute path="/microsoft/calendars" component={MicrosoftCalendarsList} />

      <Redirect to="/login" />
    </Switch>
  );

}

AppRouter.propTypes = {
  history: PropTypes.object.isRequired
}

export default compose(
  withRouter, // This is important: https://stackoverflow.com/a/45036930/992285
  connect()
)(AppRouter);
