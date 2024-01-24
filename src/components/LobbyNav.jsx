import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AppContext';

const LobbyNav = ({lobby,userInLobby}) => {
    const {exitLobby,user} = useContext(Context);
    const [questionNumber,setQuestionNumber] = useState(0);
    const [elements,setElements]=useState([]);

    const WhichQuestion=()=>{
      const playersCount = lobby.users.length;
       const result = lobby.answers.find((index)=>{
       if(playersCount>index.responses.length){
        return index;
       }      
      })
      if(result){
       
     return result.questionNumber;
     
      }  
      else{ 
       
       return lobby.answers.length+1;
      }   
   }
  
useEffect(()=>{
 const question=WhichQuestion();
  if(questionNumber!=question)
  {
   
    // setQuestionNumber(question);
    calculateQuestionNavigaton(question);
  }


},[lobby.questions])


const calculateQuestionNavigaton=(question)=>{
 let elements=[];
  for(let i=0;i<10;i++){

    const element = (
      <div
        key={i+1} // Her öğe için benzersiz bir anahtar eklemek önemlidir.
        className={`min-[550px]:w-[32px] min-[550px]:h-[32px] w-[26px] h-[26px] flex justify-center max-[550px]:text-sm max-[550px]:font-semibold items-center rounded-full text-app-white font-bold ${i== question-1 ? ' bg-emerald-700' : i <= question-1 ? 'bg-app-purple' : 'bg-app-gray'}`}
      >
        {i+1}
      </div>
    );
    elements.push(element);
    setElements(elements);

  }
}



  return (
    <div style={userInLobby & lobby.length==lobby.users.length  ? {display:"flex"} : {display:"none"}} className='absolute bottom-0 rounded-t-lg  bg-app-white min-[700px]:px-6 px-3 py-4 max-[550px]:px-[6px] max-[550px]:py-2 '>
      <div className='questions-cards max-[550px]:flex-wrap max-[550px]:w-[190px] flex min-[700px]:gap-4 gap-2 w-full justify-start max-[550px]:justify-center items-center'>
      {
        elements.map((eachElement)=>{
          return eachElement;
        })
      }
      </div>    
        
    </div>

  )
}

export default LobbyNav