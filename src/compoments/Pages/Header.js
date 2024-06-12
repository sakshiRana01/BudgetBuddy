import React, { useState } from 'react'
import '../Styles/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = () => {
    const authStatus =useSelector((state)=> state.authSlice.status)

  return (
    <div className='header-container'>
       <Link to='/' className='logo'>BUDGET BUDDY</Link>
       
          {
            authStatus ? <div className='profile-logo'>
            <Link to='/profile'><FontAwesomeIcon icon={ faUser} style={{color: "#ffffff",height:"27px",marginTop:"10px"}} /></Link>
             </div>:
             <div className='auth-container'>
              <Link to='/login' className='authdiv'>Login</Link>
              <Link to='/signup' className='authdiv'>Signup</Link>
             </div>
           
          }
       
    </div>
  )
}
