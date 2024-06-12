import React, { useEffect, useState } from 'react';
import { account } from '../../config';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { DateConvert } from '../DateConvert';
import '../Styles/Profile.css';
import { logOut } from '../Store/authSlice';

export const Profile = () => {
  const [data, setData] = useState({});
  const [name, setName] = useState();
  const authStatus = useSelector((state) => state.authSlice.status);
  
  console.log("Profile component re-rendered");
  console.log("authStatus:", authStatus);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const result = await account.get();
        setData(result);
        setName(result.name[0]);
      } catch (error) {
        console.log("no account");
      }
    };

    fetchAccount();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const result = await account.deleteSession('current');
      if (result) {
        dispatch(logOut());
        navigate('/login');
      }
    } catch (error) {
      console.log("error are here", error);
    }
  }

  return (
    <div className='profile-container'>
      <div className='profile'>{name}</div>
      <div className='data-section'>
        <p className='name'>Name: <span>{data.name}</span></p>
        <p>Email: <span>{data.email}</span></p>
        <p>Created At: <span><DateConvert timestamp={data.$createdAt} /></span></p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
