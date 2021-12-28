import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Jobs } from "./components/jobs/Jobs";
<<<<<<< HEAD
import { Header } from "./components/header/Header.jsx";
=======
import { Job } from "./components/jobs/Job";
>>>>>>> showJobs
import { Provider } from "react-redux";
import store from "./features/store/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
    <Provider store={store}>
      <Header />
      <App />
      <Jobs />
    </Provider>
=======
    <Router>
      <Provider store={store}>
        <App />
        <Switch>
          <Route exact path="/" component={Jobs} />
          <Route exact path="/id/:id" component={Job} />
        </Switch>
        {/* <Jobs /> */}
      </Provider>
    </Router>
>>>>>>> showJobs
  </React.StrictMode>,
  document.getElementById("root")
);
