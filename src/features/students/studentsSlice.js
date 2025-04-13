import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const res = await axios.get(
      `https://school-management-app-backend-three.vercel.app/students`
    );
    return res.data;
  }
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudents",
  async (data) => {
    const res = await axios.post(
      `https://school-management-app-backend-three.vercel.app/students`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudents",
  async ({ studentId, data }) => {
    try {
      console.log("data before res:: ", data, studentId);
      const res = await axios.put(
        `https://school-management-app-backend-three.vercel.app/students/${studentId}`,
        data
      );
      console.log("put Data:: ", res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    try {
      console.log(studentId, "StudentId in thunk");
      const res = await axios.delete(
        `https://school-management-app-backend-three.vercel.app/students/${studentId}`
      );

      if (res.status === 200) {
        return studentId;
      } else {
        return "Failed to Delete";
      }
    } catch (error) {
      return `Error, ${error}`;
    }
  }
);

export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
    schoolStats: {
      totalStudents: 0,
      averageAttendance: 0,
      averageMarks: 0,
      topStudent: "-",
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload; // "All", "Boys", "Girls"
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload; // "name" or "age"
    },
    updateSchoolStats: (state, action) => {
      state.schoolStats = action.payload; // object of schoolStats from schoolView page.
    },
  },
  extraReducers: (builder) => {
    // GET STUDENTS
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    // ADD STUDENT
    builder.addCase(addStudentAsync.pending, (state) => {
      state.status = "adding";
    });
    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.students = [...state.students, action.payload];
    });
    builder.addCase(addStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    // Update Student
    builder.addCase(updateStudentAsync.pending, (state) => {
      state.status = "updating";
    });
    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      state.status = "updated";
      state.students = state.students.map((stud) =>
        stud._id === action.payload._id ? action.payload : stud
      );
    });
    builder.addCase(updateStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    // Delete
    builder.addCase(deleteStudentAsync.pending, (state) => {
      state.status = "deleting";
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.status = "deleted";
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    });
    builder.addCase(deleteStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });
  },
});

export const { setFilter, setSortBy, updateSchoolStats } =
  studentsSlice.actions;

export default studentsSlice.reducer;
