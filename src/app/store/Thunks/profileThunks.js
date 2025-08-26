// src/redux/thunks/profileThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api/apiClient";
import API from "../../services/api/apiList";
import {
  setProfileLoading,
  setProfile,
  updateProfile,
  setProfileError,
} from "../slices/profileSlice";

// Get user profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { dispatch }) => {
    try {
      dispatch(setProfileLoading(true));

      const response = await apiClient.get(API.getProfile);

      if (response.data.code === 1) {
        dispatch(setProfile(response.data));
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to fetch profile");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setProfileError(errorMsg));
      throw error;
    }
  }
);

// Upload profile picture
export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadPicture",
  async (file, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("Profil", file);

      const response = await apiClient.put(
        API.putUploadProfilePicture,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.code === 1) {
        dispatch(updateProfile({ avatar: response.data.avatar }));
        return response.data;
      } else {
        throw new Error(
          response.data.msg || "Failed to upload profile picture"
        );
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setProfileError(errorMsg));
      throw error;
    }
  }
);

// Update profile
export const updateUserProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { dispatch }) => {
    try {
      const formData = new FormData();
      Object.keys(profileData).forEach((key) => {
        formData.append(key, profileData[key]);
      });

      const response = await apiClient.put(API.putUpdateProfile, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.code === 1) {
        dispatch(updateProfile(profileData));
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to update profile");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setProfileError(errorMsg));
      throw error;
    }
  }
);

// Delete profile picture
export const deleteProfilePicture = createAsyncThunk(
  "profile/deletePicture",
  async (_, { dispatch }) => {
    try {
      const response = await apiClient.delete(API.deleteProfilePicture);

      if (response.data.code === 1) {
        dispatch(updateProfile({ avatar: null }));
        return response.data;
      } else {
        throw new Error(
          response.data.msg || "Failed to delete profile picture"
        );
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setProfileError(errorMsg));
      throw error;
    }
  }
);
