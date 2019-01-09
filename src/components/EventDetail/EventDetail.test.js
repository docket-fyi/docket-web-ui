import React from 'react';
import ReactDOM from 'react-dom';
import EventDetail from './EventDetail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventDetail />, div);
  ReactDOM.unmountComponentAtNode(div);
});
