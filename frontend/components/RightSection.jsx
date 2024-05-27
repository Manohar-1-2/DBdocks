import React from 'react'
import CreateInstancePage from '../pages/CreateInstancePage'
import { Outlet } from 'react-router-dom'

const RightSection = () => {
  return (
    <div  className=' text-white  border-l w-full'>
        <Outlet/>
    </div>
  )
}

export default RightSection