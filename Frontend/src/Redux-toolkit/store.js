import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/studentsSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;


