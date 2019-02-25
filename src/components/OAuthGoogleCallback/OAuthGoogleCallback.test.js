import React from 'react';
import ReactDOM from 'react-dom';
import OAuthGoogleCallback from './OAuthGoogleCallback';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OAuthGoogleCallback />, div);
  ReactDOM.unmountComponentAtNode(div);
});
