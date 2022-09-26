import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import commitStore from "./commitStore";

const reducer = combineReducers({
  commitStore,
});
const store = configureStore({
  reducer,
});

export default store;
