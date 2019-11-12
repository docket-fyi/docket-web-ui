/**
 * @module components/AuthenticatedRoute
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { withTranslation } from 'react-i18next';

import { Navbar } from '../index';
import { sdkActions, authenticationActions, notificationActions } from '../../actions';
import { hasJwt, isJwtExpired, getJwt } from '../../local-storage/jwt';
import socket from '../../socket-io';

function AuthenticatedRoute(props) {

  const { dispatch } = props;
  dispatch(notificationActions.requestPermission());
  if (!hasJwt()) {
    props.dispatch(notificationActions.enqueued({translationKey: 'pleaseLoginToContinue'}));
    return <Redirect to="/login" />;
  }
  if (isJwtExpired()) {
    props.dispatch(notificationActions.enqueued({translationKey: 'loginExpired'}));
    return <Redirect to="/login" />;
  }
  const jwt = getJwt()
  socket.emit('docket_user_connected', { jwt })
  dispatch(sdkActions.setupSdkAuthentication(jwt));
  dispatch(authenticationActions.authenticationSucceeded(jwt));
  return (
    <div>
      {/* TODO: <AuthenticatedLayout /> */}
      <Navbar />
      <main>
        <Route {...props} />
      </main>
    </div>
  );

}

AuthenticatedRoute.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default compose(
  withTranslation(),
  connect(),
)(AuthenticatedRoute);
