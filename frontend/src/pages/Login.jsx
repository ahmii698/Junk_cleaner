import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            let response;
            if (isLogin) {
                response = await login({ email: formData.email, password: formData.password });
                console.log('Login response:', response);
            } else {
                if (formData.password !== formData.password_confirmation) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }
                response = await register({ 
                    name: formData.name, 
                    email: formData.email, 
                    password: formData.password, 
                    password_confirmation: formData.password_confirmation 
                });
                console.log('Register response:', response);
            }
            
            console.log('Redirecting to /admin...');
            navigate('/admin');
            
        } catch (err) {
            console.error('Login/Register error:', err);
            setError(err.response?.data?.message || err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20 bg-gray-100">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-gray-500 mt-2">{isLogin ? 'Login to your account' : 'Register to get started'}</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 rounded-lg p-3 mb-6 text-red-700 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})} 
                            className="w-full p-4 bg-gray-100 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-800" 
                            required 
                        />
                    )}
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full p-4 bg-gray-100 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-800" 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={e => setFormData({...formData, password: e.target.value})} 
                        className="w-full p-4 bg-gray-100 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-800" 
                        required 
                    />
                    {!isLogin && (
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={formData.password_confirmation} 
                            onChange={e => setFormData({...formData, password_confirmation: e.target.value})} 
                            className="w-full p-4 bg-gray-100 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-800" 
                            required 
                        />
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-4 rounded-xl transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Please wait...' : (isLogin ? 'Login →' : 'Register →')}
                    </button>
                    
                    {isLogin && (
                        <div className="text-center mt-2">
                            <Link to="/forgot-password" className="text-cyan-500 hover:underline text-sm">
                                Forgot Password?
                            </Link>
                        </div>
                    )}
                </form>

                <div className="text-center mt-6">
                    <button 
                        onClick={() => { 
                            setIsLogin(!isLogin); 
                            setError(''); 
                            setFormData({ name: '', email: '', password: '', password_confirmation: '' });
                        }} 
                        className="text-cyan-500 hover:underline"
                    >
                        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;