// src/redux/thunks/chatThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api/apiClient";
import API from "../../services/api/apiList";
import {
  setChatLoading,
  setPublicMessages,
  removeMessage,
  setChatError,
} from "../slices/chatSlice";

// Fetch public chat messages
export const fetchPublicChat = createAsyncThunk(
  "chat/fetchPublic",
  async (_, { dispatch }) => {
    try {
      dispatch(setChatLoading(true));

      const response = await apiClient.get(API.getPublicChat);

      if (response.data.code === 1) {
        dispatch(setPublicMessages(response.data.messages || []));
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to fetch chat messages");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setChatError(errorMsg));
      throw error;
    }
  }
);

// Delete a message
export const deleteChatMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (messageId, { dispatch }) => {
    try {
      const response = await apiClient.delete(
        `${API.deleteMessage}/${messageId}`
      );

      if (response.data.code === 1) {
        dispatch(removeMessage(messageId));
        return response.data;
      } else {
        throw new Error(response.data.msg || "Failed to delete message");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message;
      dispatch(setChatError(errorMsg));
      throw error;
    }
  }
);
