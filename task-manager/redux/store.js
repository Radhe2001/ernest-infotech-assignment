import { configureStore } from "@reduxjs/toolkit";
import changeReducer from "./changeSlice"


export const store = configureStore({
  reducer: {
    change: changeReducer,
  },
});
