/**
 * @module components/OAuthCallback
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import { googleActions } from '../../actions';
import withQueryParams from '../QueryParams/QueryParams';
import './OAuthCallback.css';

class OAuthCallback extends Component {

  componentDidMount() {
    const { dispatch, queryParams } = this.props
    const { code } = queryParams
    dispatch(googleActions.getTokens(code))
  }

  render() {
    const { t } = this.props;

    return (
      <div>{t('loading')}</div>
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
  withNamespaces(),
  connect(mapStateToProps)
)(OAuthCallback);
