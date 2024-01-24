import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AppContext';

const Countdown = ({props}) => {
const {user,lobbies,decreaseLobbyTime,autoAnswer} = useContext(Context);
const [timer,setTimer] = useState(props.time);
    useEffect(() => {
      let intervalId;

      const startTimer = () => {
        if (props.time > 0) {
          intervalId = setInterval(() => {
            decreaseLobbyTime(props);
          }, 1000);
        } else {
          autoAnswer(props);
          clearInterval(intervalId);
        }
      };
    
      const stopTimer = () => {
        clearInterval(intervalId);
      };


      if (props.status) {
        startTimer();
      } 
      // else {
      //   stopTimer();
      // }

      return () => {
        stopTimer();
      };

    }, [props.status, props.owner, user.id,decreaseLobbyTime,props.time]);
  

  return (
    <div className='w-[120px] flex justify-center items-center h-[120px] rounded-full bg-app-purple text-app-white text-5xl font-bold'>
       {props.time} 
  </div>
  )
}

export default Countdown