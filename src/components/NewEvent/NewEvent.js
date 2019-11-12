/**
 * @module components/NewEvent
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { meActions } from '../../actions'

class NewEvent extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props;
    const formData = new window.FormData(event.target);
    dispatch(meActions.createEvent(formData));
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {/* <Form.Group> */}
            <label>{t('name')}</label>
            <input name="name" placeholder={t('name')} />
          {/* </Form.Group> */}
          {/* <Form.Group> */}
            <label>{t('date')}</label>
            <input name="date" type="date" placeholder={t('date')} />
          {/* </Form.Group> */}
          <button variant="outline-light" size="lg" type="submit">{t('submit')}</button>
        </form>
      </div>
    );
  }

}

NewEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(NewEvent);
