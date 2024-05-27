import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import UserContext from '../context/UserContext'
const HomePage = () => {
  const {isLogggedIn}=useContext(UserContext)
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  )
}

export default HomePage