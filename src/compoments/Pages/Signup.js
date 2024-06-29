import { Account } from "appwrite";
import React, { useEffect, useRef, useState } from "react";
import { ID } from "appwrite";
import { account } from "../../config";
import { useNavigate } from "react-router";
import '../Styles/Signup.css';
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const[passwordActive,setPasswordActive]=useState(false);
   const passwordref=useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await account.create(ID.unique(), userData.email, userData.password, userData.name);
      if (response.status === 201) {
        const session = await account.createEmailPasswordSession(userData.email, userData.password);
        if (session) {
          localStorage.setItem('status', 'true');
          navigate('/userData');
        }
      } 
    } catch (error) {      
      if (error.response.status==409) {
        toast.error("Aleardy have a account!");
      }
    }
  };

  const handleOutside=(event)=>{
    if(passwordref.current && !passwordref.current.contains(event.target)){
      setPasswordActive(false);
    }
  }
  useEffect(()=>{
    document.addEventListener('mousedown',handleOutside);
  },[])

  const handleCheck=()=>{
    const password=userData.password;
    const hasNumber=/\d/.test(password);
    const hasSymbol=/[!@#$%^&*()<>?":{}|<>]/.test(password);
    const hasuppercase=/[A-Z]/.test(password);
    const  haschar=/[a-z]/.test(password);
    if(!hasNumber || !hasSymbol || !hasuppercase || !haschar || password.length<8){
      toast.error("weak password!")
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
  return (     
     <LazyLoad height={200}>

    <div className="signup-Page">
      <div className="signup-container">
      
      <div className="signup-div">
      <h1 className="signup-title">Signup to BudgetBuddy</h1>
      <p className="login">Already Have Account? <Link to="/login" className="loginpage">Login</Link></p>

      <form onSubmit={(e) => handleSubmit(e)} className="user-form">
        <input
          type="text"
          value={userData.name}
          placeholder="name"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="uservalue"
        />
        <input
          type="email"
          value={userData.email}
          placeholder="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="uservalue"
        />

        <input
        onClick={()=>{setPasswordActive(true)}}
          type="password"
          value={userData.password}
          placeholder="password"
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="uservalue password"
          ref={passwordref}
          id="password"
        />
     <div className="password-show">
      <input type="checkbox" className="checkbox" onClick={handleShowPassword}></input>
      <label className="checkbox-label">Show Password</label>
     </div> 

        
        <button className="signupbtn" onClick={handleCheck}>Signup</button>
      </form>
       </div>
      </div>
   <ToastContainer/>
    </div>
    </LazyLoad>
  );
};
