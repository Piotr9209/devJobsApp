import { configureStore } from "@reduxjs/toolkit";
import { devJobsSlice } from "../devjobsSlice/devjobsSlice";

const store = configureStore({
  reducer: {
    devJobs: devJobsSlice.reducer,
  },
});

export default store;
