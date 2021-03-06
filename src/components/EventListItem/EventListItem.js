/**
 * @module components/EventItem
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import routes from '../../routes'
import history from '../../history';

class EventListItem extends Component {

  constructor(props) {
    super(props);
    this.goToEvent = this.goToEvent.bind(this);
  }

  goToEvent(id, slug) {
    history.push(routes.events.show(id, slug));
  }

  render() {
    const { id, name, slug, date } = this.props;
    const now = moment()
    const eventDate = moment(date)
    const diff = eventDate.diff(now)
    const duration = moment.duration(diff).as('d') //.humanize(false)
    const result = Math.floor(duration)
    return (
      <div>
        <h2>
          <button variant="link" size="lg" onClick={() => this.goToEvent(id, slug)}>{ name }</button>
        </h2>
        <h3>{ result } days</h3>
      </div>
    );
  }

}

EventListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default EventListItem;
