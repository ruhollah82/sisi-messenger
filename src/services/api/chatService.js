import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiList";

export const chatService = {
  getPublicChat: () => apiClient.get(API_ENDPOINTS.CHAT.PUBLIC),

  deleteMessage: (messageId) =>
    apiClient.get(API_ENDPOINTS.CHAT.DELETE_MESSAGE(messageId)),

  editMessage: (messageData) =>
    apiClient.put(API_ENDPOINTS.CHAT.EDIT_MESSAGE, messageData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  uploadFile: (formData) =>
    apiClient.post(API_ENDPOINTS.CHAT.UPLOAD_FILE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
