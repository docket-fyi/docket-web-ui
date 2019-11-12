/**
 * @module components/MicrosoftCalendarsList
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { microsoftActions, meActions } from '../../actions';
// import { MicrosoftCalendarListItem } from '../index'

class MicrosoftCalendarsList extends Component {

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
    dispatch(microsoftActions.getCalendarList());
  }

  import(event) {
    event.preventDefault()
    const { dispatch, microsoft } = this.props;
    const { calendars } = microsoft
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
    const { microsoft } = this.props;
    // const { allCheckedCalendars } = this.state
    const { calendars } = microsoft;
    return (
      <div>
        <form onSubmit={this.import}>
          {/* <GoogleCalendarListItem key={calendar.id} {...calendar} /> */}
          {
            calendars.map(calendar => {
              const { id, name, color, events } = calendar;
              return (
                <ul key={id} style={{marginBottom: '20px'}}>
                  <li style={{backgroundColor: color}}>
                    {/* <Form.Group> */}
                      <input type="checkbox" label={`${name} (${events.length} events)`} onChange={event => this.selectAllForCalendar(event, id)} defaultChecked={this.isCalendarChecked(id)} />
                    {/* </Form.Group> */}
                  </li>
                  <li>
                    <tr>
                      {
                        events.length
                          ? events.map(event => {
                            const { subject, id, start } = event
                            const date = moment(start.dateTime).format('MMM D, YYYY')
                              return (
                                <td xs={4} key={id}>
                                  {/* <Form.Group style={{color: 'black'}}> */}
                                    <input type="checkbox" label={subject} name={event.id} id={event.id} /> {/*checked={this.isCalendarChecked(calendar.id)}*/}
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

MicrosoftCalendarsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  microsoft: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    microsoft: state.microsoft
  }
}

export default compose(
  connect(mapStateToProps)
)(MicrosoftCalendarsList);
