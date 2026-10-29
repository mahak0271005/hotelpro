import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hotelsAPI } from '../../services/api';
import { toast } from 'react-toastify';

export const fetchHotels = createAsyncThunk(
  'hotels/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await hotelsAPI.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch hotels');
    }
  }
);

export const fetchHotelById = createAsyncThunk(
  'hotels/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await hotelsAPI.getOne(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch hotel details');
    }
  }
);

export const createHotel = createAsyncThunk(
  'hotels/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await hotelsAPI.create(data);
      toast.success('Hotel created successfully!');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create hotel');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateHotel = createAsyncThunk(
  'hotels/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await hotelsAPI.update(id, data);
      toast.success('Hotel updated successfully!');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update hotel');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteHotel = createAsyncThunk(
  'hotels/delete',
  async (id, { rejectWithValue }) => {
    try {
      await hotelsAPI.delete(id);
      toast.success('Hotel deleted successfully!');
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete hotel');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    hotels: [],
    currentHotel: null,
    totalCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentHotel: (state) => {
      state.currentHotel = null;
    },
    clearHotelError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchHotels
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.hotels || action.payload.data || [];
        state.totalCount = action.payload.totalCount || state.hotels.length;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchHotelById
      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHotel = action.payload.hotel || action.payload.data;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createHotel
      .addCase(createHotel.fulfilled, (state, action) => {
        const newHotel = action.payload.hotel || action.payload.data;
        if (newHotel) state.hotels.unshift(newHotel);
      })
      // updateHotel
      .addCase(updateHotel.fulfilled, (state, action) => {
        const updated = action.payload.hotel || action.payload.data;
        if (updated) {
          state.hotels = state.hotels.map((h) => (h._id === updated._id ? updated : h));
          if (state.currentHotel?._id === updated._id) {
            state.currentHotel = updated;
          }
        }
      })
      // deleteHotel
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter((h) => h._id !== action.payload);
      });
  },
});

export const { clearCurrentHotel, clearHotelError } = hotelSlice.actions;
export default hotelSlice.reducer;
