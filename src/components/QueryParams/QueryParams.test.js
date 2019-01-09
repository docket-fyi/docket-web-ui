import React from 'react';
import ReactDOM from 'react-dom';
import QueryParams from './QueryParams';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QueryParams />, div);
  ReactDOM.unmountComponentAtNode(div);
});
