import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookingsAPI } from '../../services/api';
import { toast } from 'react-toastify';

export const createBooking = createAsyncThunk(
  'bookings/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await bookingsAPI.create(data);
      toast.success('Reservation request created successfully!');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  'bookings/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await bookingsAPI.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await bookingsAPI.getOne(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch booking details');
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancel',
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const res = await bookingsAPI.cancel(id, { reason });
      toast.success('Booking cancelled successfully');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    currentBooking: null,
    totalCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createBooking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.booking || action.payload.data;
        if (state.currentBooking) state.bookings.unshift(state.currentBooking);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchBookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings || action.payload.data || [];
        state.totalCount = action.payload.totalCount || state.bookings.length;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchBookingById
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.booking || action.payload.data;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // cancelBooking
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const updated = action.payload.booking || action.payload.data;
        if (updated) {
          state.bookings = state.bookings.map((b) => (b._id === updated._id ? updated : b));
          if (state.currentBooking?._id === updated._id) state.currentBooking = updated;
        }
      });
  },
});

export const { clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
