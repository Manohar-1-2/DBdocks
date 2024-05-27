import React from 'react'
import { useState,useEffect } from 'react'
import axiosInstance from '../utils/axiosconfig'
import Dbdetailscard from '../components/Dbdetailscard'
const ConnectDbPage = () => {
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
      <p className=' text-2xl'>Connect to DataBase</p>
      {
        data&&data.map((e,id)=>{
          return(<Dbdetailscard data={e} key={id} type={true}/>)
        })
      }
    </div>
  )
}

export default ConnectDbPage