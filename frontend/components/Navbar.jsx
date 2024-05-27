// src/components/Navbar.js
import React, { useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import LoginPopUp from './LoginPopUp';
import UserContext from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopUp,setPopUp]=useState(false)
  const {isLoggedIn,setIsLoggedIn}=useContext(UserContext)
  const nav=useNavigate()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const togglePopUp = () => {
    setPopUp(!isPopUp);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    nav('/')
    setIsLoggedIn(false)
  };
  return (
    <nav className=' bg-bluebg px-6 py-5 flex justify-between'>
      <p className=' text-white font-bold text-2xl cursor-pointer'>DbDocks</p>
      <div className='lg:hidden'>
        <button onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className='text-white text-2xl' /> : <FaBars className='text-white text-2xl' />}
        </button>
      </div>
      <ul className={`lg:flex gap-6 text-white ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <Link  className='hover:underline underline-offset-4 cursor-pointer' to='/'>Home</Link>
        <li  className='hover:underline underline-offset-4 cursor-pointer'>About</li>
        <li  className='hover:underline underline-offset-4 cursor-pointer'>Services</li>
        <li  className='hover:underline underline-offset-4 cursor-pointer'>Contact us</li>
        {!isLoggedIn?<li  className='hover:underline underline-offset-4 cursor-pointer' onClick={togglePopUp}>Login</li>:
          <li  className='hover:underline underline-offset-4 cursor-pointer' onClick={handleLogout}>Logout</li>
        }
        
      </ul>
      <LoginPopUp isPopUp={isPopUp} toggle={togglePopUp}/>
    </nav>
  );
};

export default Navbar;
