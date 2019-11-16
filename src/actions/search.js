/**
 * @module actions/search
 */

import { Deserializer } from 'jsonapi-serializer'

// import history from '../history';
import { notificationActions } from './index';
import { searchTypes } from '../types';
import { searchApi } from '../api';
// import routes from '../routes'
import i18next from '../i18n'

/**
 * [searchRequested description]
 * @return {Object}
 */
export function searchRequested(query) {
  return {
    type: searchTypes.SEARCH_REQUESTED,
    query
  };
}

/**
 * [searchSucceeded description]
 * @param  {String} jwt
 * @return {Object}
 */
export function searchSucceeded(results) {
  return {
    type: searchTypes.SEARCH_REQUEST_SUCCEEDED,
    results
  };
}

/**
 * [searchFailed description]
 * @return {Object}
 */
export function searchFailed() {
  return {
    type: searchTypes.SEARCH_REQUEST_FAILED
  };
}

/**
 * [searchCleared description]
 * @return {Object}
 */
export function searchCleared() {
  return {
    type: searchTypes.SEARCH_CLEARED
  };
}

/**
 * [search description]
 * @param  {String} query
 * @return {Function}
 */
export function search(query = '') {
  return async dispatch => {
    dispatch(searchRequested(query));
    if (!query) {
      dispatch(searchFailed());
      return;
    }
    try {
      const response = await searchApi.listSearchResults(query);
      const deserializedResponse = await new Deserializer({keyForAttribute: attr => attr}).deserialize(response)
      dispatch(searchSucceeded(deserializedResponse));
    } catch (response) {
      dispatch(searchFailed());
      response.body.errors.forEach(error => {
        dispatch(notificationActions.enqueued(i18next.t(error.translationKey) || error.message));
      })
    }
  };
}
