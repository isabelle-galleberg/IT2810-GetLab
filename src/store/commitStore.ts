import { createSlice } from "@reduxjs/toolkit";
import Branch from "../types/api/branch";
import Commit from "../types/api/Commit";
import CommitFilter from "../types/commitFilter";

export const commitState = createSlice({
  name: "commitState",
  initialState: {
    filter: {} as CommitFilter,
    commits: [] as Commit[],
    branches: [] as Branch[],
  },
  reducers: {
    setCommits: (state, action) => {
      state.filter = action.payload;
    },
    setFilter: (state, action) => {
      state.commits = action.payload;
    },
    setBranch: (state, action) => {
      state.branches = action.payload;
    },
  },
});

export const { setCommits, setFilter } = commitState.actions;
export default commitState.reducer;
