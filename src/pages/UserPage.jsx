import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppList from '../components/AppList';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CircularColor from '../components/CircularLoad';
import { Circle } from '@mui/icons-material';

const UserPage = () => {

  const { id } = useParams();
  // const storedId = localStorage.getItem("userId");
  // const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const {login,logout}=useAuth();

//   if (storedId !== id) {
//     return <h1>Unauthorized</h1>;
//   }

  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signin', { replace: true }); // replace prevents history loop
      return;
    }

    try {
      const res = await axios.get(`${process.env.VITE_API_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      localStorage.clear();
      navigate('/signin', { replace: true });
    }
  };
  fetchUser();
}, []);

  if (!user) return <CircularColor/>;

  return (
    <>
      <div className="home-hero">
        <div className="home-title">
          <h1>Hi {user.name}!</h1>
          <h1>Welcome to REFERLY</h1>
        </div>
        <div className="home-subtitle">
          <p>
            You may choose to upload or generate a referral code by clicking on the respective app icon below
          </p>
        </div>
      </div>
      <AppList />
      {/* <Footer /> */}
    </>
  );
};

export default UserPage;
