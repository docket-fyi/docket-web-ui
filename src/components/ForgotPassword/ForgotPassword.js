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
import './ForgotPassword.css'

class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(userActions.forgotPassword(email));
  }

  render() {
    const { t } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col xs={{span: 4, offset: 4}}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>{t('email')}</Form.Label>
                <Form.Control name="email" type="email" onChange={this.onChange} placeholder={t('email')} />
              </Form.Group>
              <Button variant="primary" type="submit">{t('submit')}</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }


}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(ForgotPassword);

