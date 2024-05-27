import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosconfig'
import Dbdetailscard from '../components/Dbdetailscard';
import { VscDebugRestart } from "react-icons/vsc";
const ManageInstancePage = () => {
  const [data,setData]=useState(null)
  
  const fetchData =async() => {
    try {
      const response = await axiosInstance.get('/dbinstances');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
    
  };
  useEffect(()=>{
    fetchData()
  },[])
  const refresh =()=>{
    fetchData()
  }
  return (
    <div className=' mx-6 mt-4 '>
      <div className='flex items-center'>
        <p className='text-2xl'>Manage Instances</p>
        <div className=' mx-7 cursor-pointer hover:opacity-70' onClick={refresh}> <VscDebugRestart className=' text-xl'/></div>
       
      </div>
      {
        data&&data.map((e,id)=>{
          return(<Dbdetailscard data={e} key={id} type={false}/>)
        })
      }
    </div>
  )
}

export default ManageInstancePage