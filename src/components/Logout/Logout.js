/**
 * @module components/Logout
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { authenticationActions } from '../../actions';
import routes from '../../routes'

class Logout extends Component {

  componentWillMount() {
    this.props.dispatch(authenticationActions.logout());
  }

  render() {
    return <Redirect to={routes.login} />;
  }

}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default compose(
  connect()
)(Logout);
