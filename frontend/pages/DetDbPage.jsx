import React from 'react'
import { useState,useEffect } from 'react'
import axiosInstance from '../utils/axiosconfig'
import DbInf from '../components/DbInf'
const DetDbPage = () => {
  const [data,setData]=useState(null)
  

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/dbinstances');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
      
    };
    fetchData()
  },[])
  return (
    <div className=' px-6 py-4'>
      <p className=' text-2xl'>DB Instances Details</p>
      {
        data&&data.map((e,id)=>{
          return(<DbInf data={e} key={id} type={true}/>)
        })
      }
    </div>
  )
}

export default DetDbPage