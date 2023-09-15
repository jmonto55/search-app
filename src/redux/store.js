import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profiles/profilesSlice';

export const store = configureStore({
  reducer: {
    profiles: profilesReducer,
  },
});

export default store;
