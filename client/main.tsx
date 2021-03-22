import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./components/App";
import Browser from "./components/Browser";
import Analyzer from "./components/Analyzer";
import Details from "./components/Details";

import store from "./store";

import "./styles/global.scss";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path="/" exact component={Browser} />
          <Route path="/analyze" component={Analyzer} />
          <Route path="/library/:library" component={Details} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app-container")
);
