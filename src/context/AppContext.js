import React, { createContext, useEffect, useState  } from 'react'
import { collection,query,onSnapshot,doc,updateDoc,deleteDoc, QuerySnapshot, addDoc,setDoc } from 'firebase/firestore';
import {db} from '../data/firebase';

export const Context = createContext();
export const ContextProvider = (props) => {
    
    const [allUsers,setAllUsers] = useState([]);
    const [questions,setQuestions] = useState([]);
    const [lobbies,setLobbies] = useState([]);
    const [user,setUser] = useState({});




    useEffect(() => {
      checkAllUsers();
      checkLobbies();
      checkQuestions();
      }, [QuerySnapshot]);




      const checkAllUsers=()=>{
        const q = query(collection(db, "users"));
        const unsub = onSnapshot(q, (QuerySnapshot) => {
          let usersArray=[];

          QuerySnapshot.docs.forEach((doc) => {
            usersArray.push({
              ...doc.data(),
              id: doc.id,
            });
          });        
        
       
          
          setAllUsers(usersArray);
        });
        return () => unsub();
      }

      const checkLobbies=()=>{
        const q = query(collection(db, "lobbies"));
        const unsub = onSnapshot(q, (QuerySnapshot) => {
          let lobbiesArray = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));          
         
          setLobbies(lobbiesArray);
        });
        return () => unsub();
      }

      const checkQuestions=()=>{
        const q = query(collection(db, "questions"));
        const unsub = onSnapshot(q, (QuerySnapshot) => {
          let questionsArray = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));          
         
          setQuestions(questionsArray);
        });
        return () => unsub();
      }




      const register= async(email,name,password)=>{
   
        const foundUser = allUsers.find((user) => user.email == email);
        let isRegisterSuccsess=false;
        if(!foundUser){
          const newDocRef = await addDoc(collection(db,"users"),{
                email:email,
                password:password,
                name:name,
                questions_answered:0,
                correct_answers:0,
                total_wins:0,
                lobby:null,
                status:false,              
                
            });
            isRegisterSuccsess=true;
     
    const newDocId = newDocRef.id;


    const userDocRef = doc(db, "users", newDocId);
    await setDoc(userDocRef, { id: newDocId }, { merge: true });
        }

        return new Promise((resolve, reject) => {
          if (isRegisterSuccsess) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      }

      function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function generateOTP() {
      // Rastgele 6 haneli sayı oluştur
      const otp = generateRandomNumber(100000, 999999);
      return otp.toString();
  }

      const createLobby = async(lobbyName,length,lock)=>{


        let myOTP;
        if(lock)
        myOTP = generateOTP();
        else
         myOTP=null;


          const createdLobby = await addDoc(collection(db,"lobbies"),{
                lobbyName:lobbyName,
                length:Number(length),
                owner:user.id,
                users:[],
                answers:[],
                questions:[],
                status:false,
                time:30,
                chat:[],
                password:myOTP,
            });      

            const createdLobbyDocRef = doc(db, "lobbies", createdLobby.id);
            await updateDoc(doc(db,"users",user.id), {lobby:createdLobbyDocRef.id});
            let newUser = {
               ...user,
               point:0
            };
            newUser.lobby= createdLobbyDocRef.id;
            await setDoc(createdLobbyDocRef, { users:[newUser] }, { merge: true });
          
            if(length==1)
            return createdLobbyDocRef.id;
            
           
       
       
      }

      const deleteLobby = async(lobby)=>{
        
        if(lobby.users)
        if(lobby.users.length>0){
        lobby.users.map(async(singleUser)=>{
          await updateDoc(doc(db,"users",singleUser.id), {lobby:null});
        })
      }
        await deleteDoc(doc(db,"lobbies", lobby.id)); 
        
      }
      const joinLobby = async (lobby,user) => {
         const updatedArray = lobby.users;
         const oldUser ={...user};
         oldUser.lobby=lobby.id;
   
        const newUser={
          ...oldUser,
          point:0,
        }

         updatedArray.push(newUser);
         await updateDoc(doc(db,"lobbies",lobby.id), {users:updatedArray});
         await updateDoc(doc(db,"users",user.id), {lobby:lobby.id});
        };

        const exitLobby = async (lobby) => {    

         //TODO
         //LOBBY LİDERİ HERKES OYUNDAN AYRILDIKTAN SONRA OYUN OYNANIRKEN SON KİŞİ OLARAK ÇIKIŞ YAPARSA LOBBY I BOŞ BİR KİŞİYE DEVREDİYOR
         //LOBBY İÇERİSİNDEKİ USER LARIN USER.LOBBY DURUMU KONTROL EDİLSİN

         if(lobby.status && lobby.owner==user.id)
         {//lobby durumu aktif ve lobby lideriyse
          const chooseLobbyLeader = lobby.users.find((eachUser) => eachUser.id !== user.id);
          // const selectedLeader = Array.isArray(chooseLobbyLeader) ? chooseLobbyLeader[0] : chooseLobbyLeader;
          let selectedLeader;
          if(chooseLobbyLeader){
          
          let findLobbyLeader=false;
       
          if(Array.isArray(chooseLobbyLeader)){
         
            chooseLobbyLeader.map((eachUserInLobby)=>{

              if(!findLobbyLeader){
              
                const findRealStatusOfUser = allUsers.find((eachUser)=>eachUser.id===eachUserInLobby.id);

              if(findRealStatusOfUser.lobby===lobby.id)
               selectedLeader = eachUserInLobby;
          
              findLobbyLeader=true;
              }

            })

            if(selectedLeader){
              await updateDoc(doc(db,"lobbies",lobby.id), {owner:selectedLeader.id});
          await updateDoc(doc(db,"users",user.id), {lobby:null});
            }
            else{
              deleteLobby(lobby);
            }
          }
          else{

            if(chooseLobbyLeader.lobby==lobby.id){
          await updateDoc(doc(db,"lobbies",lobby.id), {owner:chooseLobbyLeader.id});
          await updateDoc(doc(db,"users",user.id), {lobby:null});
            }
            else{
              deleteLobby(lobby);
            }

          }
        
        }
        else{
          deleteLobby(lobby);
        }

          // await updateDoc(doc(db,"lobbies",lobby.id), {owner:selectedLeader.id});
          // await updateDoc(doc(db,"users",user.id), {lobby:null});
         }
         else if(!lobby.status && lobby.owner==user.id){      
            deleteLobby(lobby);
         }
         else if(lobby.status)
          {//lobby durumu aktif ve normal oyuncu
          await updateDoc(doc(db,"users",user.id), {lobby:null});
          }
          else if(!lobby.status){
            //lobby durumu aktif değil ve normal oyuncu
              const updatedArray = lobby.users;
              const filteredArray = updatedArray.filter(arrayUser=>arrayUser.id !== user.id)
              await updateDoc(doc(db,"lobbies",lobby.id), {users:filteredArray});
             await updateDoc(doc(db,"users",user.id), {lobby:null});
            
          }            
         };

  
         const startGame =async(lobby)=>{
         if(!lobby.status){  
          
     
          const selectedQuestions = selectRandomQuestions();
          const newSelectedQuestions=[];
          selectedQuestions.map((question,idx)=>{
            const newQuestion={
              ...question,
              question_number:idx+1
            }
            newSelectedQuestions.push(newQuestion);

          })
          await updateDoc(doc(db,"lobbies",lobby.id), {
            questions:newSelectedQuestions,
            status:true,
          });
        }
         }

         const selectRandomQuestions=()=>{
          const newQuestions = [...questions];
          newQuestions.sort(() => Math.random() - 0.5);
          const selectedQuestions = newQuestions.slice(0, 10);
          return selectedQuestions;
         }

         const giveAnswer = async(user,lobby,questionNumber,answer)=>{



           const  oldArray = [...lobby.answers];

           const newAnswer ={
            user:user.id,
            answer:answer, 
          }

          const currentQuestion = oldArray.find(object => object.questionNumber === questionNumber);

if (currentQuestion) {

  currentQuestion.responses.push(newAnswer);

  const updatedArray = oldArray.map(obj =>
    obj.questionNumber === questionNumber ? currentQuestion : obj
  );

  await updateDoc(doc(db, "lobbies", lobby.id), { answers: updatedArray });
}
          else{
            const Theme = {
              questionNumber: questionNumber,
              responses: [newAnswer],
            }
            oldArray.push(Theme);
          }
         

   
           
          await updateDoc(doc(db,"lobbies",lobby.id), {answers:oldArray});
          //await
         }

        const decreaseLobbyTime=async(lobby)=>{
        const oldTime = lobby.time;
        await updateDoc(doc(db, "lobbies", lobby.id), { time: oldTime-1  });
        } 
       
      

        const calculatePoints = async (lobby) => {
          const updatedUsers = [];
        if(user.id==lobby.owner){
   
          for (const user of lobby.users) {
            let userUpdated = false; // Kullanıcının güncellenip güncellenmediğini takip etmek için bir flag
            let eachUserTotalPoint=0;
            for (const index of lobby.answers) {
              
              const rightQuestion = lobby.questions.find(question => question.question_number == index.questionNumber);
              const userResponse = index.responses.find(response => response.user == user.id);
        
             
        
              if (rightQuestion && userResponse) {
                if ((rightQuestion.correct_answer == userResponse.answer) && !userUpdated) {
                  eachUserTotalPoint+=100;          
                }
              }
            }
             const updatedUser = { ...user, point: eachUserTotalPoint };
             updatedUsers.push(updatedUser);
        
         
          
          }
        
          // Oluşturulan güncellenmiş kullanıcı listesini kullanarak lobi güncelle
          const updatePromise = await updateDoc(doc(db, "lobbies", lobby.id), {
            users: updatedUsers
          });
        
          return updatePromise;
        }
        };


        const autoAnswer=async(lobby)=>{
          const lobbyTotalUser=lobby.length;
         const RightAnswers = lobby.answers.find((index)=>index.responses.length<lobbyTotalUser);
         if(RightAnswers){
         const lobbyQuestionNumber = RightAnswers.questionNumber;
         
         lobby.users.map((eachUser)=>{
          let userAnswered=false;
          for(let i=0;i<RightAnswers.responses.length;i++){
            if(eachUser.id==RightAnswers.responses[i].user){
              userAnswered=true;
            }
          }
          if(!userAnswered)
          giveAnswer(eachUser,lobby,lobbyQuestionNumber,null);
         })
         resetTimer(lobby);
        }
        else{
          let RightQuestionNumber = lobby.answers.length+1;
        lobby.users.map((eachUser)=>{
          giveAnswer(eachUser,lobby,RightQuestionNumber,null);
        })
        }


      }
      
        const resetTimer=async(lobby)=>{   
             await updateDoc(doc(db, "lobbies", lobby.id), { time: 30 });     
        }
        const testEnd =async(lobby)=>{   
          await updateDoc(doc(db, "lobbies", lobby.id), { status: false });     
          setStatistics(lobby);
     }

     const changeUserStatus=async(status)=>{
      await updateDoc(doc(db,"users",user.id), {status:status});
     }

     const sendMessage= async(lobby,msg,time)=>{
      const oldChat = [...lobby.chat];

      const newMessage ={
        user_id:user.id,
        user_name:user.name,
        message:msg,
        time:time
      }

      oldChat.push(newMessage);

      await updateDoc(doc(db,"lobbies",lobby.id), {chat:oldChat});
     }

     const LobbyResults=(lobby)=>{
      const resultsArr=[];



      lobby.answers.map((index)=>{
      
          const rightQuestion = lobby.questions.find(question => question.question_number == index.questionNumber);
          const Responses=[];
          const newItem ={
              questionNumber:rightQuestion.question_number,
              question:rightQuestion.question,
              correct_answer:rightQuestion.correct_answer,
          };
  
          index.responses.map((eachResponse)=>{
              Responses.push(eachResponse);
          })
          const resultItem = {
              ...newItem,
              responses:Responses
          }
  
          resultsArr.push(resultItem);
   
      })

      return resultsArr;
     }

     const setStatistics= async(lobby)=>{

      if(lobby.length>1){
      
     const ResultsArr = LobbyResults(lobby);

     
     const leaderBoardSort = lobby.users.sort((a, b) => b.point - a.point);
     let oldTotalwins=leaderBoardSort[0].total_wins;
     await updateDoc(doc(db,"users",leaderBoardSort[0].id), {total_wins:oldTotalwins+1});

     lobby.users.map(async(eachUser)=>{
      let AnsweredQuestionCounter=0;
      let correctAnswersCounter=0;

      ResultsArr.map((eachQuestion)=>{

        const findUserAnswer = eachQuestion.responses.find((eachResponse)=>eachResponse.user==eachUser.id);
        if(findUserAnswer!=null){
          AnsweredQuestionCounter++;
          if(findUserAnswer.answer==eachQuestion.correct_answer){
            correctAnswersCounter++;
          }
        }
      })

      let oldQuestionsAnswered = eachUser.questions_answered;
      let oldCorrectAnswers = eachUser.correct_answers;
      await updateDoc(doc(db,"users",eachUser.id), {
        questions_answered:oldQuestionsAnswered+AnsweredQuestionCounter,
        correct_answers:oldCorrectAnswers+correctAnswersCounter,
      });

     })


    }
     }
   
        
     

     const contextValue={allUsers,setAllUsers,user,setUser,register,lobbies,setLobbies,createLobby,deleteLobby,joinLobby,questions,exitLobby,startGame,giveAnswer,decreaseLobbyTime,calculatePoints,autoAnswer,resetTimer,testEnd,changeUserStatus,sendMessage,setStatistics,LobbyResults};
    
    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
      )
}