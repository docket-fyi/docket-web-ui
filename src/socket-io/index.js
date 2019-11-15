import connect from './connect';
import connectError from './connect-error';
import connectTimeout from './connect-timeout';
import error from './error';
import disconnect from './disconnect';
import reconnect from './reconnect';
import reconnectAttempt from './reconnect-attempt';
import reconnecting from './reconnecting';
import reconnectError from './reconnect-error';
import reconnectFailed from './reconnect-failed';
import ping from './ping';
import pong from './pong';
import eventExpired from './event-expired';
import logout from './logout';
import socketEventKeys from './socket-event-keys'

const socketIOEventHandlerMapping = new Map([
  [socketEventKeys.connect, connect],
  [socketEventKeys.connectError, connectError],
  [socketEventKeys.connectTimeout, connectTimeout],
  [socketEventKeys.error, error],
  [socketEventKeys.disconnect, disconnect],
  [socketEventKeys.reconnect, reconnect],
  [socketEventKeys.reconnectAttempt, reconnectAttempt],
  [socketEventKeys.reconnecting, reconnecting],
  [socketEventKeys.reconnectError, reconnectError],
  [socketEventKeys.reconnectFailed, reconnectFailed],
  [socketEventKeys.ping, ping],
  [socketEventKeys.pong, pong],
  [socketEventKeys.event.expired, eventExpired],
  [socketEventKeys.user.logout, logout]
])

export default socketIOEventHandlerMapping;
