import React from 'react';
import ReactDOM from 'react-dom';
import EventListItem from './EventListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventListItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
