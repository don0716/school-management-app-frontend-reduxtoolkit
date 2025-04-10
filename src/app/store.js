import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "../features/students/studentsSlice";

export default configureStore({
  reducer: {
    students: studentsSlice.reducer,
  },
});
