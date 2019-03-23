/**
 * @module components/OAuthGoogleCallback
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { googleActions } from '../../actions';
import withQueryParams from '../QueryParams/QueryParams';
import './OAuthGoogleCallback.css';

class OAuthGoogleCallback extends Component {

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

OAuthGoogleCallback.propTypes = {
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
  withTranslation(),
  connect(mapStateToProps)
)(OAuthGoogleCallback);
