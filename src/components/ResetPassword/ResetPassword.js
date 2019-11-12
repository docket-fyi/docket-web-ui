/**
 * @module components/ForgotPassword
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { userActions } from '../../actions';

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirmation: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { dispatch, match } = this.props;
    const { code } = match.params
    const { password, passwordConfirmation } = this.state;
    dispatch(userActions.resetPassword(code, password, passwordConfirmation));
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <tr>
          <td xs={{span: 4, offset: 4}}>
            <form onSubmit={this.onSubmit}>
              {/* <Form.Group> */}
                <label>{t('password')}</label>
                <input name="password" type="password" onChange={this.onChange} placeholder={t('password')} />
              {/* </Form.Group> */}
              {/* <Form.Group> */}
                <label>{t('passwordConfirmation')}</label>
                <input name="passwordConfirmation" type="password" onChange={this.onChange} placeholder={t('passwordConfirmation')} />
              {/* </Form.Group> */}
              <button variant="primary" type="submit">{t('submit')}</button>
            </form>
          </td>
        </tr>
      </div>
    )
  }


}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(ResetPassword);
