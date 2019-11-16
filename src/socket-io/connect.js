import socket from '../socket-io'
import { getJwt } from '../local-storage/jwt'
import socketEventKeys from './socket-event-keys'

function connect(data) {
  const jwt = getJwt()
  socket.emit(socketEventKeys.user.connected, { jwt })
}

export default connect;
