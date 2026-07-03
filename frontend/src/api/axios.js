import axios from "axios";

let accessToken = null;

export const setTokens = (access, refresh) => {
  accessToken = access;
  localStorage.setItem("refreshToken", refresh);
};

export const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem("refreshToken");
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite retry loop
      try {
        const storedRefresh = localStorage.getItem("refreshToken");
        if (storedRefresh) {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
            { refreshToken: storedRefresh },
          );

          setTokens(data.accessToken, data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
