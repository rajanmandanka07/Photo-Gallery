// Standardize API response structure
const sendResponse = (res, statusCode, data = null, error = null) => {
  const response = {
    success: !error,
    data,
    error: error ? error.message || error : null,
  };

  return res.status(statusCode).json(response);
};

module.exports = { sendResponse };