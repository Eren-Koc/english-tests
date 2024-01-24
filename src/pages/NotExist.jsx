import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";

const NotExist = () => {
  return (
    <div className='w-full h-full min-h-screen flex justify-center items-center  flex-col'>
      <span className='text-2xl font-semibold'>We are sorry &#128549;. The page is not found.</span>
      
      <Link to={"/home"} className='mt-4 py-3 px-4 rounded-lg bg-app-purple w-[150px] flex justify-center gap-2 items-center text-white'>
      <IoArrowBack />
      <span>Go Back</span>
      </Link>
      </div>
  )
}

export default NotExist