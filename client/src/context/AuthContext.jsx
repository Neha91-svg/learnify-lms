import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const savedUser = localStorage.getItem("lms-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // user load hogya
  }, []);

  const saveUser = (data) => {
    setUser(data.user);
    localStorage.setItem("lms-user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  const signup = async (formData) => {
    const res = await api.post("/auth/signup", formData);
    saveUser(res.data);
    return res.data.user;
  };

  const login = async (formData) => {
    const res = await api.post("/auth/login", formData);
    saveUser(res.data);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("lms-user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout }} // loading added here
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
