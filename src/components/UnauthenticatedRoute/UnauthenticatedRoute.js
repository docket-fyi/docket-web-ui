/**
 * @module components/UnauthenticatedRoute
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Route } from 'react-router';

const UnauthenticatedRoute = props => {

  return (
    <Route {...props} />
  );

};

UnauthenticatedRoute.propTypes = {};

export default compose()(UnauthenticatedRoute);
