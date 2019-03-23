import React from 'react';
import ReactDOM from 'react-dom';
import MicrosoftCalendarsList from './MicrosoftCalendarsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MicrosoftCalendarsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
