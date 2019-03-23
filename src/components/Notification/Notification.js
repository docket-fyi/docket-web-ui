/**
 * @module components/Notification
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import socketIOEventHandlerMapping from '../../socket-io/index'
import socket from '../../socket-io';

function Notification(props) {
  const { dispatch } = props;
  socketIOEventHandlerMapping.forEach((handler, event) => {
    socket.on(event, data => handler(dispatch, data));
  });
  return null;
}

Notification.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default compose(
  // withStyles(styles),
  withTranslation(),
  connect()
)(Notification);
