import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  devJobs: [],
  loading: true,
  failed: false,
  success: false,
  toggleTheme: false,
  filteredCharacters: "",
  filterLocationCompany: "",
  filterFullTimeWork: false,
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
    setToggleTheme: (state) => {
      state.toggleTheme = !state.toggleTheme;
    },
    setEmptyDevJobs: (state) => {
      state.devJobs = [];
    },
    filterDevJobs: (state, action) => {
      action.payload.length >= 3
        ? (state.filteredCharacters = action.payload)
        : (state.filteredCharacters = "");
    },
    setFilterLocationCompany: (state, action) => {
      action.payload.length >= 3
        ? (state.filterLocationCompany = action.payload)
        : (state.filterLocationCompany = "");
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
  setToggleTheme,
  setEmptyDevJobs,
  filterDevJobs,
  setFilterFullTimeWork,
  setFilterLocationCompany,
} = devJobsSlice.actions;
