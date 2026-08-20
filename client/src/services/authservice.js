import api from "./api";

// Storage Keys
const USER_KEY = "user";
const TOKEN_KEY = "token";

// ==================== API Functions ====================

// Register User
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login User
export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Get Logged-in User Profile
export const getProfile = async (token) => {
  const response = await api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==================== Storage Functions ====================

// Persist user data and token to localStorage
export const persistUser = (data) => {
  if (data?.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }
  if (data?.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }
};

// Get stored user from localStorage
export const getStoredUser = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  
  if (token && user) {
    try {
      return {
        user: JSON.parse(user),
        token,
      };
    } catch (error) {
      console.error("Error parsing stored user", error);
      clearStoredUser();
      return null;
    }
  }
  
  return null;
};

// Clear user data and token from localStorage
export const clearStoredUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};