import React from 'react';
import ReactDOM from 'react-dom';
import NewUserSuccess from './NewUserSuccess';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewUserSuccess />, div);
  ReactDOM.unmountComponentAtNode(div);
});
