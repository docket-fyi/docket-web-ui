/**
 * @module components/Notification
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';

import { notificationActions } from '../../actions';
import styles from './styles'

const variantIconMapping = {
  error: ErrorIcon,
  warning: WarningIcon,
  success: CheckCircleIcon,
  info: InfoIcon
}

class Notification extends Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleExited = this.handleExited.bind(this);
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.props.closed();
  }

  handleExited() {
    this.props.dequeued();
  }

  render() {
    const { notifications, classes } = this.props;
    if (!notifications.all.length) return null;
    const currentNotification = notifications.all[0];
    const Icon = variantIconMapping[currentNotification.variant]

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={notifications.isOpen}
        autoHideDuration={currentNotification.autoHide ? currentNotification.autoHideDuration : null}
        onClose={this.handleClose}
        onExited={this.handleExited}
      >
        <SnackbarContent
          className={classes[currentNotification.variant]}
          aria-describedby=""
          message={
            <span id="message-id" className={classes.message}>
              <Icon className={classes.icon} />
              {currentNotification.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.close} />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }

}

Notification.propTypes = {
  notifications: PropTypes.object.isRequired,
  closed: PropTypes.func.isRequired,
  dequeued: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closed: () => dispatch(notificationActions.closed()),
    dequeued: () => dispatch(notificationActions.dequeued())
  }
}

export default compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(Notification);
