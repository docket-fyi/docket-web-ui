/**
 * @module components/App
 */

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { Router } from 'react-router';
// import { I18nextProvider } from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

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
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

function App(props) {

  /*
    App
      Provider
      Router
        Suspense
          CssBaseline
          SocketNotification
          Notification
          AppRouter
            UnauthenticatedRoute
              Login
              Register
              ForgotPassword
              ResetPassword
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
            <MuiPickersUtilsProvider utils={MomentUtils} >
              {/* <I18nextProvider i18n={i18n}> */}
                {/* TODO: Move center-styling to <UnauthenticatedRoute> layout */}
                <Suspense fallback={<Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{minHeight: '100vh'}}><Grid item><CircularProgress /></Grid></Grid>}>
                  <CssBaseline />
                  <SocketNotification />
                  <Notification />
                  <AppRouter />
                </Suspense>
              {/* </I18nextProvider> */}
            </MuiPickersUtilsProvider>
          </Router>
        {/* </MuiPickersUtilsProvider> */}
      </Provider>
    );

}

App.propTypes = {};

export default compose()(App);
