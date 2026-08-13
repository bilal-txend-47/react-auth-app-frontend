import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signin", { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signin failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signinUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;