/**
 * @module components/EventDetail
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

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
    const { name, date } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={name} onChange={this.onChange} placeholder="Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" value={date} onChange={this.onChange} placeholder="Date" />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        <Button onClick={ this.onDelete }>Delete</Button>
      </Form>
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
  connect(mapStateToProps)
)(EventDetail);
