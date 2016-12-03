import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import reducer from './reducer';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { App, Browser, Analyzer } from './components';

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
    <Router history={createBrowserHistory()}>
      <Route path="/" component={App}>
        <IndexRoute component={Browser}/>
        <Route path="analyze" component={Analyzer}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-container')
);
