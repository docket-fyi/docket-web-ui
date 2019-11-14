/**
 * @module components/NewEvent
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DatePicker } from "@material-ui/pickers";

import { meActions } from '../../actions';

class NewEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: new Date()
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onDateChange(date) {
    this.setState({ date });
  }

  onSubmit(event) {
    event.preventDefault()
    const { createEvent } = this.props;
    const { name, date } = this.state
    // const formData = new window.FormData(event.target);
    createEvent(name, date);
  }

  render() {
    const { t } = this.props;
    const isDisabled = !this.state.name || !this.state.date

    return (
      <Box>
        <form onSubmit={this.onSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label={t('name')}
            margin="normal"
            type="text"
            autoFocus={true}
            value={this.state.name}
            onChange={this.onChange}
          />
          <DatePicker
            label={t('date')}
            value={this.state.date}
            onChange={this.onDateChange}
          />
          <Button fullWidth type="submit" variant="contained" color="primary" disabled={isDisabled}>{t('add event')}</Button>
        </form>
      </Box>
    );
  }

}

NewEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    createEvent: (name, date) => dispatch(meActions.createEvent(name, date))
  }
}

export default compose(
  withTranslation(),
  connect(null, mapDispatchToProps)
)(NewEvent);
