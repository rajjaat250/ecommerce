import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const baseURL = 'http://127.0.0.1:8000';

    useEffect(() => {
        const checkUserStatus = async () => {
            let access = localStorage.getItem('access');
            if (access) {
                try {
                    const decoded = jwtDecode(access);
                    setUser(decoded);
                } catch (error) {
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUserStatus();
    }, []);

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(`${baseURL}/login/`, {
                username,
                password
            });
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                const decoded = jwtDecode(response.data.access);
                setUser(decoded);
                navigate('/');
                return { success: true };
            }
        } catch (error) {
            return { success: false, error: error.response?.data?.detail || 'Login failed' };
        }
    };

    const registerUser = async (userData) => {
        try {
            const response = await axios.post(`${baseURL}/register/`, userData);
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                const decoded = jwtDecode(response.data.access);
                setUser(decoded);
                navigate('/');
                return { success: true };
            }
        } catch (error) {
            let errorMsg = 'Registration failed';
            if (error.response && error.response.data) {
                 // handle django serializer errors
                 errorMsg = Object.values(error.response.data).flat().join(', ');
            }
            return { success: false, error: errorMsg };
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
        navigate('/login');
    };

    const contextData = {
        user,
        loginUser,
        registerUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
