import socket from '../socket-io'
import { getJwt } from '../local-storage/jwt'

function connect(data) {
  const jwt = getJwt()
  socket.emit('docket_user_connected', { jwt })
}

export default connect;
