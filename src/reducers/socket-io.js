/**
 * @module reducers/sdk
 */

import { socketIoTypes } from '../types';

/**
 * [initialState description]
 * @type {Object}
 */
const initialState = {
  connected: false,
  socket: null,
  basePath: '',
  eventHandlersMapped: false
};

/**
 * [socketIo description]
 * @param  {Object} state  [description]
 * @param  {Object} action [description]
 * @return {Object}        [description]
 */
function socketIo(state = initialState, action) {
  switch (action.type) {

    case socketIoTypes.SOCKET_IO_CONNECTION_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        connected: false
      });

      case socketIoTypes.SOCKET_IO_CONNECTION_SUCCEEDED:
        return Object.assign({}, state, {
          ...state,
          socket: action.socket,
          connected: true,
          basePath: action.basePath
        });

      case socketIoTypes.SOCKET_IO_CONNECTION_FAILED:
        return Object.assign({}, state, {
          ...state,
          socket: null,
          connected: false
        });

      case socketIoTypes.SOCKET_IO_EVENT_HANDLER_MAPPING_STARTED:
        return Object.assign({}, state, {});

      case socketIoTypes.SOCKET_IO_EVENT_HANDLER_MAPPING_SUCCEEDED:
        return Object.assign({}, state, {
          ...state,
          eventHandlersMapped: true
        });

      case socketIoTypes.SOCKET_IO_EVENT_HANDLER_MAPPING_FAILED:
        return Object.assign({}, state, {
          ...state,
          eventHandlersMapped: false
        });

      default:
        return state;
  }
}

export default socketIo;
