import { Account } from "appwrite";
import React, { useState } from "react";
import { ID } from "appwrite";
import { account } from "../../config";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logIn, setStatus } from "../Store/authSlice";  // Import the setStatus action
import '../Styles/Signup.css';

export const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await account.create(ID.unique(), userData.email, userData.password, userData.name);
      const session = await account.createEmailPasswordSession(userData.email, userData.password);
      if (session) {
        localStorage.setItem('status', 'true');
        dispatch(logIn(true));  // Dispatch the setStatus action
        navigate('/profile');
      }
    } catch (error) {
      console.log("Error in this page", error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup</h1>
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
          type="password"
          value={userData.password}
          placeholder="password"
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="uservalue"
        />
        <button className="signupbtn">Signup</button>
      </form>
    </div>
  );
};
