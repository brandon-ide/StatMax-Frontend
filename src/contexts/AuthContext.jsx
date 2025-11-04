import { createContext, useContext, useState } from "react";
import axios from "axios"; // make sure axios is installed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5050/api/auth/login", {
        email,
        password,
      });

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5050/api/auth/signup", {
        username,
        email,
        password,
      });

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
