import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import GoogleAuth from '../components/GoogleAuth';
//For redirecting to user page if there already logged in


const SignUpPage = () => {
  const { isLoggedIn, userId, login } = useAuth();
  const navigate = useNavigate();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');


  useEffect(() => {
    if (isLoggedIn && userId) {
      navigate(`/user/${userId}`);
    }
  }, [isLoggedIn, userId]);

  const submitForm=async(e)=>{
    e.preventDefault();
    const form={
      name:name,
      email:email,
      password:password
    }
    console.log(form.name,form.email);
    try{
      console.log("API URL:", process.env.REACT_APP_API_URL);
      const res=await axios.post(`${process.env.REACT_APP_API_URL}/register`,form);
      const userId=res.data.userId;
      // localStorage.setItem("userId", userId);
      // localStorage.setItem("name", res.data.name);
      // localStorage.setItem("token", res.data.token);
      login(res.data.token, res.data.userId);
      navigate(`/user/${userId}`, { replace: true });
    }catch(err){
      alert(err.response?.data?.message || "Something went wrong");
    }
  };



  return (
    <section className="auth-form">
      <div className="title">
        <h1>Join Referly</h1>
      </div>

      <form onSubmit={submitForm} className="form-container">
        <input type="text" onChange={(e)=> setName (e.target.value)} placeholder="Full Name" className="input-field" required />
        <input type="email" onChange={(e)=> setEmail (e.target.value)} placeholder="Email" className="input-field" required />
        <input type="password" onChange={(e)=> setPassword (e.target.value)} placeholder="Password" className="input-field" required />
        {/* <input type="password" onChange={(e)=> setPassword (e.target.value)} placeholder="Confirm Password" className="input-field" required /> */}
        <GoogleAuth value={"SignUp"}/>
        <button className="signup btn" type="submit">
          Sign Up
        </button>

        <p className="auth-switch">
          <span>Already have an account?</span>
          <button
            type="button"
            className="link-button"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        </p>
      </form>
    </section>
  )
}

export default SignUpPage