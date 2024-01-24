import React from 'react'
import '../index.css';
const Loading = () => {
  return (
    <div className='w-full h-full bg-black/60 fixed top-0 left-0 flex justify-center items-center'>
       <div className="loader"></div>
    </div>
  )
}

export default Loading