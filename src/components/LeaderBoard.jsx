import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AppContext'
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaLastfm } from 'react-icons/fa';
const LeaderBoard = ({lobby}) => {
   const {allUsers} = useContext(Context);
  const [openLeaderBoard,setOpenLeaderBoard] = useState(false);
  


  const leaderBoardSort = lobby.users.sort((a, b) => b.point - a.point);

  const isUserLeftLobby=(user)=>{
    const foundUser=allUsers.find((eachUser)=>eachUser.id===user.id)
    if(foundUser.lobby===lobby.id){
      return true
    }
    else{
      return false;
    }
  }


  return (

    <>
    {
      openLeaderBoard ? <>
      <div className='absolute min-[550px]:top-2 min-[550px]:right-2 top-0 right-0 p-3 min-[550px]:min-w-[300px] max-[550px]:w-full min-[550px]:rounded-md rounded-b-md bg-app-white flex flex-col'>
      <span className='font-semibold mb-2 flex w-full items-center justify-between '>
        <span>Leader Board</span>
        <IoMdClose onClick={()=>{setOpenLeaderBoard(false)}} className='w-[20px] h-auto cursor-pointer'/>
      </span>

{
  leaderBoardSort.map((user,idx)=>{
    return(
      <div key={"leaderboardposition-"+idx} className='user relative my-1 flex border-b border-gray-300 py-2 justify-between pr-[5px]'>
        {!isUserLeftLobby(user) ? <div className='absolute w-full h-full z-50 flex justify-center items-center bg-gray-500/50 backdrop-blur-sm rounded-md text-white font-bold'>User left the lobby</div> 
        : null
      }
          <div className='flex justify-center items-center w-fit gap-2'>
          <div className='w-[32px] h-[32px] rounded-full bg-app-purple text-app flex justify-center items-center text-app-white'>{idx+1}</div>
          <span>{user.name}</span>
          </div>
          <span className='font-bold'>{user.point}</span>
        </div>
    )

  })
} 
</div>
      </>
      :
      <>
      <div onClick={()=>{setOpenLeaderBoard(true)}} className='absolute min-[450px]:top-2 min-[450px]:right-2 top-0 right-0 p-3 bg-app-purple cursor-pointer flex flex-row-reverse justify-center items-center gap-2 text-white min-[450px]:rounded-md rounded-none max-[450px]:rounded-bl-md'>
        <span className='max-[1200px]:hidden'>Leader Board</span>
        <MdOutlineLeaderboard className='w-[20px] h-auto'/>
      </div>
      </>
    }


  </>
        

  )
}

export default LeaderBoard