/**
 * @module components/GoogleCalendarsList
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { googleActions, meActions } from '../../actions';
// import { GoogleCalendarListItem } from '../index'

class GoogleCalendarsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allCheckedCalendars: []
    }
    this.selectAllForCalendar = this.selectAllForCalendar.bind(this);
    this.import = this.import.bind(this);
    this.isCalendarChecked = this.isCalendarChecked.bind(this);
    // this.isEventChecked = this.isEventChecked.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(googleActions.getCalendarList());
  }

  import(event) {
    event.preventDefault()
    const { dispatch, google } = this.props;
    const { calendars } = google
    const formData = new window.FormData(event.target);
    const events = [];
    const allEvents = calendars.map(calendar => calendar.events).reduce((a, b) => a.concat(b), [])
    for (let entry of formData.entries()) {
      const eventId = entry[0];
      const originalEvent = allEvents.find(event => event.id === eventId)
      // const value = entry[1];
      events.push(originalEvent);
    }
    dispatch(meActions.importEvents(events));
  }

  selectAllForCalendar(event, id) {
    const { allCheckedCalendars } = this.state;
    const isSelected = allCheckedCalendars.includes(id);
    if (isSelected) {
      const newCheckedCalendars = allCheckedCalendars.filter(calendar => calendar !== id);
      this.setState({ allCheckedCalendars: newCheckedCalendars });
    } else {
      const newCheckedCalendars = Array.from(allCheckedCalendars)
      newCheckedCalendars.push(id);
      this.setState({ allCheckedCalendars: newCheckedCalendars });
    }
  }

  isCalendarChecked(id) {
    const { allCheckedCalendars } = this.state;
    return allCheckedCalendars.includes(id);
  }

  // isEventChecked(id) {}

  render() {
    const { google } = this.props;
    // const { allCheckedCalendars } = this.state
    const { calendars } = google;
    return (
      <div>
        <form onSubmit={this.import}>
          {/* <GoogleCalendarListItem key={calendar.id} {...calendar} /> */}
          {
            calendars.map(calendar => {
              const { id, summary, backgroundColor, foregroundColor, events } = calendar;
              return (
                <ul key={id} style={{marginBottom: '20px'}}>
                  <li style={{backgroundColor, color: foregroundColor}}>
                    {/* <Form.Group> */}
                      <input type="checkbox" label={`${summary} (${events.length} events)`} onChange={event => this.selectAllForCalendar(event, id)} defaultChecked={this.isCalendarChecked(id)} />
                    {/* </Form.Group> */}
                  </li>
                  <li>
                    <tr>
                      {
                        events.length
                          ? events.map(event => {
                            const { summary, id, start } = event
                            const date = moment(start.date || start.dateTime).format('MMM D, YYYY')
                              return (
                                <td xs={4} key={id}>
                                  {/* <Form.Group style={{color: 'black'}}> */}
                                    <input type="checkbox" label={summary} name={event.id} id={event.id} /> {/*checked={this.isCalendarChecked(calendar.id)}*/}
                                    <small style={{opacity: '0.5'}}>{date}</small>
                                  {/* </Form.Group> */}
                                </td>
                              );
                            })
                          : <p style={{color: 'black'}}>No events</p>
                      }
                    </tr>
                  </li>
                </ul>
              );
            })
          }
          <button variant="outline-light" size="lg" type="submit">Import</button>
        </form>
      </div>
    )
  }
}

GoogleCalendarsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  google: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    google: state.google
  }
}

export default compose(
  connect(mapStateToProps)
)(GoogleCalendarsList);
