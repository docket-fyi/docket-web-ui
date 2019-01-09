/**
 * @module components/QueryParams
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import qs from 'qs';

function withQueryParams(WrappedComponent) {

  class QueryParams extends Component {

    render() {
      return <WrappedComponent queryParams={qs.parse(window.location.search.slice(1))} {...this.props} />;
    }

  }

  QueryParams.propTypes = {
  }

  return QueryParams;
}

export default withQueryParams;
// export {
//   withQueryParams
// }
