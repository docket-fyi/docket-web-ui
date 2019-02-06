/**
 * @module components/Profile
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Button, Form } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';

import { meActions } from '../../actions';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: props.me.firstName || '',
      lastName: props.me.lastName || '',
      email: props.me.email || '',
      createdAt: props.me.createdAt || new Date()
    }
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onDelete(event) {
    // event.preventDefault()
    const { dispatch } = this.props;
    dispatch(meActions.destroy());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(meActions.getProfile());
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props;
    const formData = new window.FormData(event.target);
    dispatch(meActions.update(formData));
  }

  render() {
    // const { firstName, lastName, email, createdAt = '' } = me;
    const { firstName, lastName, email, createdAt } = this.state;
    const { t } = this.props;

    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>{t('firstName')}</Form.Label>
            <Form.Control name="firstName" value={firstName} onChange={this.onChange} placeholder={t('firstName')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('lastName')}</Form.Label>
            <Form.Control name="lastName" value={lastName} onChange={this.onChange} placeholder={t('lastName')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('email')}</Form.Label>
            <Form.Control name="email" type="email" value={email} onChange={this.onChange} placeholder={t('email')} />
          </Form.Group>
          <h3>{t('memberSince', {date: createdAt.toString()})}</h3>
          <Button variant="outline-light" size="lg" type="submit">{t('submit')}</Button>
          <Button variant="link" size="lg" onClick={ this.onDelete }>{t('delete')}</Button>
        </Form>
      </Container>
    );
  }

}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired
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
