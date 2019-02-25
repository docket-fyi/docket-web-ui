import React from 'react';
import ReactDOM from 'react-dom';
import OAuthMicrosoftCallback from './OAuthMicrosoftCallback';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OAuthMicrosoftCallback />, div);
  ReactDOM.unmountComponentAtNode(div);
});
