import React, { useState } from 'react'
import axiosInstance from '../utils/axiosconfig'
import { useNavigate } from 'react-router-dom'
const CreateInstancePage = () => {
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const nav=useNavigate()
  const handlesubmit =async()=>{
    try {
        const response =await axiosInstance.post('/createdb',{
            "form_data":{
                "db_name":name,
                "db_password":password
            }
        })
    alert("sucessfully created")
    nav('/userpage/managedb')
    } catch (error) {
        alert(error.response.data.detail)
    }
  }

  return (
    <div className='w-full flex flex-col md:flex-row  pt-8 px-5 '>
        <div className='w-[220px] h-[220px]'> 
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/database-check-7195721-5847177.png?f=webp" alt="" />
        </div>
        <div className=' ml-6'>
            <p className='text-white text-2xl'>Create Instance of DataBase</p>
            <div className=' mt-5 flex flex-col gap-4'>
                <label htmlFor="" className=' text-xl'>DataBase Name</label>
                <input type="text" className=' rounded-md h-9 p-5 text-black'  onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className=' mt-5 flex flex-col gap-4'>
                <label htmlFor="" className=' text-xl'>password</label>
                <input type="text" className=' rounded-md h-9 p-5 text-black ring-1' onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button class="bg-white  font-semibold py-2 px-4 rounded hover:bg-gray-200 mt-9 text-black" onClick={handlesubmit}>
                Create Instance
            </button>
        </div>
       
    </div>
  )
}

export default CreateInstancePage