/**
 * @module reducers/sdk
 */

import { sdkTypes } from '../types';

/**
 * [initialState description]
 * @type {Object}
 */
const initialState = {
  isConfigured: false
};

/**
 * [authentication description]
 * @param  {Object} state  [description]
 * @param  {Object} action [description]
 * @return {Object}        [description]
 */
function sdk(state = initialState, action) {
  switch (action.type) {

    case sdkTypes.SDK_AUTHENTICATION_SET_UP:
      return Object.assign({}, state, {
        ...state,
        isConfigured: true
      });

    // case sdkTypes.AUTHENTICATION_REQUEST_SUCCEEDED

    case sdkTypes.SDK_AUTHENTICATION_TORN_DOWN:
      return Object.assign({}, state, {
        ...state,
        isConfigured: false
      });

    default:
      return state;
  }
}

export default sdk;
