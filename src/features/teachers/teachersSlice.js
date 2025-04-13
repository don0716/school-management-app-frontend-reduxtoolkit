import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    try {
      const res = await axios.get(
        `https://school-management-app-backend-three.vercel.app/teachers`
      );
      //   console.log("teachersRes:: ", res);
      return res.data;
    } catch (error) {
      console.log(error);
      console.error = error;
    }
  }
);

export const addTeacherAsync = createAsyncThunk(
  "/teachers/addTeacher",
  async (data) => {
    try {
      //   console.log("Data in fetch:: ", data);
      const res = await axios.post(
        `https://school-management-app-backend-three.vercel.app/teachers`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //   console.log("PostData: ", res);
      return res.data;
    } catch (error) {
      console.log(error);
      console.error = error;
    }
  }
);

export const udpateTeacherAsync = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ teacherId, data }) => {
    try {
      console.log("Data to update:: ", teacherId, data);
      const res = await axios.put(
        `https://school-management-app-backend-three.vercel.app/teachers/${teacherId}`,
        data
      );
      console.log("put data:: ", res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteTeacherAsync = createAsyncThunk(
  "teachers/deleteTeacher",
  async (teacherId) => {
    try {
      const res = await axios.delete(
        `https://school-management-app-backend-three.vercel.app/teachers/${teacherId}`
      );

      if (res.status === 200) {
        return teacherId;
      } else {
        return "Failed to Delete";
      }
    } catch (error) {
      return `Error, ${error}`;
    }
  }
);

export const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
    schoolTeacherStats: {
      totalTeachers: 0,
    },
  },
  reducers: {
    updateSchoolTeacherStats: (state, action) => {
      state.schoolTeacherStats.totalTeachers = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchTeachers GET Teachers
    builder.addCase(fetchTeachers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeachers.rejected, (state) => {
      state.status = "error";
    });

    // Post Teachers
    builder.addCase(addTeacherAsync.pending, (state) => {
      state.status = "adding";
    });
    builder.addCase(addTeacherAsync.fulfilled, (state, action) => {
      state.status = "added";
      state.teachers = [...state.teachers, action.payload];
    });
    builder.addCase(addTeacherAsync.rejected, (state) => {
      state.status = "error";
    });

    // Update Teachers
    builder.addCase(udpateTeacherAsync.pending, (state) => {
      state.status = "updating";
    });
    builder.addCase(udpateTeacherAsync.fulfilled, (state, action) => {
      state.status = "updated";
      state.teachers = state.teachers.map((teacher) =>
        teacher._id === action.payload._id ? action.payload : teacher
      );
    });
    builder.addCase(udpateTeacherAsync.rejected, (state) => {
      state.status = "error";
    });

    // Delete Teachers
    builder.addCase(deleteTeacherAsync.pending, (state) => {
      state.status = "deleting";
    });
    builder.addCase(deleteTeacherAsync.fulfilled, (state, action) => {
      state.status = "deleted";
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload
      );
    });
    builder.addCase(deleteTeacherAsync.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { updateSchoolTeacherStats } = teachersSlice.actions;

export default teachersSlice.reducer;
