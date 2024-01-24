import React, { useContext, useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'  
import { Context } from '../context/AppContext';
import LobbyCart from '../components/LobbyCart';
import Nav from '../components/Nav';
import Loading from '../components/Loading';
import { PiGameControllerDuotone } from "react-icons/pi";
import LobbyAlert from '../components/LobbyAlert';
import { TbLock,TbLockOpen  } from "react-icons/tb";
const Home = () => {
const [loaded,setLoaded] = useState(false);
const {user,setUser,allUsers,lobbies,createLobby,deleteLobby,changeUserStatus} = useContext(Context);
const navigate = useNavigate();
const [lobbyLength,setLobbyLength]=useState(2);
const [hasLobby,setHasLobby]=useState(null);
const [isCheckedUserStatus,setIsCheckedUserStatus] =useState(false);
const [userFounded,setUserFounded] = useState(false);
const [searchValue, setSearchValue] = useState('');
const [searchNumberValue, setSearchNumberValue] = useState(0);
const [lock,setLock] = useState(false);

useEffect(() => {
  const id = localStorage.getItem("id");

  if (id == null) {
    
    navigate("/login");
    return;
  }
  const member = allUsers.find((user) => user.id === id);
  if (!member) {
    return;
  }

  setUser(member);
  setUserFounded(true);
}, [allUsers]);

useEffect(()=>{

  if(user && lobbies){
    
    
  const lobby = lobbies.find((lobby)=>lobby.id==user.lobby); 
  if(lobby)
  setHasLobby(lobby);
  else 
  setHasLobby(null);
}
  },[user, lobbies])


  useEffect(() => {
   

    const handleBeforeUnload = () => {
      if (userFounded) {    
           changeUserStatus(false);     
      }
    };

  window.addEventListener('beforeunload', handleBeforeUnload);

   return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
   };

  
 }, []);
  
 
useEffect(()=>{
  if(userFounded && !isCheckedUserStatus){
    changeUserStatus(true);
    setIsCheckedUserStatus(true);
  }

},[user])
  

const handleLobbyLengthChange = (e) => {
  const inputValue = parseInt(e.target.value, 10); // Eğer input değeri bir sayı olacaksa, sayıya çevir

  if (inputValue > 8) {
    setLobbyLength(8);
  }
  else if(inputValue < 2){
    setLobbyLength(2);
  } else {
    // Değilse, girilen değeri kullan
    setLobbyLength(inputValue);
  }
};



const LobbyCreater=()=>{
let lobbyLength=document.getElementById("lobby-length");
let lobbyName=document.getElementById("lobby-name");
let stringWithoutSpaces = lobbyName.value.replace(/\s/g, "");

if(stringWithoutSpaces.length>2){

if(lobbyName.value && lobbyName.value.length>2)
{
  Swal.fire({
    position: "center",
    icon: "success",
    text: "You have successfully created a lobby.",
    showConfirmButton: false,
    timer: 1500
  });
  createLobby(lobbyName.value,lobbyLength.value,lock);
  lobbyName.value="";
}
else
{
  Swal.fire({
    position: "center",
    icon: "error",
    text: "Must be the name of the lobby",
    showConfirmButton: false,
    timer: 1500
  });
  lobbyName.value="";
}
}
else{
  Swal.fire({
    position: "center",
    icon: "error",
    text: "Must be the name of the lobby",
    showConfirmButton: false,
    timer: 1500
  });
  lobbyName.value="";
}

}
const DeleteYourLobby=()=>{
if(hasLobby){
deleteLobby(hasLobby);
setHasLobby(null);
}
}

const handleInputChange = (event) => {
  setSearchValue(event.target.value);
};

const playSingle=()=>{
  if(user.lobby==null)
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



  if(!user || !lobbies || !allUsers){
    return <div><Loading/></div>
   }

  return (
    <div className='Home md:p-6 max-md:p-2 flex w-full justify-center items-center min-h-screen h-fit'>
    <Nav hasLobby={hasLobby} />
    <button onClick={()=>{playSingle()}} style={!hasLobby ? {backgroundColor:"#4F46E5", cursor:"pointer" } : {backgroundColor:"#6b7280", cursor:"default"}} className=' text-gra absolute flex justify-center items-center min-[450px]:top-3 min-[450px]:right-3 py-3 max-[450px]:hidden  p-2 rounded-md gap-2 text-white z-10'>
      <span>Play Single</span>
      <PiGameControllerDuotone className='w-[20px] h-auto'/>
    </button>
    {hasLobby!=null ? <LobbyAlert lobby={hasLobby}/> : null}
      <div className='content flex flex-col md:w-[700px] max-md:w-full gap-6'>


        <div style={hasLobby!=null ? {display:'none'} : {display:"flex"}} className='create-lobby rounded-lg p-4 w-full max-[450px]:flex-col justify-between  max-[450px]:gap-3 items-center flex-row bg-app-white'>
            <input required id='lobby-name' autoComplete='off' type="text" className='bg-transparent outline-none flex-1 max-[450px]:w-full max-[450px]:py-2' placeholder='Create Lobby ' />
            <div className='[450px]:ml-4 flex justify-center items-center gap-2'>
              <div className='flex justify-center gap-2 items-center'>
            <input required id='lobby-length'
            type="number"
            value={lobbyLength}
            onChange={handleLobbyLengthChange}
            className='outline-none bg-app-purple text-center p-2 rounded-md text-app-white font-semibold w-[40px]' />
           
            <button onClick={()=>{LobbyCreater()}} id='btn-create-lobby' type='submit' className=' flex justify-center outline-none bg-app-purple p-2 rounded-md items-center gap-2'>
            <span className='text-app-white font-semibold'>Create</span>
            <CiCirclePlus className='h-[25px] w-auto text-app-white' />
            </button>
            {
              lock ? <TbLock onClick={()=>{setLock(!lock)}} title='Password Only Can Access' className='p-2 rounded-md text-sm bg-app-purple text-white h-full cursor-pointer w-[40px]'/>
              : <TbLockOpen onClick={()=>{setLock(!lock)}} title='Every Users Can Accsess' className='p-2 rounded-md text-sm bg-app-purple text-white h-full cursor-pointer w-[40px]'/>

            }
            </div>
            </div>
        </div>


        
        <div style={hasLobby!=null ? {display:'flex'} : {display:"none"}} className='create-lobby bg-app-purple rounded-lg p-3 w-full justify-between items-center flex'>
          <div className='flex justify-center gap-3 items-center'>
        <PiGameControllerDuotone className='w-10 h-10 object-cover text-app-white'/>  
        <span className='font-semibold text-xl text-app-white'>{hasLobby!=null ? hasLobby.lobbyName : null}</span>
        </div> 
        <div className='p-2 rounded-lg bg-app-white min-w-[50px] text-gray-500 flex justify-center items-center'>
          {
           hasLobby ? hasLobby.status ? "Started" : hasLobby.users.length+'/'+hasLobby.length  : null 
          }
          </div> 
        </div>

        
        
        
        <div style={hasLobby!=null ? {display:'none'} : {display:"block"}} className='lobbies w-full rounded-lg'>
          <div className='max-[450px]:flex-col max-[450px]:gap-3 flex min-[450px]:justify-between items-center'>
<span className='text-2xl font-bold text-app-purple'>Start to play!</span>

<input
 type="text" 
 value={searchValue}
 onChange={handleInputChange}  
 className='search-bar h-[40px] p-2 rounded-md bg-app-white shadow-sm text-app-black outline-none' 
 placeholder='Search' />

</div>
<div id='lobbies-container' className='min-[450px]:flex max-[450px]:block w-full whitespace-nowrap max-[450px]:overflow-x-scroll justify-start items-center gap-4 mt-8 min-[450px]:flex-wrap max-h-[460px] min-[450px]:overflow-y-scroll'>

{lobbies.map((lobby)=>{
if(lobby.owner==user.id){
  return null
}
else{

  return !lobby.status && lobby.questions.length==0 && lobby.length>lobby.users.length && lobby.lobbyName.includes(searchValue) ?
   (    
  <LobbyCart props={lobby} key={"lobbycart-"+lobby.id}/>
  )
  : (
    null
  )
}
  


})}
</div>
        </div>
        </div>
    </div>
  )
}

export default Home