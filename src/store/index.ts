import { configureStore } from "@reduxjs/toolkit";
import commitReducer from "./commitStore";
export const store = configureStore({
  reducer: {
    commits: commitReducer,
  },
});
