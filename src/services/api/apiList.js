/**
 * API Configuration Constants
 * Defines all API endpoints with dynamic base URL construction
 */

const config = {
  customAddress: "https://api.sisia.ir",
  port: "3001",
  baseURL: "/api",
};

// Construct base URL
export const getBaseURL = () => {
  const { customAddress, port, baseURL } = config;
  return customAddress
    ? `http://${customAddress}${baseURL}`
    : `http://localhost:${port}${baseURL}`;
};

const API_BASE_URL = getBaseURL();

// API endpoints
const API = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/Auth/login`,
    REGISTER: `${API_BASE_URL}/Auth/register`,
    REFRESH_TOKEN: `${API_BASE_URL}/Auth/refreshtoken`,
    LOGOUT: `${API_BASE_URL}/Auth/logout`,
  },

  // Profile
  PROFILE: {
    GET: `${API_BASE_URL}/Profile/`,
    UPLOAD_PICTURE: `${API_BASE_URL}/Profile/uploadProfilePicture`,
    UPDATE: `${API_BASE_URL}/Profile/updateProfile`,
    CHANGE_EMAIL: `${API_BASE_URL}/Profile/changeEmail`,
    DELETE_PICTURE: `${API_BASE_URL}/Profile/deleteProfilePicture`,
  },

  // Chat
  CHAT: {
    PUBLIC: `${API_BASE_URL}/Chat/PublicChat`,
    DELETE_MESSAGE: (id) => `${API_BASE_URL}/Chat/DeleteMessage${id}`,
    EDIT_MESSAGE: `${API_BASE_URL}/Chat/EditMessage`,
    UPLOAD_FILE: `${API_BASE_URL}/Chat/UploadFile`,
  },
};

export default API;
