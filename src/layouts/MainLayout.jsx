import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import AppInitializer from '../pages/AppInitializer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MainLayout = () => {
  return (
    <>
        <AppInitializer/>
        <Navbar/>
        <Outlet/>
        <ToastContainer 
        position="top-center"
        autoClose={3600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  )
}

export default MainLayout