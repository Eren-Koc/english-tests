import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AppContext'
import Countdown from './Countdown';
import Swal from 'sweetalert2' 
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import SingleUserCard from './SingleUserCard';
import { CiLogout } from "react-icons/ci";
import LobbyNav from './LobbyNav';
import LeaderBoard from './LeaderBoard';
import Results from './Results';
import { MdOutlineContentCopy } from "react-icons/md";
import Otp from './Otp';
import Chat from './Chat';
import { LuArrowLeftToLine } from "react-icons/lu";


const SingleLobby = ({props}) => {
const navigate=useNavigate();

  const {user,lobbies,joinLobby,allUsers,setUser,questions,exitLobby,startGame} = useContext(Context);
  const [userInLobby,setUserInLobby ]=useState(false);
  const [otpChange,setOtpChange] = useState(0);
  const [btnStatus,setBtnStatus] = useState(false);
  const [lobbyHasQuestions,setLobbyHasQuestions] = useState(false);

  useEffect(()=>{

    const id = localStorage.getItem("id");
    const member = allUsers.find((user) => user.id == id);
    id==null ? navigate("/login") : setUser(member);

  },[allUsers])

  useEffect(()=>{
    if(props.questions.length!=0){
      setLobbyHasQuestions(true);
    }
    else{
      setLobbyHasQuestions(false);
    }
  },[props.questions])


  const ActiveBtnStyle={  
    cursor:'pointer',
    backgroundColor:'#4f46e5'
  }
  const PassiveBtnStyle={
    cursor:'defualt',
    backgroundColor:'#6b7280'
  }

  useEffect(()=>{
if(props){

  if(props.password==otpChange){
   setBtnStatus(true);
  }
  else{
    setBtnStatus(false);
  }

}
  },[otpChange])
  

const joinLobbyCheck=(props,user)=>{
  if(props.password!=null){
    if(otpChange==props.password){
      joinLobby(props,user);
    }
  }
  else{
    joinLobby(props,user);
  }
}  

useEffect(()=>{

const inLobby = props.users.find((lobby_user)=> lobby_user.id == user.id);


if(inLobby){
if(user.lobby===props.id){
  setUserInLobby(true)
}
}
else{
  setUserInLobby(false)
}
},[user,lobbies])




function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "You have successfully copied the text",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => {
          console.error("Unable to copy text to clipboard:", err);
      });
}


//TODO

if(props.length==props.users.length && !props.status && props.questions.length==0){
return (
  
<div className='w-full min-h-screen flex flex-col gap-4 justify-center items-center'>
<div title='Exit' onClick={()=>{navigate("/home");}} className='absolute top-3 left-3 p-2 w-fit rounded-lg cursor-pointer bg-app-purple'><CiLogout className='text-app-white w-fit h-6 font-bold'/></div>

{props.owner==user.id ?
<button className='p-4 rounded-md bg-app-purple text-white font-semibold text-center' onClick={()=> (startGame(props))}>Launch the test!</button>
: 
<button disabled className='p-4 rounded-md bg-gray-500 text-white font-semibold text-center' >Lobby leader expected to launch test !</button>
}
<div className='flex shadow-lg md:max-w-[700px] max-md:w-full bg-app-white gap-2 flex-col rounded-lg mt-8 p-4'>
          <span  className='font-bold text-app-black text-2xl'>PLAYERS IN LOBBY</span>
          {
          props.users.map((user)=>{
            return  <SingleUserCard key={user.id} props={user}/>
          })}
         
      
        </div>
</div>

) 
}

if(!userInLobby && props.status){
  return <div>Lobby başladı</div>
}

if(!userInLobby && props.questions.length!=0){
  return <div>Lobby Dolu</div>
}


  return (
    <div className='lobby w-full min-h-screen relative h-fit flex justify-center items-center p-6'>
      <canvas className='fixed top-0 left-0 w-full h-full bg-transparent pointer-events-none'></canvas>
      {props.length > 1 ?  <Chat lobby={props}/> : null}
    
      
      <div title='Go Home' onClick={()=>{navigate("/home");}} className='absolute top-2 left-2 max-[450px]:top-0 max-[450px]:left-0 p-3 w-fit min-[450px]:rounded-lg max-[450px]:rounded-br-md rounded-none cursor-pointer bg-app-purple'><LuArrowLeftToLine className='text-app-white w-[20px] h-auto font-bold'/></div>
      <div style={userInLobby ? {display:"none"} : {display:"flex"}} className='md:w-[700px] justify-center items-center max-md:w-full flex-col'>
     
     {props.password!=null ? <Otp lobby={props} otpChange={otpChange} setOtpChange={setOtpChange}/> : null}

       

      <span className='text-gray-500 text-5xl font-semibold'>{props.users.length+"/"+props.length}</span>
      {
        user.lobby==null ? <button style={props.password!=null ? btnStatus ? ActiveBtnStyle : PassiveBtnStyle : ActiveBtnStyle}
        className='font-semibold text-xl text-app-white mt-6 p-4 rounded-lg w-full' onClick={()=>{joinLobbyCheck(props,user)}}>Join to play!</button>
        : <button className='font-semibold text-xl text-app-white mt-6 p-4 rounded-lg pointer-events-none bg-gray-500 w-full'>You already in a lobby</button>
      }
      
      <div style={props.users.length > 0 ? {display:"flex"} : {display:"none"}} className='w-full shadow-lg bg-app-white flex gap-2 flex-col rounded-lg mt-8 p-4'>
          <span  className='font-bold text-app-black text-2xl'>PLAYERS IN LOBBY</span>


          {
          props.users.map((user)=>{
            return  <SingleUserCard key={user.id} props={user}/>
          })}
         

        </div>
      </div>

<div style={userInLobby && !lobbyHasQuestions  && props.length> props.users.length ? {display:"flex"} : {display:"none"} } className='lobby-loading flex justify-center items-center flex-col gap-4'>
  <div className='loader'></div>
  <span className='text-2xl text-app-purple font-bold mb-4'>Waiting Players</span>
  <span className='text-gray-500 text-4xl font-semibold'>{props.users.length+"/"+props.length}</span>
  {
    props.password !== null ? (
        <div className='text-5xl text-app-purple font-semibold flex flex-col justify-center items-center gap-4 p-3 rounded-md mt-4'>
            
            <div className='flex justify-center gap-4 my-2 items-center'>
            {props.password.split("").map((eachChar, index) => (
                <span className='border-b-2 border-app-purple' key={index}>{eachChar}</span>
            ))}
            </div>
          <span onClick={()=>{copyToClipboard(props.password)}} className='flex justify-center cursor-pointer items-center text-base gap-2 text-white bg-app-purple p-2 rounded-md'>
             <MdOutlineContentCopy className='text-white w-[20px] h-[20px] object-cover' />
            copy
            </span>
    
        </div>
    ) : null
}
  
</div>

     <div style={props.status==true & userInLobby & props.length==props.users.length ? {display:"flex"} : {display:"none"}} className='flex justify-center items-center flex-col'>
       <Countdown props={props} />  
      {props.length==props.users.length ? <Question key={props.id} lobby={props} /> : null }
      <LeaderBoard lobby={props}/>
      <LobbyNav userInLobby={userInLobby} lobby={props}/>
      </div>


    <div style={props.status==false & props.answers.length==10 ? {display:"flex"} : {display:"none"}}>
    <Results key={"result-"+props.id} lobby={props} />
    </div>
      
    </div>
  )
}

export default SingleLobby