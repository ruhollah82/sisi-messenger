// src/services/api/apiList.js
/**
 * API Configuration Constants
 * Defines all API endpoints with dynamic base URL construction
 */

const config = {
  customAddress: "api.sisia.ir",
  port: "3001",
  baseURL: "/api",
};

// Construct base URL
export const getBaseURL = () => {
  const { customAddress, port, baseURL } = config;
  return customAddress
    ? `https://${customAddress}${baseURL}`
    : `http://localhost:${port}${baseURL}`;
};

const API_BASE_URL = getBaseURL();

// API endpoints
const API = {
  // Authentication
  AUTH: {
    LOGIN: `/Auth/login`, // Remove the base URL from these paths
    REGISTER: `/Auth/register`,
    REFRESH_TOKEN: `/Auth/refreshtoken`,
    LOGOUT: `/Auth/logout`,
  },

  // Profile
  PROFILE: {
    GET: `/Profile`,
    UPLOAD_PICTURE: `/Profile/uploadProfilePicture`,
    UPDATE: `/Profile/updateProfile`,
    CHANGE_EMAIL: `/Profile/changeEmail`,
    DELETE_PICTURE: `/Profile/deleteProfilePicture`,
  },

  // Chat
  CHAT: {
    PUBLIC: `/Chat/PublicChat`,
    DELETE_MESSAGE: (id) => `/Chat/DeleteMessage${id}`,
    EDIT_MESSAGE: `/Chat/EditMessage`,
    UPLOAD_FILE: `/Chat/UploadFile`,
  },
};

export default API;
// export { getBaseURL };
