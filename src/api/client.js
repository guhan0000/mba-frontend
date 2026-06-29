import axios from "axios";
console.log("API baseURL:", import.meta.env.VITE_API_BASE_URL);
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Bearer token to every request if available in localStorage under the key 'token'
client.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        // Don't overwrite an existing Authorization header if one is already set
        if (!config.headers.Authorization && !config.headers.authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      // localStorage might be unavailable (SSR); fail silently
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: let responses pass through; if 401 handling is needed, add logic here
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors (e.g., refresh token on 401) here.
    return Promise.reject(error);
  }
);

export default client;
