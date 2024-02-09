

import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SideImg from "./Images/Rectangle 2756.svg";
// import logo from "./Images/Av.svg"
import {useDispatch, useSelector } from 'react-redux';
import { getlog } from '../Redux/authReducer/action';

const Login = () => {
//   const { isAuth } =useSelector((store)=>{
//     return{
//     isAuth:store.authReducer.isAuth
// }})
  
  const nav=useNavigate()
  const [input,setInput]=useState({
    email:"",
    password:""
  });
  const LoginWithGoogle=()=>{
   window.open("https://bugtracker-j5bn.onrender.com/auth/google/callback","_self")
    }
  const handleInputChange=(e)=>{
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }
const [errorMessage,setErrorMessage]=useState("")
  const dispatch=useDispatch();

  function handleLogin(e) {
    e.preventDefault();
  
    const { email, password } = input;
    const userData = { email, password };
    
    dispatch(getlog(userData))
      .then(() => {
        // console.log("isAuth",isAuth)

        alert("Logged in Successfully. Welcome to Masai Forum");
        nav("/feed");
        
      })
      .catch((error) => {
        const errorMessage = error.response ? error.response.data.message : "Something went wrong.";
        setErrorMessage(errorMessage);
        alert("Something went wrong. Please check your credentials.");
        console.log(error, "err");
      });
  }
  
  return (
    <div className='flex'>
      <div><img src={SideImg} alt="masai-forum" style={{height:"100vh"}} /></div>
    <div className="flex items-center justify-center m-auto">
      <div className="bg-white p-6 w-96">
        <div className='flex items-center justify-center mb-5 gap-3'><div></div><div><h2 className="text-2xl font-bold text-center">Masai Forum</h2></div></div>
        <h1 className="text-3xl font-bold mb-6 text-center">Nice to see you again</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="username"
              name="email"
              value={input.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-pink-500 focus:outline-none"
          >
            Login
          </button>
          <div className='py-2 text-center mb-2'>
                Don't have account yet ? <Link className='underline text-black' to="/register">Register Here</Link>
            </div>
        </form>
        <p className='m-auto text-center'>Or</p>
        <button className='flex bg-white border border-spacing-1 p-1 rounded-md px-6 items-center justify-between m-auto' onClick={LoginWithGoogle}>
          
          <img className='w-12' src="https://img.icons8.com/?size=48&id=17949&format=png" alt="google" />
          Sign In with Google

        </button>
      </div>
    </div>
    </div>
  )
}

export default Login