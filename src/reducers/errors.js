/**
 * @module reducers/errors
 */

import { errorTypes } from '../types';

const initialState = {
  all: [],
  isOpen: false,
  // count: 0,
  current: {}
};

function errors(state = initialState, action) {
  switch (action.type) {
    case errorTypes.ERROR_ENQUEUED:
      return Object.assign({}, state, {
        ...state,
        isOpen: true,
        // all: state.all.concat(action.response.response.body.errors[0].title),
        all: state.all.concat({
          message: action.message,
          autoHide: action.autoHide,
          autoHideDuration: action.autoHideDuration
        }),
        // count: state.count + 1
      });
    case errorTypes.ERROR_DEQUEUED:
      return Object.assign({}, state, {
        ...state,
        isOpen: !!state.all.slice(1).length,
        all: state.all.slice(1),
        // count: state.count - 1
      });
    case errorTypes.ERROR_CLOSED:
      return Object.assign({}, state, {
        ...state,
        isOpen: false
      });
    default:
      return state;
  }
}

export default errors;
