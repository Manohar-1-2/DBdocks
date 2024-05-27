import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosconfig'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
const Dbdetailscard = ({data,type}) => {
  const [isStopped,setStopped]=useState(false)
  const nav=useNavigate()
  const {setCurrentDb}=useContext(UserContext)
  const [isDel,setIsDel]=useState(false)
  const stopInstance = async()=>{
    try {
      const response = await axiosInstance.post(`/stopinstance?cont_id=${data.container_id}`);
      alert(response.data.message)
      setStopped(true)
    } catch (error) {
      console.error('Error making POST request', error);
      alert(error.response.data.detail)
    }
  };

  const deleteInstance = async()=>{
    try {
      const response = await axiosInstance.post(`/deleteinstance?cont_id=${data.container_id}`);
      alert(response.data.message)
      setIsDel(true)
      setStopped(true)
    } catch (error) {
      console.error('Error making POST request', error);
      alert(error.response.data.detail)
    }
  };

  const startInstance = async()=>{
    try {
      const response = await axiosInstance.post(`/startinstance?cont_id=${data.container_id}`);
      alert(response.data.message)
      setStopped(false)
    } catch (error) {
      console.error('Error making POST request', error);
      alert(error.response.data.detail)
    }
  };

  useEffect(()=>{
    if(data.status=='paused'){
      setStopped(true)
    }
  },[])
  const handleconnect = () =>{
    setCurrentDb(data)
    nav('/userpage/querypage')
  }
  
  return (
    <div className='mt-5 border px-4 py-6 rounded-md glassmorphism'>
        <div className=' space-y-2 mt-3'>
          <p>Database Id :</p>
          <span>{data.container_id}</span>
        </div>
        <div className=' space-y-2 mt-3'>
          <p>Database Stutus :</p>
          <span>{data.status}</span>
        </div>
        <div className=' space-y-2 mt-3' >
          <p>Database Type :</p>
          <span>Postgres</span>
        </div>
        {type?<button className=' px-2 py-1 bg-blue  text-white mt-5 rounded-md' onClick={handleconnect}>connect</button>:
          <div className=' space-x-3'>
            <button className={`px-2 py-1 bg-white text-black mt-5 rounded-md ${!isStopped?"opacity-65":"opacity-100"}`} onClick={startInstance} disabled={!isStopped}>start</button>
            <button className={`px-2 py-1 bg-blue text-white mt-5 rounded-md ${isStopped?"opacity-65":"opacity-100"}`} onClick={stopInstance} disabled={isStopped}>{isStopped?"Stopped":"Stop"}</button>
            <button className={`px-2 py-1 bg-red-600 text-white mt-5 rounded-md ${isDel?"opacity-65":"opacity-100"}`} onClick={deleteInstance}>{isDel?"Deleted":"Delete"}</button>
        </div>
        }
        
    </div>
  )
}

export default Dbdetailscard