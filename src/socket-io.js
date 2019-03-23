import io from 'socket.io-client/dist/socket.io.slim';

import environment from './environment';

const socket = io(environment.apiBasePath);

// Subscriptions / event listeners are created in the Notification component.

export default socket;
