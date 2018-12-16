import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import globalReducer from './models/global';

const win = window;

const reducer = combineReducers({
  global: globalReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  // middlewares.push(require('redux-immutable-state-invariant')());
  middlewares.push(require('redux-immutable-state-invariant').default()); // 后续版本写法
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  win && win.devToolsExtension ? win.devToolsExtension() : f => f
);

// 初始化store数据
const initialState = {};

export default createStore(reducer, initialState, storeEnhancers);
