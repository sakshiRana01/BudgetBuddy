import { Account } from "appwrite";
import React, { useState } from "react";
import { ID } from "appwrite";
import { account } from "../../config";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../Store/authSlice";
export const Logins=()=>{
  const[userData,setUserData]=useState({
    email:'',
    password:''
  })
  const authStatus = useSelector((state) => state.authSlice.status);
 console.log("authstatus",authStatus)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const session=await account.createEmailPasswordSession(userData.email,userData.password)
      if(session){
       navigate('/')
       dispatch(logIn(true))
      }
    }
    catch{
      console.log("error in this page")
    }
  }
  return(
    <div className="signup-container">
      <h1>Login</h1>
      <form onSubmit={(e)=>handleSubmit(e)} className="user-form">
         <input type="email" value={userData.email} placeholder="email" onChange={(e)=>setUserData({...userData,email:e.target.value})} className="uservalue"></input>
         <input type="password" value={userData.password} placeholder="password" onChange={(e)=>setUserData({...userData,password:e.target.value})} className="uservalue"></input>
         <button className="signupbtn">Login</button>
      </form>
    </div>
  )
}