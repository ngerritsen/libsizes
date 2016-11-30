import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import './styles/global.scss';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app-container')
);
