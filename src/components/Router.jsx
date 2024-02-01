import React, { useContext } from 'react'
import { Context } from '../context/AppContext'
import SingleLobby from './SingleLobby';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotExist from '../pages/NotExist';

const Router = () => {
const {lobbies} = useContext(Context);

  return (
    <Routes>
         <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotExist />} />
    {lobbies.map((lobby)=>(
         <Route  key={"route-"+lobby.id} path={"/lobby/"+lobby.id} element={<SingleLobby props={lobby} key={lobby.id}/>}></Route>  
        ))}
    </Routes>
  )
}

export default Router