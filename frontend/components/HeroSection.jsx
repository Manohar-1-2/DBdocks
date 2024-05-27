import React, { useState } from 'react'
import img from "../assets/img1.jpeg"

import myImage from '../assets/file.png'; // adjust the path based on your project structure
import LoginPopup from './LoginPopUp';
import SignPopUp from './SignPopUp';

const HeroSection = () => {
  const [isSignPopUp,setSignPopUp]=useState(false)
  const toggle=()=>{
    setSignPopUp(!isSignPopUp)
  }
  return ( 
    <div className="grid md:grid-cols-2 px-10 pt-9">
      <div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/020/043/127/small_2x/computation-of-big-data-center-information-processing-database-png.png" alt="" />
      </div>
      <div className=' pt-24'>
        <h1 className=' text-4xl text-white font-bold'>Welcome</h1>
        <p className='text-white mt-4 text-xl'>Postgres Database as a Service Platform</p>
        <p  className='text-white mt-4 text-xl'>Effortlessly host and manage your databases online. Secure, scalable, and user-friendly. Get started today!</p>
        <button class="bg-white text-navyblue font-semibold py-2 px-4 rounded hover:bg-gray-200 mt-9" onClick={toggle}>
          Sign up
        </button>
        <SignPopUp  isSignPopUp={isSignPopUp} toggle={toggle}/>
      </div>
    </div>
  );
};

export default HeroSection;
