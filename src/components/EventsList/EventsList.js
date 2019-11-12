/**
 * @module components/EventsList
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { meActions } from '../../actions';
import { NewEvent, EventListItem } from '../index'
import './styles.css'

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
      <div>
        {events.all.map(event => (
          <EventListItem key={event._id} {...event} />
        ))}
        <Route path={`${match.url}/new`} component={NewEvent} />
        <button className="add-new-event" variant="outline-light" size="lg" onClick={this.onAddNewEvent}>+</button>
      </div>
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
