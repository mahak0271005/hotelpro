import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';

const storedUser  = JSON.parse(localStorage.getItem('hotelpro_user')  || 'null');
const storedToken = localStorage.getItem('hotelpro_token') || null;

// ─── Async Thunks ─────────────────────────────────────────────────────────────
export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.register(data);
    localStorage.setItem('hotelpro_token', res.data.token);
    localStorage.setItem('hotelpro_user', JSON.stringify(res.data.user));
    toast.success(res.data.message || 'Registration successful!');
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Registration failed');
    return rejectWithValue(err.response?.data?.message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.login(data);
    localStorage.setItem('hotelpro_token', res.data.token);
    localStorage.setItem('hotelpro_user', JSON.stringify(res.data.user));
    toast.success(`Welcome back, ${res.data.user.firstName}!`);
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Login failed');
    return rejectWithValue(err.response?.data?.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authAPI.logout();
    localStorage.removeItem('hotelpro_token');
    localStorage.removeItem('hotelpro_user');
    toast.success('Logged out successfully');
  } catch (err) {
    localStorage.removeItem('hotelpro_token');
    localStorage.removeItem('hotelpro_user');
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const res = await authAPI.getMe();
    localStorage.setItem('hotelpro_user', JSON.stringify(res.data.user));
    return res.data;
  } catch (err) {
    localStorage.removeItem('hotelpro_token');
    localStorage.removeItem('hotelpro_user');
    return rejectWithValue(err.response?.data?.message);
  }
});

export const forgotPasswordThunk = createAsyncThunk('auth/forgotPassword', async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.forgotPassword(data);
    toast.success(res.data.message);
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to send reset email');
    return rejectWithValue(err.response?.data?.message);
  }
});

export const resetPasswordThunk = createAsyncThunk('auth/resetPassword', async ({ token, data }, { rejectWithValue }) => {
  try {
    const res = await authAPI.resetPassword(token, data);
    localStorage.setItem('hotelpro_token', res.data.token);
    localStorage.setItem('hotelpro_user', JSON.stringify(res.data.user));
    toast.success('Password reset successful!');
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Reset failed');
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updatePasswordThunk = createAsyncThunk('auth/updatePassword', async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.updatePassword(data);
    toast.success('Password updated successfully!');
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to update password');
    return rejectWithValue(err.response?.data?.message);
  }
});

// ─── Slice ────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:      storedUser,
    token:     storedToken,
    isLoading: false,
    error:     null,
    isAuthenticated: !!storedToken,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    updateUserInStore: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('hotelpro_user', JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => { state.isLoading = true; state.error = null; };
    const setError   = (state, action) => { state.isLoading = false; state.error = action.payload; };

    builder
      .addCase(registerUser.pending,   setLoading)
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false; state.user = payload.user;
        state.token = payload.token; state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected,  setError)

      .addCase(loginUser.pending,   setLoading)
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false; state.user = payload.user;
        state.token = payload.token; state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected,  setError)

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; state.token = null; state.isAuthenticated = false;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload.user; state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null; state.token = null; state.isAuthenticated = false;
      })

      .addCase(resetPasswordThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false; state.user = payload.user;
        state.token = payload.token; state.isAuthenticated = true;
      });
  },
});

export const { clearError, updateUserInStore } = authSlice.actions;
export default authSlice.reducer;
