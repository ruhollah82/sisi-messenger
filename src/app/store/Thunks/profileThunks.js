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
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setProfileLoading(true));

      const response = await apiClient.get(API.PROFILE.GET, {
        withCredentials: true,
      });

      if (response.data.code === 1) {
        dispatch(setProfile(response.data));
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to fetch profile");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setProfileError(errorMsg));
      return rejectWithValue(errorMsg);
    }
  }
);

// Upload profile picture
export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadPicture",
  async (file, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("Profile", file); // Note: Changed from "Profil" to "Profile" to match API spec

      const response = await apiClient.put(
        API.PROFILE.UPLOAD_PICTURE,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
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
      return rejectWithValue(errorMsg);
    }
  }
);

// Update profile
export const updateUserProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { dispatch, rejectWithValue }) => {
    try {
      // Use URLSearchParams for x-www-form-urlencoded format
      const formData = new URLSearchParams();
      Object.keys(profileData).forEach((key) => {
        formData.append(key, profileData[key]);
      });

      const response = await apiClient.put(API.PROFILE.UPDATE, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
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
      return rejectWithValue(errorMsg);
    }
  }
);

// Change email
export const changeUserEmail = createAsyncThunk(
  "profile/changeEmail",
  async (emailData, { dispatch, rejectWithValue }) => {
    try {
      const formData = new URLSearchParams();
      formData.append("newEmail", emailData.newEmail);
      formData.append("password", emailData.password);

      const response = await apiClient.put(API.PROFILE.CHANGE_EMAIL, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });

      if (response.data.code === 1) {
        // You might want to update the profile with the new email
        // or refetch the profile
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to change email");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setProfileError(errorMsg));
      return rejectWithValue(errorMsg);
    }
  }
);

// Delete profile picture
export const deleteProfilePicture = createAsyncThunk(
  "profile/deletePicture",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiClient.delete(API.PROFILE.DELETE_PICTURE, {
        withCredentials: true,
      });

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
      return rejectWithValue(errorMsg);
    }
  }
);
