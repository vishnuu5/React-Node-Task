import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // ✅ Load user and token from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Login function to store user and token
  const login = (userData, userToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
  };

  // ✅ Logout function to clear user and token
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // ✅ Update user (including profile picture)
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem("user", JSON.stringify(updatedUserData));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
