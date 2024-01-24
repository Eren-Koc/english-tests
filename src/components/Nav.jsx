import React, { useContext, useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import Swal from 'sweetalert2'
import { Context } from '../context/AppContext';
import { CiLock } from "react-icons/ci";
import { BsBarChart } from "react-icons/bs";
import Statistics from './Statistics';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { IoHomeOutline } from "react-icons/io5";
import { PiGameControllerDuotone } from "react-icons/pi";
const Nav = ({hasLobby}) => {

const navigate=useNavigate();
const { user,setUser,createLobby } = useContext(Context);
const [menu,setMenu] = useState(false);

const Logout=()=>{

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to logout ?",
    icon: "warning",
    iconColor:"#4F46E5",
    showCancelButton: true,
    confirmButtonColor: "#4F46E5",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!"
  }).then((result) => {
    if (result.isConfirmed) {

      setUser({});
    localStorage.clear();
    navigate("/login");

    }
  });

    
}



const playSingle=()=>{
  if(user.lobbies==null)
  {
    const lobbyName = user.name+"'s lobby";
    createLobby(lobbyName, 1)
  .then(result => {
   navigate("/lobby/"+result);
  })
  .catch(error => {
    console.error("Bir hata oluştu:", error);
  });

   
    // navigate("/lobby/"+createdLobbyId);
  }
}


const changeMenuState=()=>{

    let dropdown = document.getElementById("dropdown");
    let icon =document.getElementById("menu-icon");
    if(!menu==true){
    dropdown.style.display="flex";
    icon.style.transform='rotate(180deg)';
    }
    else{
        dropdown.style.display="none";
        icon.style.transform='rotate(0deg)';
    }
    setMenu(!menu);

}


if(!user){
    return <div><Loading/></div>
}

  return (
    
    <div className='Nav fixed top-3 left-3 z-50 shadow-md px-4 py-3 min-[450px]:w-[230px] w-[calc(100%_-_24px)]  rounded-lg bg-app-white'>
    <div className='w-full flex justify-between items-center'>
    <div className='flex justify-start gap-2 items-center flex-1'>
    <div className='bg-app-purple w-6 h-6 rounded-full'></div>
    <span className='font-semibold'>{user.name}</span>
    </div>
    <MdKeyboardArrowDown id='menu-icon' onClick={()=>{changeMenuState()}} className='w-6 h-6 cursor-pointer' />
    </div>
    <div id='dropdown' style={{display:"none"}} className='pt-6 pb-2 h-fit w-full flex flex-col gap-4 bg-app-white'>
    
    <Link to={"/home"}>
    <div className ='w-full text-gray-500 hover:text-app-black duration-300 cursor-pointer flex items-center gap-2'>
    <IoHomeOutline className='w-6 object-cover h-6'/>
    <span>Home</span>
    </div>
    </Link>


    <div onClick={()=>{playSingle()}} style={!hasLobby && window.screen.width<450 ? {display:"flex", cursor:"pointer" } : {display:"none", cursor:"default"}} className='w-full text-gray-500 min-[450px]:hidden hover:text-app-black duration-300 cursor-pointer flex items-center gap-2'>
    <PiGameControllerDuotone className='w-[20px] h-auto'/>
    <span>Play Single</span>
    </div>


    <div onClick={()=>{document.getElementById("statistics").style.display="flex";}} className='w-full text-gray-500 hover:text-app-black duration-300 cursor-pointer flex items-center gap-2'>
    <BsBarChart className='w-6 object-cover h-6'/>
    <span>Statistics</span>
    </div>

    <div onClick={()=>{Logout()}} className ='w-full text-gray-500 hover:text-app-black duration-300 cursor-pointer flex items-center gap-2'>
    <CiLock className='w-6 object-cover h-6'/>
    <span>Secure Logout</span>
    </div>

    

    </div>
    <Statistics/>
    </div>
  )
}

export default Nav