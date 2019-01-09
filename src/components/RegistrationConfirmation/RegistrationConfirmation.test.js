import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationConfirmation from './RegistrationConfirmation';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegistrationConfirmation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
