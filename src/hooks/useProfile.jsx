// src/hooks/useProfile.js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateUserProfile,
  uploadProfilePicture,
  changeUserEmail,
  deleteProfilePicture,
} from "../app/store/Thunks/profileThunks";
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
  clearProfileError,
} from "../app/store/Slices/profileSlice";
import { extractErrorMessage } from "../utils/errorHandler"; // 🔹 reuse the error helper

// Small logger for grouping
const logProfile = (action, { input, result, error }) => {
  console.group(`[Profile Hook] ${action}`);
  if (input) console.log("➡️ Input:", input);
  if (result) console.log("✅ Result:", result);
  if (error) console.error("❌ Error:", error);
  console.groupEnd();
};

export const useProfile = () => {
  const dispatch = useDispatch();

  // Selectors
  const profile = useSelector(selectProfile);
  const isLoading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);

  // Profile actions
  const getProfile = useCallback(async () => {
    try {
      const result = await dispatch(fetchProfile()).unwrap();
      logProfile("Fetch Profile", { result });
      return { success: true, data: result };
    } catch (err) {
      const msg = extractErrorMessage(err, "خطا در دریافت پروفایل");
      logProfile("Fetch Profile", { error: msg });
      return { success: false, error: msg };
    }
  }, [dispatch]);

  const updateProfile = useCallback(
    async (profileData) => {
      try {
        const result = await dispatch(updateUserProfile(profileData)).unwrap();
        logProfile("Update Profile", { input: profileData, result });
        return { success: true, data: result };
      } catch (err) {
        const msg = extractErrorMessage(err, "خطا در به‌روزرسانی پروفایل");
        logProfile("Update Profile", { input: profileData, error: msg });
        return { success: false, error: msg };
      }
    },
    [dispatch]
  );

  const uploadAvatar = useCallback(
    async (file) => {
      try {
        const result = await dispatch(uploadProfilePicture(file)).unwrap();
        logProfile("Upload Avatar", { input: file?.name, result });
        return { success: true, data: result };
      } catch (err) {
        const msg = extractErrorMessage(err, "خطا در آپلود تصویر پروفایل");
        logProfile("Upload Avatar", { input: file?.name, error: msg });
        return { success: false, error: msg };
      }
    },
    [dispatch]
  );

  const changeEmail = useCallback(
    async (newEmail, password) => {
      try {
        const result = await dispatch(
          changeUserEmail({ newEmail, password })
        ).unwrap();
        logProfile("Change Email", { input: { newEmail }, result });
        return { success: true, data: result };
      } catch (err) {
        const msg = extractErrorMessage(err, "خطا در تغییر ایمیل");
        logProfile("Change Email", { input: { newEmail }, error: msg });
        return { success: false, error: msg };
      }
    },
    [dispatch]
  );

  const deleteAvatar = useCallback(async () => {
    try {
      const result = await dispatch(deleteProfilePicture()).unwrap();
      logProfile("Delete Avatar", { result });
      return { success: true, data: result };
    } catch (err) {
      const msg = extractErrorMessage(err, "خطا در حذف تصویر پروفایل");
      logProfile("Delete Avatar", { error: msg });
      return { success: false, error: msg };
    }
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearProfileError());
    logProfile("Clear Profile Error", { result: "Cleared" });
  }, [dispatch]);

  return {
    // State
    profile,
    isLoading,
    error,

    // Actions
    getProfile,
    updateProfile,
    uploadAvatar,
    changeEmail,
    deleteAvatar,
    clearError,

    // Helper properties
    userProfile: profile,
    avatar: profile?.avatar,
    fullName: profile ? `${profile.Fname} ${profile.Lname}` : "",
    username: profile?.username,
    email: profile?.email,
  };
};

export default useProfile;
