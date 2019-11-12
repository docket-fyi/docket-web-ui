import React from 'react';
import ReactDOM from 'react-dom';
import SocketNotification from './SocketNotification';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocketNotification />, div);
  ReactDOM.unmountComponentAtNode(div);
});
