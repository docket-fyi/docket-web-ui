/**
 * @module components/OAuthCallback
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { googleActions } from '../../actions';
import history from '../../history';
import withQueryParams from '../QueryParams/QueryParams';
import './OAuthCallback.css';

class OAuthCallback extends Component {

  componentDidMount() {
    const { dispatch, queryParams } = this.props
    const { code } = queryParams
    dispatch(googleActions.getTokens(code))
  }

  render() {
    return (
      <div>Loading...</div>
    );
  }

}

OAuthCallback.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    me: state.me
  }
}

export default compose(
  // withRouter,
  withQueryParams,
  connect(mapStateToProps)
)(OAuthCallback);
