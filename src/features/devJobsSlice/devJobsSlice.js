import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const initialState = {
  devJobs: [],
  loading: true,
  failed: false,
  success: false,
  filteredCharacters: "",
  filterLocationCompany: "",
  filterFullTimeWork: "",
};

const url = "http://localhost:8000/job/?";

const checkForError = (response) => {
  if (!response.ok) throw Error("ERROR" + response.statusText);
  return response.json();
};

export const getDevJobs = createAsyncThunk("devjobs/getDevjobs", async (id) => {
  return await fetch(url + id)
    .then(checkForError)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("FETCH_ERR: ", error);
    });
});

export const devJobsSlice = createSlice({
  name: "devJobsSelected",
  initialState,
  reducers: {
    setEmptyDevJobs: (state) => {
      state.devJobs = [];
    },
    filterDevJobs: (state, action) => {
      state.filteredCharacters = action.payload;
    },
    setFilterLocationCompany: (state, action) => {
      state.filterLocationCompany = action.payload;
    },
    setFilterFullTimeWork: (state, action) => {
      state.filterFullTimeWork = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDevJobs.pending, (state) => {
      state.failed = false;
      state.loading = true;
    });
    builder.addCase(getDevJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.failed = false;
      state.success = true;
      state.devJobs = action.payload;
    });
    builder.addCase(getDevJobs.rejected, (state) => {
      state.failed = true;
    });
  },
});

export const {
  setEmptyDevJobs,
  filterDevJobs,
  setFilterFullTimeWork,
  setFilterLocationCompany,
} = devJobsSlice.actions;
