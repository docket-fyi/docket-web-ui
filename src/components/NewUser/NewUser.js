/**
 * @module components/Login
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { userActions } from '../../actions';
import { hasJwt, isJwtExpired } from '../../local-storage/jwt';

class NewUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (hasJwt() && !isJwtExpired()) {
      this.props.history.push('/events');
      return;
    }
  }

  componentDidUpdate() {
    if (hasJwt() && !isJwtExpired()) {
      this.props.history.push('/events');
      return;
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { firstName, lastName, email, password } = this.state;
    dispatch(userActions.register(firstName, lastName, email, password));
  }

  render() {
    const { t } = this.props;

    return (
      <div fluid>
        <tr>
          <td xs={{span: 4, offset: 4}}>
            <form onSubmit={this.onSubmit}>
              {/* <Form.Group> */}
                <label>{t('firstName')}</label>
                <input name="firstName" onChange={this.onChange} placeholder={t('firstName')} />
              {/* </Form.Group> */}
              {/* <Form.Group> */}
                <label>{t('lastName')}</label>
                <input name="lastName" onChange={this.onChange} placeholder={t('lastName')} />
              {/* </Form.Group> */}
              {/* <Form.Group> */}
                <label>{t('email')}</label>
                <input name="email" type="email" onChange={this.onChange} placeholder={t('email')} />
              {/* </Form.Group> */}
              {/* <Form.Group> */}
                <label>{t('password')}</label>
                <input name="password" type="password" onChange={this.onChange} placeholder={t('password')} />
              {/* </Form.Group> */}
              <button variant="primary" type="submit">{t('submit')}</button>
            </form>
          </td>
        </tr>
      </div>
    )
  }


}

NewUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(NewUser);
