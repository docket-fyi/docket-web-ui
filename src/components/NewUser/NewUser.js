/**
 * @module components/Login
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { userActions } from '../../actions';
import { hasJwt, isJwtExpired } from '../../local-storage/jwt';
import './NewUser.css'

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
      <Container fluid>
        <Row>
          <Col xs={{span: 4, offset: 4}}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>{t('firstName')}</Form.Label>
                <Form.Control name="firstName" onChange={this.onChange} placeholder={t('firstName')} />
              </Form.Group>
              <Form.Group>
                <Form.Label>{t('lastName')}</Form.Label>
                <Form.Control name="lastName" onChange={this.onChange} placeholder={t('lastName')} />
              </Form.Group>
              <Form.Group>
                <Form.Label>{t('email')}</Form.Label>
                <Form.Control name="email" type="email" onChange={this.onChange} placeholder={t('email')} />
              </Form.Group>
              <Form.Group>
                <Form.Label>{t('password')}</Form.Label>
                <Form.Control name="password" type="password" onChange={this.onChange} placeholder={t('password')} />
              </Form.Group>
              <Button variant="primary" type="submit">{t('submit')}</Button>
            </Form>
          </Col>
        </Row>
      </Container>
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

