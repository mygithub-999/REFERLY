import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  return (
  <>
    <section className="hero">
        <div className="title">
            <h1>The Ultimate Hub for Referral Codes</h1>
        </div>
        <div className="background-container">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
        </div>
        <div className="subtitle">
            <p className='sub1'>Get instant access to a growing library of referral codes to save on your next purchase.</p>
            <p className='sub2'>Have a code to share? Post it and earn rewards when others use it.</p>
        </div>
        <div className="btn">
            <button onClick={()=>navigate('/signup')} className="sign-up">
                Get Started
            </button>
            
            {/* <button onClick={()=>navigate('/signin')} className="sign-in">
                Sign In
            </button> */}
            {/* <button onClick={()=>navigate('/about')} className="read-more">
                Read More
            </button> */}
        </div>
    </section>
    <div className="text">
    <h1>Choose a Category</h1>
    </div>
  </>
  )
}

export default Hero