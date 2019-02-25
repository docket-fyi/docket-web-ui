import React from 'react';
import ReactDOM from 'react-dom';
import GoogleCalendarsList from './GoogleCalendarsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GoogleCalendarsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
