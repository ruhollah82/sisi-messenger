import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api/apiClient";
import API from "../../services/api/apiList";
import {
  setChatLoading,
  setPublicMessages,
  removeMessage,
  updateMessage,
  setChatError,
} from "../slices/chatSlice";

// Fetch public chat messages
export const fetchPublicChat = createAsyncThunk(
  "chat/fetchPublic",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setChatLoading(true));

      const response = await apiClient.get(API.CHAT.PUBLIC, {
        withCredentials: true,
      });

      if (response.data.code === 1) {
        dispatch(setPublicMessages(response.data.messages || []));
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to fetch chat messages");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setChatError(errorMsg));
      return rejectWithValue(errorMsg);
    }
  }
);

// Delete a message
export const deleteChatMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (messageId, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.CHAT.DELETE_MESSAGE(messageId), {
        withCredentials: true,
      });

      if (response.data.code === 1) {
        dispatch(removeMessage(messageId));
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to delete message");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setChatError(errorMsg));
      return rejectWithValue(errorMsg);
    }
  }
);

// Edit a message
export const editChatMessage = createAsyncThunk(
  "chat/editMessage",
  async ({ id, newMessage }, { dispatch, rejectWithValue }) => {
    try {
      const formData = new URLSearchParams();
      formData.append("id", id);
      formData.append("newMessage", newMessage);

      const response = await apiClient.put(API.CHAT.EDIT_MESSAGE, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });

      if (response.data.code === 1) {
        dispatch(updateMessage({ id, newMessage }));
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to edit message");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setChatError(errorMsg));
      return rejectWithValue(errorMsg);
    }
  }
);

// Upload a file
export const uploadChatFile = createAsyncThunk(
  "chat/uploadFile",
  async (file, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("File", file);

      const response = await apiClient.post(API.CHAT.UPLOAD_FILE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.code === 1) {
        // You might want to add the uploaded file to the chat
        // or refetch the chat messages
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to upload file");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setChatError(errorMsg));
      return rejectWithValue(errorMsg);
    }
  }
);
