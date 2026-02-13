import { createSlice } from "@reduxjs/toolkit";
import {
  getAllStudents, getStudentsByDomain, getStudentsByCourse,
  dynamicFilterStudents, createStudent, deleteStudent,
  updateStudentStatus, getDashboardStats, getDomainStats,
  getCourseStats, getRecentNewStudents, getUnviewedCounts,
  markStudentViewed, markDomainViewed, markCourseViewed
} from "./studentsThunks";

const initialState = {
  students: [],
  stats: {
    domain: [],
    course: [],
    overall: { total: 0, new: 0, inProgress: 0, completed: 0 }
  },
  dashboard: {},
  unviewedCounts: {},
  recentNew: [],
  loading: false,
  error: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearStudentError: (state) => {
      state.error = null;
    },
    resetStudents: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ================= FETCHING =================
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.clients || action.payload.data || action.payload;
      })
      .addCase(getStudentsByDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.data || action.payload;
      })
      .addCase(getStudentsByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.data || action.payload;
      })
      .addCase(dynamicFilterStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.data || action.payload;
      })

      // ================= CRUD =================
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        const newStudent = action.payload.client || action.payload;
        state.students.unshift(newStudent);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter((s) => s._id !== action.payload);
      })
      .addCase(updateStudentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.client || action.payload;
        const index = state.students.findIndex((s) => s._id === updated._id);
        if (index !== -1) state.students[index] = updated;
      })

      // ================= STATS =================
      .addCase(getDomainStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats.domain = action.payload.domainStats || [];
        state.stats.overall = action.payload.overallStats || initialState.stats.overall;
      })
      .addCase(getCourseStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats.course = action.payload.courseStats || [];
      })

      // ================= VIEW TRACKING (UI Optimization) =================
      .addCase(markStudentViewed.fulfilled, (state, action) => {
        state.loading = false;
        const student = state.students.find((s) => s._id === action.meta.arg);
        if (student) {
          student.studentViewed = true;
          student.isNew = false;
        }
      })
      .addCase(markDomainViewed.fulfilled, (state, action) => {
        const domainName = action.meta.arg;
        const domain = state.stats.domain.find(d => d.domain === domainName);
        if (domain) domain.hasNew = false;
      })
      .addCase(markCourseViewed.fulfilled, (state, action) => {
        const courseName = action.meta.arg;
        const course = state.stats.course.find(c => c.course === courseName);
        if (course) course.hasNew = false;
      })

      // ================= GLOBAL MATCHERS =================
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          // FIX: Only show loading if we have NO data. 
          // If we already have students, let them stay on screen while we fetch new ones.
          if (
            (action.type === "students/domainStats/pending" || action.type === "students/getAll/pending") &&
            state.students.length === 0
          ) {
            state.loading = true;
          }
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearStudentError, resetStudents } = studentsSlice.actions;
export default studentsSlice.reducer;