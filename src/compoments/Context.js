// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { account } from './config'; // Adjust this import to your account API setup

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is logged in when the app starts
        const checkUser = async () => {
            try {
                const result = await account.get();
                setUser(result);
            } catch (error) {
                setUser(null);
            }
        };

        checkUser();
    }, []);

    const login = async (credentials) => {
        // Implement login logic here
        const result = await account.createSession(credentials);
        setUser(result);
    };

    const logout = async () => {
        // Implement logout logic here
        await account.deleteSession('current');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
