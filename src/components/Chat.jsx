import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/AppContext'
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
const Chat = ({lobby}) => {
const [chatVisibility,setChatVisibility] = useState(false); 
const {user,sendMessage} = useContext(Context);
const messagesEndRef=useRef(null);

useEffect(()=>{
messagesEndRef.current?.scrollIntoView();
},[lobby.chat])



const messageSendCheck=()=>{
   let message = document.getElementById("input-"+lobby.id);
   let stringWithoutSpaces = message.value.replace(/\s/g, "");
   if(stringWithoutSpaces.length>0)
   {
    const currentTimeStamp = Date.now();
    const currentDate = new Date(currentTimeStamp);
    sendMessage(lobby,message.value,currentDate);

    message.value="";
   }
   

}


const handleKeyDown = (e) => {

    if (e.key === 'Enter') {
       messageSendCheck();
    }

  };


const getTime=(time)=>{
    const dateObject = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);

const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
let result="";
if(hours>12 && minutes<10)
{
     result = hours-12 + ":0"+ minutes + " pm";
}
else if(hours>12 && minutes>=10){
     result = hours-12 + ":"+ minutes + " pm";
}
else if(hours<=12 && minutes<10){
    result = hours + ":0"+ minutes + " am";
}
else if(hours<=12 && minutes>=10)
{
    result = hours + ":"+ minutes + " am";
}





return result;
}




  return (
    <div className='absolute z-50 max-[450px]:right-0 max-[450px]:bottom-0 right-2 bottom-2 min-[1200px]:w-[300px] w-fit max-[450px]:w-full max-[450px]:items-end flex flex-col rounded-l-md shadow-lg '>
    { chatVisibility ? 
    <>
     <span className=' px-2 py-3 bg-app-purple w-full flex justify-between font-semibold items-center text-white max-[450px]:rounded-none rounded-t-md'>
        <span className='flex justify-center items-center gap-2'>
            <IoChatboxEllipsesOutline className='w-[20px] h-auto'/>
            Chat
        </span>
        <IoIosArrowDown onClick={()=>{setChatVisibility(false)}} className='cursor-pointer'/>
        </span>
        <div id={"chat-"+lobby.id} className='chat h-[250px] w-[300px] max-[450px]:w-full overflow-y-scroll gap-2 bg-app-white p-2 flex flex-col'>
        {
            lobby.chat.map((eachMsg,i)=>{
                if(eachMsg.user_id==user.id){
                    return (
                        <span key={"message"+ i + eachMsg.user_id} className='p-2 flex w-full justify-end items-end flex-col'>
                        <span className='bg-app-purple p-[6px] rounded-l-lg rounded-tr-lg w-fit text-white'>{eachMsg.message}</span>
                        <span className='text-sm font-medium text-gray-500 float-right w-full text-right'>{getTime(eachMsg.time)}</span>
                        </span>
                    )
                }
                else{
                    return (
                        <span key={"message"+ i + eachMsg.user_id} className='flex w-full flex-col justify-start'>
                        <span className='bg-gray-200 p-[6px] rounded-r-lg rounded-tl-lg w-fit'>
                            <span className='font-bold mr-1 '>{eachMsg.user_name}:</span>
                            <span className=''>{eachMsg.message}</span>
                            </span>
                        <span className='text-sm font-medium text-gray-500'>{getTime(eachMsg.time)}</span>    
                        </span>
                    )
                }
            })
        }
        
            <div ref={messagesEndRef}></div>
        </div>
        <div className='w-full flex justify-center px-2 py-3 bg-app-purple max-[450px]:rounded-none rounded-b-md items-center'>
        <input id={"input-"+lobby.id} autoComplete='off' onKeyDown={handleKeyDown} className='flex w-full outline-none pr-4 bg-transparent text-white' placeholder='Write a message' type="text" />
        <button onClick={()=>{messageSendCheck()}} className='px-2 bg-app-purple text-white rounded-md'> <FaArrowRight/> </button>
        </div>
    </>
    :
    <div title='Open Chat' onClick={()=>{setChatVisibility(true)}} className='flex cursor-pointer max-[1200px]:w-fit max-[1200px]:p-3 text-white bg-app-purple items-center px-2 py-3 max-[450px]:rounded-none max-[450px]:rounded-tl-md rounded-md justify-between'>
    <span className='font-semibold flex justify-center items-center gap-2'>
    <IoChatboxEllipsesOutline className='w-[20px] h-auto'/>
        <span className='max-[1200px]:hidden'>Chat</span>
        </span>
    <IoIosArrowUp className='max-[1200px]:hidden'/>
    </div>
}
       
    </div>
  )
}

export default Chat