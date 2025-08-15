import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    if (token && id) {
      setIsLoggedIn(true);
      setUserId(id);
    }
    if (token && id) {
      setIsLoggedIn(true);
      setUserId(id);
    }
  }, []);

  const login = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    setIsLoggedIn(true);
    setUserId(id);
  };

  const logout = async() => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
  } catch(err) {
    console.log("Logout API failed", err);
  }
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  setIsLoggedIn(false);
  toast.success('Logged Out');
};


  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export {useAuth , AuthProvider}