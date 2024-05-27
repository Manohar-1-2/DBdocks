import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const DbInf = ({data}) => {
    const [ishide,setIsHide]=useState(true)
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

        <div className=' space-y-2 mt-3' >
          <p> URL:</p>
          <span>{data.url}</span>
        </div>

        <div className=' space-y-2 mt-3' >
          <p>Password :</p>
          <div className=' flex items-center'>
            <span>{!ishide?data.password:"*".repeat(data.password.length)}</span>
            <div className={`mx-6`}>{ishide?<FaEyeSlash onClick={()=>setIsHide(!ishide)} className=' cursor-pointer'/>:<FaEye onClick={()=>setIsHide(!ishide)} className=' cursor-pointer'/>}</div>
          </div>
          
        </div>
       
        
    </div>
  )
}

export default DbInf