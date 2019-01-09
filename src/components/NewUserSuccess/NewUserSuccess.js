/**
 * @module components/Login
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { hasJwt, isJwtExpired } from '../../local-storage';
import { userActions } from '../../actions';
import './NewUserSuccess.css'

class NewUserSuccess extends Component {

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
    return (
      <Container fluid>
        <Row>
          <Col xs={{span: 4, offset: 4}}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" onChange={this.onChange} placeholder="First Name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" onChange={this.onChange} placeholder="Last Name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" onChange={this.onChange} placeholder="Email" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={this.onChange} placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }


}

NewUserSuccess.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  connect(mapStateToProps)
)(NewUserSuccess);

