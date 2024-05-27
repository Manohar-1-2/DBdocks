import React, { useContext } from 'react';
import { Route,Navigate, Outlet } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ProtectedRoute = () => {
  const {isLoggedIn}=useContext(UserContext)
  return(<>
        {isLoggedIn?<Outlet/>:<Navigate to='/'/>}
    </>
  )
};

export default ProtectedRoute;