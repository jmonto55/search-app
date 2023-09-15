import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  profilesList: [],
  favoriteProfiles: [],
  status: '',
  error: null,
};

const queryParams = axios.create({
  baseURL: 'https://torre.ai/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

function fetchProfiles(query) {
  return queryParams.post('/entities/_searchStream', {
    query,
    identityType: 'person',
    meta: false,
    limit: 10,
    torreGgId: '1562283',
    excludeContacts: true,
    excludedPeople: [],
  });
}

export const filterProfiles = createAsyncThunk(
  'individuals/filterProfiles',
  async (query) => {
    const response = await fetchProfiles(query);
    const data = response.data.split('\n').filter(Boolean).map((line) => JSON.parse(line));
    return data;
  },
);

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const index = state.favoriteProfiles.findIndex(
        (favorite) => favorite.ardaId === action.payload.ardaId,
      );
      if (index >= 0) {
        state.favoriteProfiles.splice(index, 1);
      } else {
        state.favoriteProfiles.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterProfiles.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.profilesList = action.payload;
      })
      .addCase(filterProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite } = profilesSlice.actions;

export default profilesSlice.reducer;
