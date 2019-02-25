/**
 * @module components/EventItem
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import moment from 'moment';
import { Button } from 'react-bootstrap';

import history from '../../history';

class EventListItem extends Component {

  constructor(props) {
    super(props);
    this.goToEvent = this.goToEvent.bind(this);
  }

  goToEvent(id, slug) {
    history.push(`/event/${id}/${slug}`);
  }

  render() {
    const { _id, name, slug, /*date,*/ diff } = this.props;
    // const now = moment()
    // const eventDate = moment(date)
    // const diff = eventDate.diff(now)
    // const duration = moment.duration(diff).as(diff.unit || 'd') //.humanize(false)
    // const result = Math.floor(duration)
    return (
      <div>
        <h2>
          <Button variant="link" size="lg" onClick={() => this.goToEvent(_id, slug)}>{ name }</Button>
        </h2>
        <h3>{ diff.value }</h3>
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
