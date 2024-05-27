import React, { useContext }  from 'react'
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';


const LoginPopUp = ({isPopUp,toggle}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setIsLoggedIn}=useContext(UserContext)
  const nav=useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault();

    const data = new URLSearchParams();
    data.append('username', email);
    data.append('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Login successful:', response.data);
      const accessToken = response.data.access_token

      localStorage.setItem('access_token', accessToken);
      nav('userpage')
      toggle()
      setIsLoggedIn(true)

    } catch (error) {

      console.error('Login failed:', error);
    }
  };
  return (
    <div className={`fixed  top-[-10%] left-[calc(50%-140px)] px-5 py-4 transition-transform duration-300 ${isPopUp ? ' translate-y-44' : '-translate-y-full'} w-[280px] h-[370px] rounded-lg glassmorphism  `}>
       <div className=' relative left-[220px] cursor-pointer' onClick={toggle}><IoMdClose className='text-white text-xl'/></div>
      <h2 className="text-white text-2xl font-semibold text-center">Login</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-white">Email</label>
          <input id="email" name="email" type="email" required className="w-full mt-3 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password" className="block text-white">Password</label>
          <input id="password" name="password" type="password" required className="w-full mt-3 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div className='mt-5'>
          <button type="submit" className="w-full px-4 py-2 bg-blue  text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={handleLogin}>Login</button>
        </div>
      </form>

    </div>
  )
}

export default LoginPopUp