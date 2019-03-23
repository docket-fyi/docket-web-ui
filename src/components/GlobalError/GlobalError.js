/**
 * @module components/GlobalError
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { errorActions } from '../../actions';

class GlobalError extends Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleExited = this.handleExited.bind(this);
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.props.dispatch(errorActions.closed());
  }

  handleExited() {
    this.props.dispatch(errorActions.dequeued());
  }

  render() {
    const { errors, t } = this.props;

    return (
      <div>
        {
          errors.all.map((error, index) => {
            const variant = error.variant || 'danger';
            return (
              <Alert style={{width: '400px', position: 'absolute', top: 10, right: 10}} dismissible key={index} variant={variant}>{t(error.translationKey)}</Alert>
            );
          })
        }
      </div>
    );
  }

}

GlobalError.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default compose(
  // withStyles(styles),
  withTranslation(),
  connect(mapStateToProps)
)(GlobalError);
