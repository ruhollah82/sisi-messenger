// src/utils/errorHandler.js
export const extractErrorMessage = (
  error,
  fallback = "Something went wrong"
) => {
  if (!error) return fallback;

  if (error.response?.data?.msg) return error.response.data.msg;
  if (error.response?.data?.error) return error.response.data.error;
  if (error.message) return error.message;

  return fallback;
};
