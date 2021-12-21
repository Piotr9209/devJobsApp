import { configureStore } from "@reduxjs/toolkit";
import { devJobsSlice } from "../devJobsSlice/devJobsSlice";

const store = configureStore({
  reducer: {
    devJobs: devJobsSlice.reducer,
  },
});

export default store;
