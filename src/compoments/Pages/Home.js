import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from './UserData';

export const Home = () => {
  const authStatus = useSelector((state) => state.authSlice.status);
  console.log("authstaut",authStatus)
 
  return (
    <div className='home-content'>
      {authStatus ? (
        <UserData />
      ) : (
        <div className='first-open'>
          <p className='main-quotes'>
            Don't let your money slip away unnoticed. Budget Buddy keeps tabs on your spending, so you can make every dollar count.
          </p>
          <button className='start-btn'>
            <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
              Start Now
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};
