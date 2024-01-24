import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { PiGameControllerDuotone } from "react-icons/pi";

import { FiArrowRight } from "react-icons/fi";
import { Context } from '../context/AppContext';
import { TbLock  } from "react-icons/tb";
const LobbyCart = ({props}) => {
const {user} = useContext(Context);

  return (


    <div className='lobby min-[450px]:w-[200px] max-[450px]:w-[170px] min-[450px]:flex max-[450px]:inline-table max-[450px]:mb-4 max-[450px]:mx-2 bg-app-white relative h-fit shadow-md rounded-lg  justify-center gap-4 p-4 items-center flex-col'>   
    { props.password!=null ? <TbLock className='absolute top-3 left-3  text-app-purple w-[22px] h-[22px] object-cover'/>  : null }
    <div className='flex w-full flex-col justify-center gap-1 items-center'>
  <PiGameControllerDuotone className='w-[64px] h-auto text-app-purple' />
    <span className='font-semibold'>{props.lobbyName}</span>
    </div>
    <div className='flex w-full flex-col justify-center items-center'>
    <span className='lobby-count text-app-gray mb-4'>{props.users.length+"/"+props.length}</span>
    {
      user.lobby==null && !props.status ? (
      <Link to={"/lobby/"+props.id} className='text-app-white'>
      <button className='flex flex-row justify-center items-center p-2 bg-app-purple rounded-lg gap-2'>
        Join
        <FiArrowRight className='text-app-white' />
      </button>
      </Link>
      )
      :
      (<Link to={"/lobby/"+props.id} className='text-app-white pointer-events-none'>
      <button className='flex flex-row justify-center items-center p-2 bg-gray-500 rounded-lg gap-2'>
        Join
        <FiArrowRight className='text-app-white'/>
      </button>
      </Link>
      )

    }

    
   
    </div>
  </div>
  )
}

export default LobbyCart