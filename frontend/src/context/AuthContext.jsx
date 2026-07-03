import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { setTokens, clearTokens } from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app startup — restore session if refresh token exists
  useEffect(() => {
    // your code here
    async function refreshToken() {
      try {
        const storedRefresh = localStorage.getItem("refreshToken");

        if (storedRefresh) {
          const { data } = await api.post(`/api/auth/refershToken`, {
            refreshToken: storedRefresh,
          });

          setTokens(data.accessToken, data.refreshToken);
          const decoded = JSON.parse(atob(data.accessToken.split(".")[1]));
          setUser({ id: decoded.id, email: decoded.email });
        }
      } catch (error) {
        clearTokens();
      } finally {
        setLoading(false);
      }
    }

    refreshToken();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post(`/api/auth/login`, { email, password });

    setTokens(data.accessToken, data.refreshToken);
    const decoded = JSON.parse(atob(data.accessToken.split(".")[1]));
    setUser({ id: decoded.id, email: decoded.email });
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await api.post("/api/auth/logout", { refreshToken });
    } catch (error) {
    } finally {
      setUser(null);
      clearTokens();
    }
    // your code here
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook for easy access
export const useAuth = () => useContext(AuthContext);
