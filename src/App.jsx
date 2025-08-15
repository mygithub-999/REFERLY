import { useState } from 'react'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import AppList from './components/AppList'
// import Footer from './components/Footer'
import { 
Route,
createBrowserRouter,
createRoutesFromElements,
RouterProvider, } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import UserPage from './pages/UserPage'
import AppDetailPage from './pages/AppDetailPage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'element={<MainLayout/>}> 
    {/* Anything inside layout is going to use layout  */} 
        <Route index element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/help' element={<HelpPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/user/:id' element={<UserPage/>}/>
        <Route path='/user/:id/:appname' element={<AppDetailPage/>}/>
        <Route path='*' element={<NotFoundPage/>} />
    </Route>
  )
)

function App() {

  return (
    // <>
    //   <Navbar/>
    //   <Hero/>
    //   <AppList/>
    //   <Footer/>
    // </>
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
