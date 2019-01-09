/**
 * @module utils/store
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import reducer from './reducers'

const initialState = {};

const middleware = [
  thunk,
  logger
]

/* TODO: if (env !== 'production)' */
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
