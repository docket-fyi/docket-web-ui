/**
 * @module components/AuthenticatedRoute
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { withTranslation } from 'react-i18next';

import { Navbar } from '../index';
import { sdkActions, /*authenticationActions,*/ notificationActions, nativeNotificationActions } from '../../actions';
import { hasJwt, isJwtExpired, getJwt } from '../../local-storage/jwt';
// import socket from '../../socket-io';
import routes from '../../routes'

class AuthenticatedRoute extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    dispatch(sdkActions.setupSdkAuthentication(getJwt()));
    // dispatch(socketIoActions.connect(getJwt()));
    // dispatch(myActions.getMyPermissions());
    dispatch(nativeNotificationActions.requestPermission());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { dispatch, /*socketIo,*/ sdk, nativeNotifications } = this.props
    // if (prevProps.socketIo.connected !== socketIo.connected && !socketIo.connected) {
    //   dispatch(socketIoActions.connect());
    // }
    if (prevProps.sdk.isAuthenticationConfigured !== sdk.isAuthenticationConfigured && !sdk.isAuthenticationConfigured) {
      dispatch(sdkActions.setupSdkAuthentication(getJwt()));
    }
    if (prevProps.nativeNotifications.permission !== nativeNotifications.permission && !nativeNotifications.permission) {
      dispatch(nativeNotificationActions.requestPermission());
    }
  }

  render() {
    const { dispatch, t } = this.props;
    if (!hasJwt()) {
      dispatch(notificationActions.enqueued(t('pleaseLoginToContinue')));
      return <Redirect to={routes.login} />;
    }
    if (isJwtExpired()) {
      dispatch(notificationActions.enqueued(t('loginExpired')));
      return <Redirect to={routes.login} />;
    }
    return (
      <div>
        <Navbar />
        <main>
          <Route {...this.props} />
        </main>
      </div>
    );
  }
}

/*
function AuthenticatedRoute(props) {

  const { dispatch, t } = props;
  dispatch(notificationActions.requestPermission());
  if (!hasJwt()) {
    props.dispatch(notificationActions.enqueued(t('pleaseLoginToContinue')));
    return <Redirect to={routes.login} />;
  }
  if (isJwtExpired()) {
    props.dispatch(notificationActions.enqueued(t('loginExpired')));
    return <Redirect to={routes.login} />;
  }
  const jwt = getJwt()
  socket.emit('docket_user_connected', { jwt })
  dispatch(sdkActions.setupSdkAuthentication(jwt));
  dispatch(.authenticationSucceeded(jwt));
  return (
    <div>
      <Navbar />
      <main>
        <Route {...props} />
      </main>
    </div>
  );

}
*/

AuthenticatedRoute.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    // socketIo: state.socketIo,
    nativeNotifications: state.nativeNotifications,
    sdk: state.sdk
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps),
)(AuthenticatedRoute);
