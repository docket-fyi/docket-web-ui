/**
 * @module components/ForgotPassword
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import { userActions } from '../../actions';
import './ResetPassword.css'

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
      <Container fluid>
        <Row>
          <Col xs={{span: 4, offset: 4}}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>{t('password')}</Form.Label>
                <Form.Control name="password" type="password" onChange={this.onChange} placeholder={t('password')} />
              </Form.Group>
              <Form.Group>
                <Form.Label>{t('passwordConfirmation')}</Form.Label>
                <Form.Control name="passwordConfirmation" type="password" onChange={this.onChange} placeholder={t('passwordConfirmation')} />
              </Form.Group>
              <Button variant="primary" type="submit">{t('submit')}</Button>
            </Form>
          </Col>
        </Row>
      </Container>
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
  withNamespaces(),
  connect(mapStateToProps)
)(ResetPassword);

