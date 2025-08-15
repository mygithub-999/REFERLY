import React from 'react';
import googleicon from '../assets/img-resources/google-icon.svg'
import { NavLink } from 'react-router-dom';
const GoogleAuth = ({value}) => {
  return (
    <>
      <div className="auth-container">
        <a className='google-anchor' href={`${import.meta.env.VITE_API_URL}/auth/google`}>
            <img className="google-icon" src={googleicon} alt="Google Icon"/>
            <span className="signup-text">{value} with Google</span>
        </a>
      </div>
    </>
  )
}

export default GoogleAuth 

