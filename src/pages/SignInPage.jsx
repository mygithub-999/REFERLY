import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import GoogleAuth from '../components/GoogleAuth';
import {toast} from 'react-toastify';

const SignInPage = () => {
  //For redirecting to user page if there already logged in
  const { isLoggedIn, userId, login } = useAuth();
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  useEffect(() => {
    if (isLoggedIn && userId) {
      navigate(`/user/${userId}`);
    }
  }, [[isLoggedIn, userId]]);


  const submitForm=async(e)=>{
    e.preventDefault();
    const form={
      email:email,
      password:password
    }
    console.log(form.email);
    try{
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/auth`,form,{
        withCredentials: true
      }); //Hold
      const userId=res.data.userId;
      // localStorage.setItem("userId", userId);
      // localStorage.setItem("name", res.data.name);
      // localStorage.setItem("token", res.data.token);
      login(res.data.token, res.data.userId);
      navigate(`/user/${userId}`, { replace: true });
    }catch(err){
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <section className="auth-form">
      <div className="title">
        <h1>Welcome Back</h1>
      </div>

      <form className="form-container" onSubmit={submitForm}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="input-field" required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="input-field" required />
        <GoogleAuth value={"SignIn"}/>
        <button className="sign-in btn" type="submit">Sign In</button>

        <p className="auth-switch">
          <span>Don't have an account?</span>
          <button
            type="button"
            className="link-button"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </p>
      </form>
    </section>
  );
}

export default SignInPage