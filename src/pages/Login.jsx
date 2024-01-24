import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'  
const Login = () => {

  const navigate = useNavigate();
const [page,setPage]=useState(true);
const {user,setUser,allUsers,setAllUsers,register} = useContext(Context);

const handleSubmit = (event) => {
  event.preventDefault();
};

const LoginFunc=()=>{
let email = document.getElementById("email");
let password = document.getElementById("password");
 const finduser=allUsers.find((user)=>user.email==email.value);
 if(finduser){
  if(finduser.password==password.value){

    Swal.fire({
      position: "center",
      icon: "success",
      text: "You have successfully logged in.",
      showConfirmButton: false,
      timer: 1500
    });

    setUser(finduser);
    localStorage.setItem("id",finduser.id);
    navigate("/home");
  }
  else{
    
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Invalid username or password. Please check your username and password try again.",
      showConfirmButton: false,
      timer: 2000
    });
  }
 }
 else{
  Swal.fire({
    position: "center",
    icon: "error",
    text: "Invalid username or password. Please check your username and password try again.",
    showConfirmButton: false,
    timer: 2000
  });
 }
}
const RegisterSuccsess=()=>{
  Swal.fire({
    position: "center",
    icon: "success",
    text: "You have successfully created an account. You can login.",
    showConfirmButton: false,
    timer: 1500
  });
  
}
const RegisterFailed=()=>{
  Swal.fire({
    position: "center",
    icon: "error",
    text: "This email address is used by another user.",
    showConfirmButton: false,
    timer: 1500
  });
}

const RegisterFunc=()=>{
let email = document.getElementById("email");
let password = document.getElementById("password");
let name = document.getElementById("name");
register(email.value,name.value,password.value).then(result => {
  RegisterSuccsess();
})
.catch(error => {
  RegisterFailed();
});


}

const visible={
  display:"block"
}
const unvisible={
  display:"none"
}

  return (
    <>
    <div className='min-h-screen h-fit w-full flex justify-center items-center'>
    <div className="flex min-h-full flex-col justify-center p-6 rounded-md sm:w-[500px] duration-300 bg-white lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{page ? "Login to your account" : "Register Now!"}</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div style={page ? unvisible : visible}>
        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
          <input id="name" name="name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button onClick={()=>{page ? LoginFunc() : RegisterFunc()}} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {page ? "Login" : "Register"}
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
        {page ? "Not a member?" : "You have an account?"}
    
      <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2" onClick={()=>{setPage(!page)}}>
        {page ? "Register Now!" : "Login Now!"}
      </a>
    </p>
  </div>
</div>
</div>
</>
  )
}

export default Login

