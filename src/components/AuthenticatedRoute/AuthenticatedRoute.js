/**
 * @module components/AuthenticatedRoute
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Container } from 'react-bootstrap';
// import { withRouter } from 'react-router';

import { Navbar } from '../index';
import { sdkActions, authenticationActions, errorActions } from '../../actions';
import { hasJwt, isJwtExpired, getJwt } from '../../local-storage'

function AuthenticatedRoute(props) {
// class AuthenticatedRoute extends Component {

  // shouldComponentUpdate() {}

  const { dispatch } = props;

  if (!hasJwt()) {
    props.dispatch(errorActions.enqueued('Please login to continue'));
    return <Redirect to="/login" />;
  }
  if (isJwtExpired()) {
    props.dispatch(errorActions.enqueued('Login expired'));
    return <Redirect to="/login" />;
  }
  dispatch(sdkActions.setupSdkAuthentication(getJwt()));
  dispatch(authenticationActions.authenticationSucceeded(getJwt()))
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
  // withRouter,
  connect(),
)(AuthenticatedRoute);
