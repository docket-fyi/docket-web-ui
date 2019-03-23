/**
 * @module utils/store
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import environment from './environment';
import reducer from './reducers';

const initialState = {};

const middleware = [
  thunk,
  logger
]

let store;

if (environment.environment !== 'production') {
  store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
} else {
  store = createStore(reducer, initialState, applyMiddleware(...middleware));
}

export default store;
