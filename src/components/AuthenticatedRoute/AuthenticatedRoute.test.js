import React from 'react';
import ReactDOM from 'react-dom';
import AuthenticatedRoute from './AuthenticatedRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthenticatedRoute />, div);
  ReactDOM.unmountComponentAtNode(div);
});
