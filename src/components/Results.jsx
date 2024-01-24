import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AppContext';
import SingleResult from './SingleResult';
import { GiStarMedal } from "react-icons/gi"; //1.
import { IoIosMedal } from "react-icons/io"; //2.
import { FaMedal } from "react-icons/fa6"; //3.
const Results = ({lobby}) => {
const {user,LobbyResults} = useContext(Context);
const [allResult,setAllResult] = useState([]);
const [page,setPage] = useState(true);



useEffect(()=>{
const results = LobbyResults(lobby);   
     setAllResult(results);    
},[lobby.status])




const activePageStyle = `flex-1 h-[60px] bg-app-purple/100 text-white font-bold`;
const passivePageStyle = `flex-1 h-[60px] bg-app-purple/90 text-white`;
const leaderBoardSort = lobby.users.sort((a, b) => b.point - a.point);
  return (
    <div className='min-[768px]:w-[700px] min-[600px]:w-[550px] min-[500px]:w-[450px] min-[320px]:w-full  flex flex-col  rounded-md '>
    <div className='w-full mb-4 flex justify-center items-center'>
    <button onClick={()=> !page ? setPage(!page) : null}  className={page ? activePageStyle : passivePageStyle}>Leader Board</button>
    <button onClick={()=> page ? setPage(!page) : null} className={!page ? activePageStyle : passivePageStyle}>Question Results</button>
    </div>
    {
        page ? <div className='w-full max-h-[70vh] overflow-y-auto flex bg-app-white rounded-sm flex-col '>
         {
            leaderBoardSort.map((eachUser,i)=>{
                if(i==0){
                   return ( <div key={eachUser.id+"result"} className='w-full border-b  bg-app-white py-4 px-3 flex rounded-sm items-center justify-between text-xl text-black '>
                    <div className='flex  items-center justify-center gap-3'>
                    <GiStarMedal className='text-[#AF9500] h-[30px] w-[30px] object-cover' />
                    <span className='font-semibold text-xl min-[450px]:text-2xl'>{eachUser.name}</span>
                    </div>         
                      <span className='font-bold text-xl'>{eachUser.point}</span>
                      </div> )    
                }
                else if(i==1){
                   return ( <div key={eachUser.id+"result"} className='w-full border-b min-w-[320px] bg-app-white py-4 px-3 flex items-center justify-between text-xl text-black '>
          <div className='flex items-center justify-center gap-3'>
          <IoIosMedal className='text-[#B4B4B4] h-[30px] w-[30px] object-cover' />
          <span className='font-semibold text-xl min-[450px]:text-2xl'>{eachUser.name}</span>
          </div>         
            <span className='font-bold text-xl'>{eachUser.point}</span>
            </div> )
                }
                else if(i==2){
                    return ( <div key={eachUser.id+"result"} className='w-full border-b  bg-app-white py-4 px-3 flex rounded-sm items-center justify-between text-xl text-black '>
                    <div className='flex  items-center justify-center gap-3'>
                    <FaMedal className='text-[#6A3805] h-[30px] w-[30px] object-cover' />
                    <span className='font-semibold text-xl min-[450px]:text-2xl'>{eachUser.name}</span>
                    </div>         
                      <span className='font-bold text-xl'>{eachUser.point}</span>
                      </div>   )
                 }
                else{
                    return (
                        <div key={eachUser.id+"result"} className='w-full border-b  bg-app-white py-4 px-3 flex rounded-sm items-center justify-between text-xl text-black '>
          <div className='flex  items-center justify-center gap-3'>
          <span className='w-[30px] flex justify-center font-bold items-center h-[30px]'>{i+1}.</span>
          <span className='font-semibold text-2xl'>{eachUser.name}</span>
          </div>         
            <span className='font-bold text-xl'>{eachUser.point}</span>
            </div> 
                    )
                }
            })
         }
        </div> : <div className='w-full shadow-md gap-2 rounded-md bg-app-white p-3 max-h-[70vh] overflow-y-auto flex flex-col '>
        <span className='font-bold text-2xl'>Results</span>
        {
            allResult!=[] ? allResult.map((eachResult,idx)=>{
               
                return <SingleResult lobby={lobby} props={eachResult} key={"eachResult-"+idx}/>
            }) : null
        }
       
        
        </div>
    
    
    
    }
    
    </div>
  )
}

export default Results