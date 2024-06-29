import { Account } from "appwrite";
import React, { useState } from "react";
import { account } from "../../config";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../Styles/Signup.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LazyLoad from 'react-lazyload';

export const Logins=()=>{
  const[userData,setUserData]=useState({
    email:'',
    password:''
  })
 
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const session=await account.createEmailPasswordSession(userData.email,userData.password)
      if(session){
       navigate('/userData')
      }
    }
    catch(error){
      console.log("error",error.message)
        toast.error("email or password incorrect!")
     
    }
  }
  const handleShowPassword=()=>{
    const password=document.getElementById('password');
    if(password.type==="password")
    {password.type="text";}
    else{
      password.type="password";
    }
  
    }
  return(
    <LazyLoad height={200}>

    <div className="signup-Page Login-page">
    <div className="signup-container">
    
    <div className="signup-div">
    <h1 className="signup-title">Login to BudgetBuddy</h1>
    <p className="login">Don't Have Account? <Link to="/" className="loginpage">Signup</Link></p>

    <form onSubmit={(e) => handleSubmit(e)} className="user-form">
   
      <input
        type="email"
        value={userData.email}
        placeholder="email"
        onChange={(e)=>setUserData({...userData,email:e.target.value})}
                className="uservalue"
      />
      <input
        type="password"
        value={userData.password}
        placeholder="password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        className="uservalue"
        id="password"
      />
      <div className="password-show">
      <input type="checkbox" className="checkbox" onClick={handleShowPassword}></input>
      <label className="checkbox-label login-check">Show Password</label>
     </div> 
      <button className="signupbtn" >Login</button>
    </form>
    
     </div>
    </div>
 <ToastContainer/>
  </div>
  </LazyLoad>

    
  )
}