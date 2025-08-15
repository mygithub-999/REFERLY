import React from 'react'
import { NavLink } from 'react-router-dom';//Adds styling automatically when the NavLink is active (i.e., when the current route matches)
import { useLocation,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
const hideOnRoutes = ['/home', '/signup'];
const location = useLocation();
const navigate = useNavigate();
const currentPath = location.pathname;
const {logout}=useAuth();


const action=()=>{
    logout();
    navigate('/');
}
const signup=()=>{
    navigate('/signup');
}

const token = localStorage.getItem("token");

  return (
    <>
        <nav className="nav">
        <div className="nav-container">
                <div className="nav-left">
                    <NavLink to="/">
                        <h2>REFERLY</h2>
                    </NavLink>
                </div>
                
                <ul className="nav-options">
                    <li className="nav-items">
                        <NavLink to="/"className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
                    </li>
                    <li className="nav-items">
                        <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>
                    </li>
                    <li className="nav-items">
                        <NavLink to="/help" className={({ isActive }) => isActive ? "active-link" : ""}>Help</NavLink>
                    </li>
                    
                    <li className="nav-items">
                    {
                        token
                        ?(
                            <button className="signup" onClick={action}>
                                LogOut
                            </button>
                        ):
                        (
                            <button className="signup" onClick={signup}>
                                SignUp
                            </button>
                        )
                    }
                    </li>
                </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar