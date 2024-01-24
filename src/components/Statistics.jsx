import React, { useContext } from 'react'
import { BsQuestionSquare,BsCheck2All } from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Context } from '../context/AppContext';

const Statistics = () => {
    const {user} =useContext(Context);
  return (
    <div style={{display:"none"}} id='statistics' className='w-full h-full min-h-screen flex justify-center items-center fixed z-20 top-0 left-0 bg-app-black/70'>
    <div className='md:w-[600px] h-fit p-4 rounded-lg bg-app-white relative'>
    <span className='text-xl font-bold'>Statistics</span>
    <div className='w-full mt-4 h-fit flex flex-row justify-center items-center flex-wrap'>
   
    <IoClose onClick={()=>{document.getElementById("statistics").style.display="none";}} className='absolute top-3 cursor-pointer right-2 h-8 w-auto'/>

    <div className='flex w-1/3 flex-col justify-center items-center px-2 py-4 gap-4 rounded-md'>
    <div className='flex justify-center items-center flex-col'>
    <BsQuestionSquare className='h-16 w-auto text-app-purple' />
    <span className='font-semibold mt-2'>Questions Answered</span>
    </div>
    <span className='font-bold text-xl text-app-purple'>{user.questions_answered}</span>
    </div>

    <div className='flex w-1/3 flex-col justify-center items-center px-2 py-4 gap-4 rounded-md'>
    <div className='flex justify-center items-center flex-col'>
    <BsCheck2All className='h-16 w-auto text-app-purple' />
    <span className='font-semibold mt-2'>Correct Answers</span>
    </div>
    <span className='font-bold text-xl text-app-purple'>{user.correct_answers}</span>
    </div>

    <div className='flex w-1/3 flex-col justify-center items-center px-2 py-4 gap-4 rounded-md'>
    <div className='flex justify-center items-center flex-col'>
    <FaMedal className='h-16 w-auto text-app-purple' />
    <span className='font-semibold mt-2'>Total Wins</span>
    </div>
    <span className='font-bold text-xl text-app-purple'>{user.total_wins}</span>
    </div>

    </div>    
    </div>
    </div>
  )
}

export default Statistics