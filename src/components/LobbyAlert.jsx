import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Context } from '../context/AppContext';
import Swal from 'sweetalert2'  

const LobbyAlert = ({lobby}) => {
  const {user,exitLobby} = useContext(Context);
  const [alertText,setAlertText]=useState("");

useEffect(()=>{

  if(lobby.status){
    setAlertText("You will be considered as having lost.");
  }
  else{
    setAlertText("");
  }
},[lobby.status])

const lobbyExitFunc=(lobby)=>{

  Swal.fire({
    title: "Do you want to exit lobby ?",
    text: alertText,
    icon: "warning",
    iconColor:"#4F46E5",
    showCancelButton: true,
    confirmButtonColor: "#4F46E5",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, exit!"
  }).then((result) => {
    if (result.isConfirmed) {
      exitLobby(lobby)
    }
  });
}

  return (
    <div className='fixed w-full bottom-0 py-4 bg-app-purple max-[450px]:px-2 px-4 text-white flex max-[550px]:flex-col max-[550px]:gap-3 justify-between items-center text-xl '>
<div className='flex flex-col gap-1'>
{

lobby.status ? (
  <span>The test has started.</span>
) : lobby.length==lobby.users.length ?  
(
<span>Waiting Launch...</span>
)
:(
  <div className='max-[550px]:flex max-[550px]:flex-row-reverse gap-3 justify-center items-center'>
  <span className='min-[550px]:text-sm max-[550px]:text-base min-[550px]:text-gray-500 font-semibold lobby-status'>
    <span className='flex gap-3'>
   <span className='max-[550px]:hidden'> Waiting users...</span>
  {lobby.users.length}/{lobby.length}
    </span>
  </span>
   <span>Waiting Users...</span>
   </div>
  
  
)
}

</div>
<span className='text-base max-[700px]:hidden text-gray-500  font-semibold'>Current Lobby</span>
<div className='flex justify-center items-center max-[450px]:gap-2 gap-4'>
<Link to={"/lobby/"+lobby.id} className='py-3 px-4 max-[450px]:px-2 text-base font-semibold rounded-lg bg-app-white flex justify-center gap-2 items-center text-app-purple'>
      <span>Go Lobby</span>
      <IoArrowBack className='rotate-180' />
    </Link>
<button onClick={()=>{lobbyExitFunc(lobby)}} className='py-3 px-4 max-[450px]:px-2  text-base font-semibold text-red-600 rounded-lg bg-app-white flex justify-center gap-2 items-center'>
      <span>Leave Lobby</span>
      <IoMdCloseCircleOutline className='h-[20px] w-auto' />
    </button>
</div>

    
    </div>
  )
}

export default LobbyAlert