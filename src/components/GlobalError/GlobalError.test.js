import React from 'react';
import ReactDOM from 'react-dom';
import GlobalError from './GlobalError';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GlobalError />, div);
  ReactDOM.unmountComponentAtNode(div);
});
