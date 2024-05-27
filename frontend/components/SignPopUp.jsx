import React, { useState } from 'react'
import axiosInstance from '../utils/axiosconfig';
import { IoMdClose } from "react-icons/io";
const SignPopUp = ({isSignPopUp,toggle}) => {
  const [userName,setUserName]=useState(null)
  const [password,setPassword]=useState(null)
  const [email,setEmail]=useState(null)
  const [resp,setResp]=useState(null)
  const clearForm=()=>{
    setEmail('')
    setPassword('')
    setUserName('')

  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/signin', {
        'form_data':{
          'name':userName,
          'email':email,
          "password":password,
          "active":true
          }
      });
      alert(response.data.message)
      clearForm()
      toggle()
    } catch (error) {
      console.error('Error making POST request', error);
      alert(error.response.data.detail)
      toggle()
    }
    

  }
  return (
    <div className={`fixed  top-[-10%] left-[calc(50%-140px)] flex flex-col px-5 pt-3 pb-6 transition-transform duration-300 ${isSignPopUp ? ' translate-y-44' : '-translate-y-full'} w-[300px] h-[450px] rounded-lg glassmorphism  `}>
       <div className=' relative left-[250px] cursor-pointer' onClick={toggle}><IoMdClose className='text-white text-xl'/></div>
      <h2 className="text-white text-2xl font-semibold text-center mb-3">Sign Up</h2>
      <form className="space-y-6" onSubmit={handlesubmit}>
        <div>
          <label htmlFor="username" className="block text-white">User Name</label>
          <input id="username" name="username" required className="w-full mt-3 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500" 
          onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="email" className="block text-white">Email</label>
          <input id="email" name="email" type="email" required className="w-full mt-3 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500" 
          onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password" className="block text-white">Password</label>
          <input id="password" name="password" type="password" required className="w-full mt-3 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className=' mb-5'>
          <button type="submit" className="w-full px-4 py-2 bg-blue  text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Sign up</button>
        </div>
      </form>

    </div>
  )
}

export default SignPopUp