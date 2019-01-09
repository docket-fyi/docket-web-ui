/**
 * @module components/EventItem
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';

import history from '../../history';

class EventListItem extends Component {

  constructor(props) {
    super(props);
    this.goToEvent = this.goToEvent.bind(this);
  }

  goToEvent(event, id, slug) {
    history.push(`/event/${id}/${slug}`);
  }

  render() {
    const { _id, name, slug, date } = this.props;
    const now = moment()
    const eventDate = moment(date)
    const diff = eventDate.diff(now)
    const duration = moment.duration(diff).humanize(true)
    return (
      <div>
        <h2>
          <Button onClick={event => this.goToEvent(event, _id, slug)}>{ name }</Button>
        </h2>
        <h3>{ duration }</h3>
      </div>
    );
  }

}

EventListItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  connect(mapStateToProps)
)(EventListItem);
