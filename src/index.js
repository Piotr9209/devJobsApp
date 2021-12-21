import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Jobs } from "./components/jobs/Jobs";
import { Provider } from "react-redux";
import store from "./features/store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Jobs />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
