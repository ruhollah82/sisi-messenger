// src/redux/slices/profileSlice.js
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

export const {
  setProfileLoading,
  setProfile,
  updateProfile,
  setProfileError,
  clearProfileError,
} = profileSlice.actions;

export default profileSlice.reducer;
