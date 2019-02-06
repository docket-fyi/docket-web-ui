/**
 * @module components/Login
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import { authenticationActions } from '../../actions';
import { hasJwt, isJwtExpired } from '../../local-storage/jwt';
import './Login.css'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
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

  onSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.state;
    dispatch(authenticationActions.authenticate(email, password));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onRegister(event) {
    this.props.history.push('/register');
  }

  onForgotPassword(event) {
    this.props.history.push('/forgot-password');
  }

  render() {
    const { t } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col xs={{span: 4, offset: 4}}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>{t('email')}</Form.Label>
                <Form.Control name="email" type="email" placeholder={t('email')} onChange={this.onChange} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>{t('password')}</Form.Label>
                <Form.Control name="password" type="password" placeholder={t('password')} onChange={this.onChange} />
              </Form.Group>
              <Button variant="primary" type="submit">{t('login')}</Button>
              <Button variant="link" onClick={this.onRegister}>{t('register')}</Button>
              <Button variant="link" onClick={this.onForgotPassword}>{t('forgotPassword')}</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }


}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  }
}

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(Login);

