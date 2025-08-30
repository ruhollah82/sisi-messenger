// src/services/api/apiList.js
/**
 * API Configuration Constants
 *
 * Defines all API endpoints with dynamic base URL construction
 * Supports both custom IP and localhost development environments
 */
const customAddress = "";
const port = "3001";
const baseURL = "/api";

// Constructs base URL for API endpoints
const apiBaseURL = customAddress
  ? `https://${customAddress}${baseURL}`
  : `http://localhost:${port}${baseURL}`;

const API = {
  // ======================
  // AUTHENTICATION APIS
  // ======================

  /**
   * POST: User login
   * @param {string} email - User's email address
   * @param {string} password - User's password
   */
  postLogin: `${apiBaseURL}/Auth/login`,

  /**
   * POST: User registration
   * @param {string} email - User's email address
   * @param {string} pass1 - Password
   * @param {string} pass2 - Password confirmation
   * @param {string} username - Username
   * @param {string} Fname - First name
   * @param {string} Lname - Last name
   */
  postRegister: `${apiBaseURL}/Auth/register`,

  /**
   * POST: Refresh authentication token
   * @param {string} RefreshToken - 80-character refresh token
   */
  postRefreshToken: `${apiBaseURL}/Auth/refreshtoken`,

  /**
   * POST: User logout
   * @param {string} RefreshToken - 80-character refresh token
   */
  postLogout: `${apiBaseURL}/Auth/logout`,

  // ======================
  // PROFILE APIS
  // ======================

  /**
   * GET: Get user profile
   * @header {string} Authorization - JWT token for authentication
   */
  getProfile: `${apiBaseURL}/Profile/`,

  /**
   * PUT: Upload profile picture
   * @header {string} Authorization - JWT token for authentication
   * @param {File} Profil - Profile image file to upload
   */
  putUploadProfilePicture: `${apiBaseURL}/Profile/uploadProfilePicture`,

  /**
   * PUT: Update profile information
   * @param {string} username - New username (optional)
   * @param {string} Fname - New first name (optional)
   * @param {string} Lname - New last name (optional)
   */
  putUpdateProfile: `${apiBaseURL}/Profile/updateProfile`,

  /**
   * PUT: Change email address
   * @param {string} newEmail - New email address
   * @param {string} password - Current password for verification
   */
  putChangeEmail: `${apiBaseURL}/Profile/changeEmail`,

  /**
   * DELETE: Remove profile picture
   * @header {string} Authorization - JWT token for authentication
   */
  deleteProfilePicture: `${apiBaseURL}/Profile/deleteProfilePicture`,

  // ======================
  // CHAT APIS
  // ======================

  /**
   * GET: Retrieve public chat messages
   * @header {string} Authorization - JWT token for authentication
   */
  getPublicChat: `${apiBaseURL}/Chat/PublicChat`,

  /**
   * DELETE: Delete message
   * @param {string} id - ID of the message to delete
   * @header {string} Authorization - JWT token for authentication
   */
  deleteMessage: `${apiBaseURL}/Chat/DeleteMessage`,
};

// Utility function to build URL with query parameters
API.buildUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  return url.toString();
};

// Utility function to replace path parameters
API.replacePathParams = (url, params = {}) => {
  let finalUrl = url;

  Object.keys(params).forEach((key) => {
    finalUrl = finalUrl.replace(`{${key}}`, params[key]);
  });

  return finalUrl;
};

export default API;

// Add to src/services/api/apiList.js
export const getBaseURL = () => {
  const customIP = "";
  const port = "3001";
  const baseURL = "/api";

  return customIP
    ? `http://${customIP}:${port}${baseURL}`
    : `http://localhost:${port}${baseURL}`;
};
