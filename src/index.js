import React from "react";
import ReactDOM from "react-dom";
import { Header } from "./components/header/Header";
import { Jobs } from "./components/jobs/Jobs";
import { Job } from "./components/jobs/Job";
import { Provider } from "react-redux";
import store from "./features/store/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route exact path="/" component={Jobs} />
          <Route exact path="/id/:id" component={Job} />
          <Route exact path="/" children={<Jobs />} />
        </Switch>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
