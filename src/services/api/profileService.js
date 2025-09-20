import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiList";

export const profileService = {
  getProfile: () => apiClient.get(API_ENDPOINTS.PROFILE.GET),

  uploadProfilePicture: (formData) =>
    apiClient.put(API_ENDPOINTS.PROFILE.UPLOAD_PICTURE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateProfile: (profileData) =>
    apiClient.put(API_ENDPOINTS.PROFILE.UPDATE, profileData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  changeEmail: (emailData) =>
    apiClient.put(API_ENDPOINTS.PROFILE.CHANGE_EMAIL, emailData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  deleteProfilePicture: () =>
    apiClient.delete(API_ENDPOINTS.PROFILE.DELETE_PICTURE),
};
