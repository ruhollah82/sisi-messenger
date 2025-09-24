// src/app/store/Slices/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.error = null;
    },
    updateProfile: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setProfileError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearProfileError: (state) => {
      state.error = null;
    },
  },
});

// Add these selectors
export const selectProfile = (state) => state.profile.profile;
export const selectProfileLoading = (state) => state.profile.isLoading;
export const selectProfileError = (state) => state.profile.error;

export const {
  setProfileLoading,
  setProfile,
  updateProfile,
  setProfileError,
  clearProfileError,
} = profileSlice.actions;

export default profileSlice.reducer;
