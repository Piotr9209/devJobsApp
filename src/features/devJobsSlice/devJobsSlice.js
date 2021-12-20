import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  devJobs: [],
  loading: true,
  failed: false,
};

const checkForError = (response) => {
  if (!response.ok) throw Error("ERROR" + response.statusText);
  return response.json();
};

export const getDevJobs = createAsyncThunk(
  "devjobs/getDevjobs",
  async (url) => {
    return await fetch(url)
      .then(checkForError)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("FETCH_ERR: ", error);
      });
  }
);

export const devJobsSlice = createSlice({
  name: "devJobsSelected",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDevJobs.pending, (state) => {
      state.failed = false;
      state.loading = true;
    });
    builder.addCase(getDevJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.failed = false;
      state.devJobs = action.payload;
    });
    builder.addCase(getDevJobs.rejected, (state) => {
      state.failed = true;
    });
  },
});