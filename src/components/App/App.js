/**
 * @module components/App
 */

import React from 'react';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { Router } from 'react-router';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import store from '../../store';
import history from '../../history';
import {
  AppRouter,
  GlobalError
} from '../../components';
import './App.css'

function App(props) {

    /*
    App
      Provider
      Router
        GlobalError
        AppRouter
          UnauthenticatedRoute
            Login
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
            {/* TODO: Move center-styling to <UnauthenticatedRoute> layout */}
            <div>
              <GlobalError />
              <AppRouter />
            </div>
          </Router>
        {/* </MuiPickersUtilsProvider> */}
      </Provider>
    );

}

App.propTypes = {};

export default compose()(App);
