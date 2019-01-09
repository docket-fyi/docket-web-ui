/**
 * @module components/ForgotPassword
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { compose } from 'redux';
import PropTypes from 'prop-types';

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
    return (
      <Container fluid>
        <Row>
          <Col xs={{span: 4, offset: 4}}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={this.onChange} placeholder="Password" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control name="passwordConfirmation" type="password" onChange={this.onChange} placeholder="Password confirmation" />
              </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
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
  connect(mapStateToProps)
)(ResetPassword);

