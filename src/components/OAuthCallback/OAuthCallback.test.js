import React from 'react';
import ReactDOM from 'react-dom';
import OAuthCallback from './OAuthCallback';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OAuthCallback />, div);
  ReactDOM.unmountComponentAtNode(div);
});
