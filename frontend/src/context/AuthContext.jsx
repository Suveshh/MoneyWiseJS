import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data.user);
        } catch (err) {
          console.error("Failed to fetch user profile", err);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { user, token } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      toast.success("Welcome back!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      const { user, token } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Something went wrong during logout.");
    }
  };

  const updateProfile = async (updates) => {
    const token = localStorage.getItem("token");
    if (!user || !token) return;

    try {
      const res = await axios.patch("/api/auth/profile", updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser({ ...user, ...updates });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
