/**
 * @module components/RegistrationConfirmation
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { userActions } from '../../actions';

class RegistrationConfirmation extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { code } = match.params;
    dispatch(userActions.confirm(code));
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <tr>
          <td xs={{span: 4, offset: 4}}>
            {t('loading')}
          </td>
        </tr>
      </div>
    )
  }

}

RegistrationConfirmation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(RegistrationConfirmation);
