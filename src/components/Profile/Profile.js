/**
 * @module components/Profile
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Button, Form } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
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
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>{t('firstName')}</Form.Label>
            <Form.Control name="firstName" key={firstName} defaultValue={firstName} placeholder={t('firstName')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('lastName')}</Form.Label>
            <Form.Control name="lastName" key={lastName} defaultValue={lastName} placeholder={t('lastName')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('email')}</Form.Label>
            <Form.Control name="email" type="email" key={email} defaultValue={email} placeholder={t('email')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('preferredMeasurementUnit')}</Form.Label>
            <Form.Control as="select" name="preferredMeasurementUnit" default={preferredMeasurementUnit}>
              <option>{t('daysPlural')}</option>
              <option>{t('weeksPlural')}</option>
              <option>{t('monthsPlural')}</option>
              <option>{t('yearsPlural')}</option>
            </Form.Control>
          </Form.Group>
          <h3>{t('memberSince', {date: moment(createdAt).format('YYYY-MM-DD')})}</h3>
          <Button variant="outline-light" size="lg" type="submit">{t('submit')}</Button>
          <Button variant="link" size="lg" onClick={ this.onDelete }>{t('delete')}</Button>
        </Form>
      </Container>
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
  withNamespaces(),
  connect(mapStateToProps)
)(Profile);
