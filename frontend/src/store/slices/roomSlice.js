import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { roomsAPI } from '../../services/api';
import { toast } from 'react-toastify';

export const fetchRooms = createAsyncThunk(
  'rooms/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await roomsAPI.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch rooms');
    }
  }
);

export const fetchRoomById = createAsyncThunk(
  'rooms/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await roomsAPI.getOne(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch room');
    }
  }
);

export const createRoom = createAsyncThunk(
  'rooms/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await roomsAPI.create(data);
      toast.success('Room created successfully!');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create room');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateRoom = createAsyncThunk(
  'rooms/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await roomsAPI.update(id, data);
      toast.success('Room updated successfully!');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update room');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateRoomStatus = createAsyncThunk(
  'rooms/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await roomsAPI.updateStatus(id, status);
      toast.success(`Room status updated to ${status}`);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  'rooms/delete',
  async (id, { rejectWithValue }) => {
    try {
      await roomsAPI.delete(id);
      toast.success('Room deleted successfully!');
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete room');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    currentRoom: null,
    totalCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentRoom: (state) => {
      state.currentRoom = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchRooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.rooms || action.payload.data || [];
        state.totalCount = action.payload.totalCount || state.rooms.length;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchRoomById
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRoom = action.payload.room || action.payload.data;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createRoom
      .addCase(createRoom.fulfilled, (state, action) => {
        const newRoom = action.payload.room || action.payload.data;
        if (newRoom) state.rooms.unshift(newRoom);
      })
      // updateRoom
      .addCase(updateRoom.fulfilled, (state, action) => {
        const updated = action.payload.room || action.payload.data;
        if (updated) {
          state.rooms = state.rooms.map((r) => (r._id === updated._id ? updated : r));
          if (state.currentRoom?._id === updated._id) state.currentRoom = updated;
        }
      })
      // updateRoomStatus
      .addCase(updateRoomStatus.fulfilled, (state, action) => {
        const updated = action.payload.room || action.payload.data;
        if (updated) {
          state.rooms = state.rooms.map((r) => (r._id === updated._id ? updated : r));
          if (state.currentRoom?._id === updated._id) state.currentRoom = updated;
        }
      })
      // deleteRoom
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((r) => r._id !== action.payload);
      });
  },
});

export const { clearCurrentRoom } = roomSlice.actions;
export default roomSlice.reducer;
