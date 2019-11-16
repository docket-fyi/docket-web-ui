const prefix = 'docket';
const separator = '_';

function key(...pieces) {
  return Array.from([prefix, /*environment, */...pieces]).join(separator);
}

module.exports = {
  // global: {},
  // builtin: {},
  // custom: {}
  connect: 'connect',
  connectError: 'connect_error',
  connectTimeout: 'connect_timeout',
  connection: 'connection',
  disconnect: 'disconnect',
  reconnect: 'reconnect',
  reconnectAttempt: 'reconnect_attempt',
  reconnecting: 'reconnecting',
  reconnectError: 'reconnect_error',
  reconnectFailed: 'reconnect_failed',
  disconnecting: 'disconnecting',
  ping: 'ping',
  pong: 'pong',
  error: 'error',
  user: {
    login: key('user', 'login'),
    connected: key('user', 'connected'),
    logout: key('user', 'logout')
  },
  event: {
    expired: key('event', 'expired')
  }
}
