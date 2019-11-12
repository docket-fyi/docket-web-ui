/**
 * @module components/App
 */

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { Router } from 'react-router';
// import { I18nextProvider } from 'react-i18next';

import store from '../../store';
import history from '../../history';
import {
  AppRouter,
  Notification,
  SocketNotification
} from '../../components';
import './App.css'
// import i18n from '../../i18n';
import '../../i18n';

function App(props) {

  /*
    App
      Provider
      Router
        GlobalError
        AppRouter
          UnauthenticatedRoute
            Login
            Forgot Password
            Register
            etc.
          AuthenticatedRoute
            EventsList
            Profile
            etc.
    */
    return (
      <Provider store={store}>
        {/* <MuiPickersUtilsProvider utils={MomentUtils}> */}
          <Router history={history}>
            {/* <I18nextProvider i18n={i18n}> */}
              {/* TODO: Move center-styling to <UnauthenticatedRoute> layout */}
              <Suspense fallback={<div>Loading...</div>}>
                <div>
                  <SocketNotification />
                  <Notification />
                  <AppRouter />
                </div>
              </Suspense>
            {/* </I18nextProvider> */}
          </Router>
        {/* </MuiPickersUtilsProvider> */}
      </Provider>
    );

}

App.propTypes = {};

export default compose()(App);
