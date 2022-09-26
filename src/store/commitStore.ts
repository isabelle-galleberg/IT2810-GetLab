import { createSlice } from "@reduxjs/toolkit";
import Branch from "../types/api/branch";
import Commit from "../types/api/commit";
import CommitFilter from "../types/commitFilter";
// Slice
const slice = createSlice({
  name: "commitStore",
  initialState: {
    filter: {} as CommitFilter,
    commits: [] as Commit[],
    branches: [{ name: "asdas", web_url: "test" }] as Branch[],
  },
  reducers: {
    setCommits: (state, action) => {
      state.commits = action.payload;
    },
    setFilter: (state, action) => {
      console.log(action.payload);
      state.filter = action.payload;
    },
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
  },
});
export const { setCommits, setFilter, setBranches } = slice.actions;
export default slice.reducer;
