/**
 * @module components/EventsList
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import {
  Fab
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';

import { meActions } from '../../actions';
import { NewEvent, EventListItem } from '../index'
import routes from '../../routes'
import styles from './styles'

class EventsList extends Component {

  constructor(props) {
    super(props);
    this.onAddNewEvent = this.onAddNewEvent.bind(this);
  }

  componentDidMount() {
    const { getEvents } = this.props;
    getEvents();
  }

  onAddNewEvent(event) {
    event.preventDefault()
    const { history } = this.props
    history.push(routes.events.new)
  }

  render() {
    const { events, match, t, classes } = this.props
    return (
      <>
        {events.all.map(event => (
          <EventListItem key={event.id} {...event} />
        ))}
        {/* <EventListEmpty /> */}
        <Route path={`${match.url}/new`} component={NewEvent} />
        <Fab variant="extended" size="large" color="secondary" aria-label={t('newEvent')} onClick={this.onAddNewEvent} className={classes.fab}>
          <AddIcon />
          {t('newEvent')}
        </Fab>
      </>
    )
  }
}

EventsList.propTypes = {
  t: PropTypes.func.isRequired,
  // events: PropTypes.arrayOf(PropTypes.object).isRequired,
  getEvents: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => dispatch(meActions.getEvents())
  }
}

export default compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EventsList);
