/**
 * @module components/AuthenticatedRoute
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Container } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';

import { Navbar } from '../index';
import { sdkActions, authenticationActions, errorActions, notificationActions } from '../../actions';
import { hasJwt, isJwtExpired, getJwt } from '../../local-storage/jwt'

function AuthenticatedRoute(props) {

  const { dispatch, t } = props;
  dispatch(notificationActions.requestPermission());
  if (!hasJwt()) {
    props.dispatch(errorActions.enqueued({translationKey: 'pleaseLoginToContinue'}));
    return <Redirect to="/login" />;
  }
  if (isJwtExpired()) {
    props.dispatch(errorActions.enqueued({translationKey: 'loginExpired'}));
    return <Redirect to="/login" />;
  }
  dispatch(sdkActions.setupSdkAuthentication(getJwt()));
  dispatch(authenticationActions.authenticationSucceeded(getJwt()));
  return (
    <Container fluid>
      {/* TODO: <AuthenticatedLayout /> */}
      <Navbar />
      <main>
        <Route {...props} />
      </main>
    </Container>
  );

}

AuthenticatedRoute.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default compose(
  withNamespaces(),
  connect(),
)(AuthenticatedRoute);
