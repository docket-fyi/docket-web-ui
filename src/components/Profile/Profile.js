/**
 * @module components/Profile
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import moment from 'moment';

import { meActions } from '../../actions';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      preferredMeasurementUnit: '',
      createdAt: moment().format('YYYY-MM-DD')
    }
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDelete(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(meActions.destroy());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(meActions.getProfile());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.me.firstName && this.props.me.firstName !== prevState.firstName) {
      this.setState({
        firstName: this.props.me.firstName
      });
    }
    if (this.props.me.lastName && this.props.me.lastName !== prevState.lastName) {
      this.setState({
        lastName: this.props.me.lastName
      });
    }
    if (this.props.me.email && this.props.me.email !== prevState.email) {
      this.setState({
        email: this.props.me.email
      });
    }
    if (this.props.me.preferredMeasurementUnit && this.props.me.preferredMeasurementUnit !== prevState.preferredMeasurementUnit) {
      this.setState({
        preferredMeasurementUnit: this.props.me.preferredMeasurementUnit
      });
    }
  }

  onSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props;
    const formData = new window.FormData(event.target);
    dispatch(meActions.update(formData));
  }

  render() {
    const { t } = this.props;
    const { firstName, lastName, email, preferredMeasurementUnit, createdAt } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {/* <Form.Group> */}
            <label>{t('firstName')}</label>
            <input name="firstName" key={firstName} defaultValue={firstName} placeholder={t('firstName')} />
          {/* </Form.Group> */}
          {/* <Form.Group> */}
            <label>{t('lastName')}</label>
            <input name="lastName" key={lastName} defaultValue={lastName} placeholder={t('lastName')} />
          {/* </Form.Group> */}
          {/* <Form.Group> */}
            <label>{t('email')}</label>
            <input name="email" type="email" key={email} defaultValue={email} placeholder={t('email')} />
          {/* </Form.Group> */}
          {/* <Form.Group> */}
            <label>{t('preferredMeasurementUnit')}</label>
            <select as="select" name="preferredMeasurementUnit" default={preferredMeasurementUnit}>
              <option>{t('days')}</option>
              <option>{t('weeks')}</option>
              <option>{t('months')}</option>
              <option>{t('years')}</option>
            </select>
          {/* </Form.Group> */}
          <h3>{t('memberSince', {date: moment(createdAt).format('YYYY-MM-DD')})}</h3>
          <button variant="outline-light" size="lg" type="submit">{t('submit')}</button>
          <button variant="link" size="lg" onClick={ this.onDelete }>{t('delete')}</button>
        </form>
      </div>
    );
  }

}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  me: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    me: state.me
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(Profile);
