import React from 'react';
import ReactDOM from 'react-dom';
import UnauthenticatedRoute from './UnauthenticatedRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UnauthenticatedRoute />, div);
  ReactDOM.unmountComponentAtNode(div);
});
