const BASE_URL = import.meta.env.VITE_API_URL || 'portfolio-backend-beta-eight.vercel.app/api';

// Helper for handling fetch responses
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  return data;
};

// Helper to retrieve JWT Bearer token headers
const getAuthHeaders = (isJson = true) => {
  const token = localStorage.getItem('admin_token');
  const headers = {};
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

export const loginAdmin = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const forgotPasswordAdmin = async (email) => {
  const response = await fetch(`${BASE_URL}/auth/forgotpassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};

export const resetPasswordAdmin = async (resetToken, password) => {
  const response = await fetch(`${BASE_URL}/auth/resetpassword/${resetToken}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  return handleResponse(response);
};

export const fetchCurrentUser = async () => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    headers: getAuthHeaders(true),
  });
  return handleResponse(response);
};

// ==========================================
// PORTFOLIO CONFIGURATION ENDPOINTS
// ==========================================

export const fetchPortfolioConfig = async () => {
  const response = await fetch(`${BASE_URL}/portfolio`);
  return handleResponse(response);
};

export const savePortfolioConfig = async (configData) => {
  const response = await fetch(`${BASE_URL}/portfolio`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(configData),
  });
  return handleResponse(response);
};

export const resetPortfolioConfig = async () => {
  const response = await fetch(`${BASE_URL}/portfolio/reset`, {
    method: 'POST',
    headers: getAuthHeaders(true),
  });
  return handleResponse(response);
};

// ==========================================
// FILE UPLOAD ENDPOINT
// ==========================================

export const uploadImageFile = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: getAuthHeaders(false), // FormData automatically sets Content-Type boundary
    body: formData,
  });
  return handleResponse(response);
};

// ==========================================
// CONTACT MESSAGES ENDPOINTS
// ==========================================

export const sendContactMessage = async (messageData) => {
  const response = await fetch(`${BASE_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData),
  });
  return handleResponse(response);
};

export const fetchMessages = async () => {
  const response = await fetch(`${BASE_URL}/messages`, {
    headers: getAuthHeaders(true),
  });
  return handleResponse(response);
};

export const deleteMessageById = async (id) => {
  const response = await fetch(`${BASE_URL}/messages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(true),
  });
  return handleResponse(response);
};

export const toggleMessageReadStatus = async (id) => {
  const response = await fetch(`${BASE_URL}/messages/${id}/read`, {
    method: 'PATCH',
    headers: getAuthHeaders(true),
  });
  return handleResponse(response);
};

export default {
  loginAdmin,
  forgotPasswordAdmin,
  resetPasswordAdmin,
  fetchCurrentUser,
  fetchPortfolioConfig,
  savePortfolioConfig,
  resetPortfolioConfig,
  uploadImageFile,
  sendContactMessage,
  fetchMessages,
  deleteMessageById,
  toggleMessageReadStatus,
};
