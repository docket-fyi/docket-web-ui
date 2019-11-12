/**
 * @module components/UnauthenticatedRoute
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Route } from 'react-router';
import {
  Grid
} from '@material-ui/core';

const UnauthenticatedRoute = props => {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Route {...props} />
    </Grid>
  );

};

UnauthenticatedRoute.propTypes = {};

export default compose()(UnauthenticatedRoute);
