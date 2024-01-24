import React from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { AiFillCloseCircle } from "react-icons/ai";

const SingleResult = ({lobby,props}) => {

    const FindUserName=(id)=>{
    const foundUser = lobby.users.map((eachUser)=>{
        if(eachUser.id==id)
        return eachUser.name;
    })

    return foundUser;
    }

  return (
    <div className="single-result border-b w-full flex-col flex py-3">
    <div className='flex gap-2 items-center'>
    <div className='w-[28px] h-[28px] bg-gray-500 text-white font-semibold rounded-full flex justify-center items-center'>{props.questionNumber}</div>
    <span className='question font-semibold'>{props.question}</span>
    </div>
    <div className='answers mt-6 gap-2 flex w-full flex-wrap'>
        
    {props.responses.map((eachResponse)=>{

       return eachResponse.answer==props.correct_answer ?  (
            <>
               <div className='flex shadow-md items-center flex-row p-2 rounded-md'>
        <IoIosCheckmarkCircle className='text-emerald-600 h-[24px] w-auto mr-1' />
            <span className='font-semibold'>{FindUserName(eachResponse.user)}:</span>
            <span className='ml-2'>{eachResponse.answer}</span>
        </div>
            </>
        ) :  eachResponse.answer == null ? (
            <>
              <div className='flex flex-row shadow-md p-2 rounded-md'>
        <AiFillCloseCircle className='text-red-600 h-[24px] w-auto mr-1'/>
            <span className='font-semibold'>{FindUserName(eachResponse.user)}:</span>
            <span className='ml-2'>No Answer</span>
        </div> 
            </>
        ) : (
            <>
            <div className='flex flex-row shadow-md p-2 rounded-md'>
        <AiFillCloseCircle className='text-red-600 h-[24px] w-auto mr-1'/>
            <span className='font-semibold'>{FindUserName(eachResponse.user)}:</span>
            <span className='ml-2'>{eachResponse.answer}</span>
        </div> 
            </>
        )
        
        
    })}
      
    </div>
    </div>   
  )
}

export default SingleResult


  