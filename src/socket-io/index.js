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

const socketIOEventHandlerMapping = new Map([
  ['connect', connect],
  ['connect_error', connectError],
  ['connect_timeout', connectTimeout],
  ['error', error],
  ['disconnect', disconnect],
  ['reconnect', reconnect],
  ['reconnect_attempt', reconnectAttempt],
  ['reconnecting', reconnecting],
  ['reconnect_error', reconnectError],
  ['reconnect_failed', reconnectFailed],
  ['ping', ping],
  ['pong', pong],
  ['docket_event_expired', eventExpired],
  ['docket_logout', logout]
])

export default socketIOEventHandlerMapping;
