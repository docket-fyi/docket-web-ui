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
  // NewUserSuccess,
  RegistrationConfirmation,
  ForgotPassword,
  ResetPassword,
  OAuthGoogleCallback,
  OAuthMicrosoftCallback,
  GoogleCalendarsList,
  MicrosoftCalendarsList
} from '../../components';
import { sdkActions } from '../../actions';
// import routes from '../../routes'

const AppRouter = props => {

  const { dispatch, sdk } = props;
  if (!sdk.basePath) {
    dispatch(sdkActions.configureSdkBasePath());
  }
  // dispatch(i18nActions.setLocale());
  // dispatch(i18nActions.getTranslations());

  return (
    <Switch>
      <UnauthenticatedRoute path="/login" component={Login} />
      <UnauthenticatedRoute path="/logout" component={Logout} />
      {/* <UnauthenticatedRoute path="/register/success" component={NewUserSuccess} /> */}
      <UnauthenticatedRoute path="/register" component={NewUser} />
      <UnauthenticatedRoute path="/confirm-registration" component={RegistrationConfirmation} />
      <UnauthenticatedRoute path="/forgot-password" component={ForgotPassword} />
      <UnauthenticatedRoute path="/reset-password" component={ResetPassword} />

      <AuthenticatedRoute path="/events" component={EventsList} />
      <AuthenticatedRoute path="/events/:id/:slug" component={EventDetail} />
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

function mapStateToProps(state) {
  return {
    sdk: state.sdk
  }
}

export default compose(
  withRouter, // This is important: https://stackoverflow.com/a/45036930/992285
  connect(mapStateToProps)
)(AppRouter);
