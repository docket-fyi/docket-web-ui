/**
 * @module components/GoogleCalendarsList
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Button, ListGroup, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';

import { googleActions } from '../../actions';
// import { GoogleCalendarListItem } from '../index'
import './styles.css'

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

  import(event) {}

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
      <Container>
        {/* <GoogleCalendarListItem key={calendar.id} {...calendar} /> */}
        {
          calendars.map(calendar => {
            const { id, summary, backgroundColor, foregroundColor, events } = calendar;
            return (
              <ListGroup key={id} style={{marginBottom: '20px'}}>
                <ListGroup.Item style={{backgroundColor, color: foregroundColor}}>
                  <Form.Group>
                    <Form.Check type="checkbox" label={`${summary} (${events.length} events)`} onChange={event => this.selectAllForCalendar(event, id)} defaultChecked={this.isCalendarChecked(id)} />
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    {
                      events.length
                        ? events.map(event => {
                          const { summary, id, start } = event
                          const date = moment(start.date || start.dateTime).format('MMM D, YYYY')
                            return (
                              <Col xs={4} key={id}>
                                <Form.Group style={{color: 'black'}}>
                                  <Form.Check type="checkbox" label={summary} id={`${calendar.id}-${event.id}`} checked={this.isCalendarChecked(calendar.id)} />
                                  <small style={{opacity: '0.5'}}>{date}</small>
                                </Form.Group>
                              </Col>
                            );
                          })
                        : <p style={{color: 'black'}}>No events</p>
                    }
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            );
          })
        }
        <Button variant="outline-light" size="lg" onClick={this.import}>Import</Button>
      </Container>
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
