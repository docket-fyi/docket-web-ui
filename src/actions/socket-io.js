/**
 * @module actions/socket-io
 */

import io from 'socket.io-client/dist/socket.io.slim';

import socketEventKeys from '../socket-io/socket-event-keys'
import { socketIoTypes } from '../types';
import environment from '../environment'
import socketIOEventHandlerMapping from '../socket-io/index'

/**
 * [connectionRequested description]
 * @return {Object}
 */
export function connectionRequested() {
  return {
    type: socketIoTypes.SOCKET_IO_CONNECTION_REQUESTED
  }
}

/**
 * [connectionSucceeded description]
 * @param {Socket} socket
 * @param {String} basePath
 * @return {Object}
 */
export function connectionSucceeded(socket, basePath) {
  return {
    type: socketIoTypes.SOCKET_IO_CONNECTION_SUCCEEDED,
    socket,
    basePath
  }
}

/**
 * [connectionFailed description]
 * @return {Object}
 */
export function connectionFailed() {
  return {
    type: socketIoTypes.SOCKET_IO_CONNECTION_FAILED
  }
}

/**
 * [eventHandlerMappingStarted description]
 * @return {Object}
 */
export function eventHandlerMappingStarted() {
  return {
    type: socketIoTypes.SOCKET_IO_EVENT_HANDLER_MAPPING_STARTED
  }
}

/**
 * [eventHandlerMappingSucceeded description]
 * @return {Object}
 */
export function eventHandlerMappingSucceeded() {
  return {
    type: socketIoTypes.SOCKET_IO_EVENT_HANDLER_MAPPING_SUCCEEDED
  }
}

/**
 * [eventHandlerMappingFailed description]
 * @return {Object}
 */
export function eventHandlerMappingFailed() {
  return {
    type: socketIoTypes.SOCKET_IO_EVENT_HANDLER_MAPPING_FAILED
  }
}

/**
 * [connect description]
 *
 * @param   {String} jwt
 * @return  {Function}
 */
export function connect(jwt) {
  return dispatch => {
    try {
      dispatch(connectionRequested())
      const socket = io(environment.apiBasePath);
      dispatch(connectionSucceeded(socket, environment.apiBasePath))
      dispatch(eventHandlerMappingStarted())
      socketIOEventHandlerMapping.forEach((handler, event) => {
        socket.on(event, data => handler(dispatch, data));
      });
      socket.emit(socketEventKeys.user.connected, { jwt })
      dispatch(eventHandlerMappingSucceeded())
    } catch (err) {
      dispatch(connectionFailed())
    }
  }
}
