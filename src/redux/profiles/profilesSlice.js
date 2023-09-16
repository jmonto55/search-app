import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  profilesList: [],
  favoriteProfiles: [],
  lastProfiles: [],
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
    torreGgId: '1420940',
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

export const createFavoriteProfile = createAsyncThunk(
  'profiles/createFavoriteProfile',
  async (profileData) => {
    const response = await axios.post('http://localhost:3000/favorite_users', profileData);
    return response.data;
  },
);

export const createLastSearched = createAsyncThunk(
  'profiles/createLastSearched',
  async (profileData) => {
    const response = await axios.post('http://localhost:3000/last_searcheds', profileData);
    return response.data;
  },
);

export const fetchFavoriteProfiles = createAsyncThunk(
  'profiles/fetchFavoriteProfiles',
  async () => {
    const response = await axios.get('http://localhost:3000/favorite_users');
    return response.data;
  },
);

export const fetchLastSearched = createAsyncThunk(
  'profiles/fetchLastSearched',
  async () => {
    const response = await axios.get('http://localhost:3000/last_searcheds');
    return response.data;
  },
);

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(filterProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profilesList = action.payload;
      })
      .addCase(filterProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFavoriteProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavoriteProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favoriteProfiles = action.payload;
      })
      .addCase(fetchFavoriteProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchLastSearched.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLastSearched.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastProfiles = action.payload;
      })
      .addCase(fetchLastSearched.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite } = profilesSlice.actions;

export default profilesSlice.reducer;
