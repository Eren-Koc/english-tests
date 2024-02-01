import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AppContext';
import Loading from './Loading';
import { FaUserClock ,FaUserCheck } from "react-icons/fa6";
import JSConfetti from 'js-confetti'

const Question = ({lobby}) => {
  const  {lobbies,giveAnswer,user,calculatePoints,resetTimer,testEnd,allUsers} = useContext(Context);
  const [shuffledAnswers,setShuffledAnswers] = useState([]);
  const [question,setQuestion]=useState("?");
  const [currentQuestionNumber,setCurrentQuestionNumber] = useState();
  const [lockAnswerAvailable,setLockAnswerAvailable] = useState(false);
  const [isAnswerQuestion,setIsAnswerQuestion] = useState(false);
  const jsConfetti = new JSConfetti()
  const controlRefreshIsAnswered=(index)=>{

if(lobby.answers.length>0 && lobby.answers[index]){
    const FoundAnswer = lobby.answers[index].responses.find((eachResponse)=> eachResponse.user == user.id)

    if(FoundAnswer)
    setLockAnswerAvailable(true);
    setIsAnswerQuestion(true);
  }   
  }

 
  useEffect(() => {
    let newQuestionNumber = WhichQuestion() - 1;
  
    if(!newQuestionNumber)
    newQuestionNumber=0;
    setCurrentQuestionNumber(newQuestionNumber);
    controlRefreshIsAnswered(newQuestionNumber);
  }, []);
  
  useEffect(() => {
   if(currentQuestionNumber>=0){
      shufleAnswers();
    } 
    
  }, [lobby.questions, currentQuestionNumber]);



  const sendAnswer=(user,lobby,questionNumber,answer)=>{
    setLockAnswerAvailable(true);
    giveAnswer(user,lobby,questionNumber,answer).then((result) => {
      setIsAnswerQuestion(true);  
    }).catch((err) => {
      
    });;
  }



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

//   const LeftLobbyCheck=()=>{
//    const LeftLobbyArr=[];
   
//    lobby.users.map((lobbyUser)=>{
//     const findUserNewStatus = allUsers.find((eachUser)=>eachUser.id===lobbyUser.id);
//     console.log(findUserNewStatus);
//     if(findUserNewStatus.lobby!=lobby.id){
      
// LeftLobbyArr.push(findUserNewStatus);
//     }

//    })

//    LeftLobbyArr.map((LeftUser)=>{
//     console.log("leftuser",LeftUser);
//     let questionNumber=WhichQuestion();
//     giveAnswer(LeftUser,lobby,questionNumber,null);
//    })

//   }


const AnswerRightConfetti=(userQuestionAnswer,QuestionRightAnswer)=>{
 if(userQuestionAnswer.answer===QuestionRightAnswer){
  jsConfetti.addConfetti({
  
    confettiRadius: 6,
    confettiNumber:100,
    confettiColors: [
      '#4F46E5', '#5f51d4', '#5c52dd', '#573ed5', '#3e3fec', '#5759d8',
    ],
  })
 }
}
  

  const shufleAnswers =()=>{
    
    if(lobby.questions.length>0 && lobby.answers.length<10){
    const allAnswers=[];
    const index=WhichQuestion()-1;
    
    if(currentQuestionNumber!=index){
      setLockAnswerAvailable(false);
      setIsAnswerQuestion(false);
      resetTimer(lobby);
      calculatePoints(lobby);
      setCurrentQuestionNumber(index);

     const userAnswer = lobby.answers[index-1].responses.find((eachResponse)=>eachResponse.user==user.id);
     const QuestionCorrectAnswer=lobby.questions[index-1].correct_answer;
     AnswerRightConfetti(userAnswer,QuestionCorrectAnswer);

     lobby.questions[index].answers.map((eachAnswer)=>{
    allAnswers.push(eachAnswer);
  })
  allAnswers.push(lobby.questions[index].correct_answer);

  for (let i = allAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
  }
 
  setShuffledAnswers(allAnswers);
  setQuestion(lobby.questions[index].question);
  // LeftLobbyCheck();
}
else{

  if(shuffledAnswers.length==0)
  {

    lobby.questions[index].answers.map((eachAnswer)=>{
      allAnswers.push(eachAnswer);
    })
    allAnswers.push(lobby.questions[index].correct_answer);
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    setShuffledAnswers(allAnswers);
    setQuestion(lobby.questions[index].question);
  }
}
}
else{
  if(lobby.answers && lobby.answers.length==10){ 
    const userCount=lobby.users.length;
    const lastQuestionsAnswers=lobby.answers[lobby.answers.length-1].responses.length;
    if(lastQuestionsAnswers==userCount)
    {
      calculatePoints(lobby);
      testEnd(lobby);
    }
}
}

}



  if(!lobby.questions){
    return <div><Loading/></div>
   }
  

  return (
    <div className='flex justify-center mt-6 items-center flex-col'>
<canvas className='fixed top-0 left-0 w-full h-full min-h-screen pointer-events-none'></canvas>
        <div className='question py-3 px-4 bg-slate-300 rounded-lg font-semibold text-center text-xl'>{WhichQuestion()}. {question}</div>
        
        <div className='flex mt-12 gap-4 flex-wrap'>
          
        { !lockAnswerAvailable ? shuffledAnswers.map((eachAnswer,idx)=>{
          return (
          <button key={"btn-"+idx} onClick={()=>{sendAnswer(user,lobby,WhichQuestion(),eachAnswer)}} className='p-4 flex-1 rounded-lg min-w-[150px] bg-slate-300 duration-300 hover:bg-app-purple ease-in-out hover:text-app-white text-left'>
            <b className='mr-1'>
            {idx === 0 ? "A)" : idx === 1 ? "B)" : idx === 2 ? "C)" : idx === 3 ? "D)" : ""}
            </b>
            {eachAnswer}
            </button>
          )
        })

        :
         (

          lobby.answers.length>0 && isAnswerQuestion && lobby.answers[WhichQuestion()-1] ? (
          <div className='p-3 flex justify-center items-center rounded-md flex-col  gap-3 bg-app-white shadow-md'>
       
       <div className='gap-4 flex justify-center items-center'>
             {Array.from({ length: lobby.users.length }, (_, index) => (
              lobby.answers[WhichQuestion()-1].responses.length>=index+1 ?
               <FaUserCheck className='text-emerald-600 h-[32px] w-[32px] object-cover' key={"eachAnswerWaiting"+index}/>
               :
               <FaUserClock className='text-gray-500 h-[32px] w-[32px] object-cover' key={"eachAnswerWaiting"+index}/>
               
        ))} 
        </div>
   <div className='sm-loader' ></div>
          </div>
          )
          :
          (
           null
          )
        )
      
      }
        
        </div>
        
    </div>
  )
}

export default Question