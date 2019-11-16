/**
 * @module reducers/authentication
 */

import { searchTypes } from '../types';

/**
 * [initialState description]
 * @type {Object}
 */
const initialState = {
  query: null,
  isLoading: false,
  results: []
};

/**
 * [search description]
 * @param  {Object} state  [description]
 * @param  {Object} action [description]
 * @return {Object}        [description]
 */
function search(state = initialState, action) {
  switch (action.type) {

    case searchTypes.SEARCH_REQUESTED:
      return Object.assign({}, state, {
        ...state,
        query: action.query,
        isLoading: true
      });

    case searchTypes.SEARCH_REQUEST_SUCCEEDED:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        results: action.results
      });

    case searchTypes.SEARCH_REQUEST_FAILED:
      return Object.assign({}, state, {
        ...state,
        isLoading: false
      });

    case searchTypes.SEARCH_CLEARED:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}

export default search;
