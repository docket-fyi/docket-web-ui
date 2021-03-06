/**
 * @module components/Login
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import routes from '../../routes'

class NewUserSuccess extends Component {

  componentDidUpdate() {
    const { user, history } = this.props;
    if (!user.email || !user.firstName) {
      history.push(routes.register);
      return;
    }
  }

  render() {
    const { t, user } = this.props;
    const { firstName, email } = user;

    return (
      // (user.email && user.firstName) ? <Container> : null
      <div fluid>
        <tr>
          <td xs={{span: 4, offset: 4}}>
            {t('thanksForRegistering', {firstName, email})}
          </td>
        </tr>
      </div>
    )
  }


}

NewUserSuccess.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(NewUserSuccess);
