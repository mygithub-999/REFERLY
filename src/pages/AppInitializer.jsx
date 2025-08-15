import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
//Redirects user to userpage if token exists also kind of automates calling refresh route
const AppInitializer = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const tryRestoreSession = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

    if (!token) {
      try {
        const res = await axios.get('http://localhost:8000/refresh', {
          withCredentials: true
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        login(res.data.token, res.data.userId);
        navigate(`/user/${res.data.userId}`, { replace: true });
      } catch (err) {
        console.log('Not logged in, staying on public routes');
      }
    } else {
      if (userId && token) navigate(`/user/${userId}`, { replace: true });
    }


      // if (!token) {
      //   try {
      //     const res = await axios.get('http://localhost:8000/refresh', {
      //       withCredentials: true,
      //     });
      //   console.log("REFRESH RESPONSE:", res.data);
      //   console.log("userId is:", res.data.userId);


      //   //   localStorage.setItem('token', res.data.token);
      //   //   localStorage.setItem('userId', res.data.userId);
      //   //   localStorage.setItem('name', res.data.name);
      //   // login(res.data.token, res.data.userId);
      //   // navigate(`/user/${res.data.userId}`, { replace: true });
        
      //   localStorage.setItem('token', res.data.token);
      //   localStorage.setItem('userId', res.data.userId);
      //   // Optional: localStorage.setItem('name', res.data.name);
      //   login(res.data.token, res.data.userId);
      //   navigate(`/user/${res.data.userId}`, { replace: true });


    
      //   } catch (err) {
      //     console.log('Not logged in, staying on public routes');
      //   }
      // } else {
      //   // Token exists so sending to user page
      //   if (userId) navigate(`/user/${userId}`, { replace: true });
      // }
    };

    tryRestoreSession();
  }, []);

  return null; 
};

export default AppInitializer;
