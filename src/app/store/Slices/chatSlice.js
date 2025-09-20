import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publicMessages: [],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPublicMessages: (state, action) => {
      state.publicMessages = action.payload;
      state.error = null;
    },
    addMessage: (state, action) => {
      state.publicMessages.push(action.payload);
    },
    updateMessage: (state, action) => {
      const index = state.publicMessages.findIndex(
        (msg) => msg.id === action.payload.id
      );
      if (index !== -1) {
        state.publicMessages[index] = action.payload;
      }
    },
    removeMessage: (state, action) => {
      state.publicMessages = state.publicMessages.filter(
        (msg) => msg.id !== action.payload
      );
    },
    setChatError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearChatError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setChatLoading,
  setPublicMessages,
  addMessage,
  updateMessage,
  removeMessage,
  setChatError,
  clearChatError,
} = chatSlice.actions;

export default chatSlice.reducer;
