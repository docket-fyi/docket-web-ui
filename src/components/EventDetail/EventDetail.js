/**
 * @module components/EventDetail
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Button, Form } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';

import { meActions } from '../../actions'

class EventDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.event.name || '',
      date: props.event.date || new Date()
    }
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDelete(event) {
    event.preventDefault();
    const { dispatch, match } = this.props;
    const { id } = match.params;
    dispatch(meActions.destroyEventById(id))
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { id } = match.params;
    dispatch(meActions.getEventById(id))
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    const { dispatch, match } = this.props;
    const { id } = match.params;
    const formData = new window.FormData(event.target);
    dispatch(meActions.updateEventById(id, formData));
  }

  render() {
    const { t } = this.props;
    const { name, date } = this.state;

    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>{t('name')}</Form.Label>
            <Form.Control name="name" value={name} onChange={this.onChange} placeholder={t('name')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('date')}</Form.Label>
            <Form.Control name="date" type="date" value={date} onChange={this.onChange} placeholder={t('date')} />
          </Form.Group>
          <Button variant="outline-light" size="lg" type="submit">{t('submit')}</Button>
          <Button variant="link" size="lg" onClick={ this.onDelete }>{t('delete')}</Button>
        </Form>
      </Container>
    )
  }
}

EventDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    event: state.event
  }
}

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(EventDetail);
