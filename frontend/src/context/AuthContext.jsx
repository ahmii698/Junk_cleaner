import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginAPI, register as registerAPI, logout as logoutAPI, getMe } from '../services/api';
import api from '../services/api';  // 🔥 Direct import karo

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');
            
            console.log('Checking auth - Token exists:', !!token);
            console.log('Checking auth - Saved user exists:', !!savedUser);
            
            if (token && savedUser) {
                try {
                    // 🔥 IMPORTANT: Set token in axios headers immediately
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    console.log('Token set in axios headers');
                    
                    setUser(JSON.parse(savedUser));
                    setIsAuthenticated(true);
                    
                    // Verify token with backend
                    try {
                        const res = await getMe();
                        console.log('Token verified, user:', res.data);
                        setUser(res.data);
                        setIsAuthenticated(true);
                        localStorage.setItem('user', JSON.stringify(res.data));
                    } catch (verifyError) {
                        console.error('Token verification failed:', verifyError);
                        // Token invalid, logout
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setUser(null);
                        setIsAuthenticated(false);
                        delete api.defaults.headers.common['Authorization'];
                    }
                } catch (error) {
                    console.error('Auth check error:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else {
                console.log('No token found, user not authenticated');
                setUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        };
        
        checkAuth();
    }, []);

    const login = async (credentials) => {
        console.log('Login attempt with:', credentials.email);
        const res = await loginAPI(credentials);
        console.log('Login response:', res.data);
        
        const { token, user } = res.data;
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // 🔥 Set token in axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Token set in axios headers after login');
        
        setUser(user);
        setIsAuthenticated(true);
        
        console.log('Login successful, user set:', user);
        return res.data;
    };

    const register = async (userData) => {
        console.log('Register attempt with:', userData.email);
        const res = await registerAPI(userData);
        console.log('Register response:', res.data);
        
        const { token, user } = res.data;
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // 🔥 Set token in axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Token set in axios headers after register');
        
        setUser(user);
        setIsAuthenticated(true);
        
        console.log('Register successful, user set:', user);
        return res.data;
    };

    const logout = async () => {
        console.log('Logout called');
        try {
            await logoutAPI();
        } catch (error) {
            console.error('Logout API error:', error);
        }
        
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // 🔥 Remove token from axios headers
        delete api.defaults.headers.common['Authorization'];
        console.log('Token removed from axios headers');
        
        setUser(null);
        setIsAuthenticated(false);
        
        console.log('Logout complete');
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};