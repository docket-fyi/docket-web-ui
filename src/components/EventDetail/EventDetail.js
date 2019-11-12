/**
 * @module components/EventDetail
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import moment from 'moment';

import { meActions } from '../../actions';

class EventDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: moment().format('YYYY-MM-DD')
    }
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDelete(event) {
    event.preventDefault();
    const { dispatch, match } = this.props;
    const { id } = match.params;
    dispatch(meActions.destroyEventById(id));
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { id } = match.params;
    dispatch(meActions.getEventById(id));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.event.name && this.props.event.name !== prevState.name) {
      this.setState({
        name: this.props.event.name
      });
    }
    if (this.props.event.date && moment(this.props.event.date).format('YYYY-MM-DD') !== prevState.date) {
      this.setState({
        date: moment(this.props.event.date).format('YYYY-MM-DD')
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { dispatch, match } = this.props;
    const { id } = match.params;
    const formData = new window.FormData(event.target);
    dispatch(meActions.updateEventById(id, formData));
  }

  render() {
    const { t } = this.props;
    const { name, date } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {/* <Form.Group> */}
            <label>{t('name')}</label>
            <input name="name" key={name} defaultValue={name} placeholder={t('name')} />
          {/* </Form.Group> */}
          {/* <Form.Group> */}
            <label>{t('date')}</label>
            <input name="date" type="date" key={date} defaultValue={date} placeholder={t('date')} />
          {/* </Form.Group> */}
          <button variant="outline-light" size="lg" type="submit">{t('submit')}</button>
          <button variant="link" size="lg" onClick={ this.onDelete }>{t('delete')}</button>
        </form>
      </div>
    )
  }
}

EventDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    event: state.event
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(EventDetail);
