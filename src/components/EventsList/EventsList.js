/**
 * @module components/EventsList
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Button } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import { meActions } from '../../actions';
import { NewEvent, EventListItem } from '../index'

class EventsList extends Component {

  constructor(props) {
    super(props);
    this.onAddNewEvent = this.onAddNewEvent.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(meActions.getEvents());
  }

  onAddNewEvent(event) {
    event.preventDefault()
    const { history } = this.props
    history.push(`/events/new`)
  }

  render() {
    const { events, match } = this.props
    return (
      <Container fluid>
        <Route path={`${match.url}/new`} component={NewEvent} />
        {events.all.map((event, index) => (
          <EventListItem key={index} {...event} />
        ))}
        <Button variant="primary" onClick={this.onAddNewEvent}>+</Button>
      </Container>
    )
  }
}

EventsList.propTypes = {
  dispatch: PropTypes.func.isRequired
  // match: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

export default compose(
  connect(mapStateToProps)
)(EventsList);
