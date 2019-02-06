/**
 * @module components/NewEvent
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';

import { meActions } from '../../actions'

class NewEvent extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props;
    const formData = new window.FormData(event.target);
    dispatch(meActions.createEvent(formData));
  }

  render() {
    const { t } = this.props;

    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>{t('name')}</Form.Label>
            <Form.Control name="name" placeholder={t('name')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('date')}</Form.Label>
            <Form.Control name="date" type="date" placeholder={t('date')} />
          </Form.Group>
          <Button variant="outline-light" size="lg" type="submit">{t('submit')}</Button>
        </Form>
      </Container>
    );
  }

}

NewEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(NewEvent);
