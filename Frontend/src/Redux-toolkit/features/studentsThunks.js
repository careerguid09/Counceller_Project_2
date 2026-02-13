import { createAsyncThunk } from "@reduxjs/toolkit";
import { authFetch } from "../../utils/authFetch";

// ---------------- CREATE ----------------
export const createStudent = createAsyncThunk(
  "students/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await authFetch("/clients", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create student");
    }
  }
);

// ---------------- FETCHING ----------------
export const getAllStudents = createAsyncThunk(
  "students/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await authFetch("/clients");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getStudentsByDomain = createAsyncThunk(
  "students/byDomain",
  async (domain, { rejectWithValue }) => {
    try {
      return await authFetch(`/clients/domain/${encodeURIComponent(domain)}`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getStudentsByCourse = createAsyncThunk(
  "students/byCourse",
  async (course, { rejectWithValue }) => {
    try {
      return await authFetch(`/clients/course/${encodeURIComponent(course)}`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const dynamicFilterStudents = createAsyncThunk(
  "students/dynamicFilter",
  async (query, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(query).toString();
      return await authFetch(`/clients/filter?${params}`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ---------------- CRUD ----------------
export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id, { rejectWithValue }) => {
    try {
      await authFetch(`/clients/${id}`, { method: "DELETE" });
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateStudentStatus = createAsyncThunk(
  "students/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await authFetch(`/clients/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ---------------- STATS ----------------
export const getDashboardStats = createAsyncThunk(
  "students/dashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      return await authFetch("/clients/dashboard-stats");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getDomainStats = createAsyncThunk(
  "students/domainStats",
  async (_, { rejectWithValue }) => {
    try {
      return await authFetch("/clients/stats/domain");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCourseStats = createAsyncThunk(
  "students/courseStats",
  async (domain, { rejectWithValue }) => {
    try {
      return await authFetch(`/clients/stats/course/${encodeURIComponent(domain)}`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ---------------- VIEWED TRACKING ----------------
export const getRecentNewStudents = createAsyncThunk(
  "students/recentNew",
  async (_, { rejectWithValue }) => {
    try {
      return await authFetch("/clients/recent-new");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getUnviewedCounts = createAsyncThunk(
  "students/unviewedCounts",
  async (_, { rejectWithValue }) => {
    try {
      return await authFetch("/clients/unviewed-counts");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const markStudentViewed = createAsyncThunk(
  "students/markStudentViewed",
  async (clientId, { rejectWithValue }) => {
    try {
      return await authFetch(`/clients/student/viewed/${clientId}`, {
        method: "PATCH",
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const markDomainViewed = createAsyncThunk(
  "students/markDomainViewed",
  async (domain, { rejectWithValue }) => {
    try {
      return await authFetch(`/clients/domain/viewed/${encodeURIComponent(domain)}`, {
        method: "PATCH",
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const markCourseViewed = createAsyncThunk(
  "students/markCourseViewed",
  async (course, { rejectWithValue }) => {
    try {
      return await authFetch(`/clients/course/viewed/${encodeURIComponent(course)}`, {
        method: "PATCH",
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const bulkMarkViewed = createAsyncThunk(
  "students/bulkViewed",
  async (payload, { rejectWithValue }) => {
    try {
      return await authFetch("/clients/bulk-viewed", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);