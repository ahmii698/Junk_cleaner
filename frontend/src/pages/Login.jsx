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
            if (isLogin) {
                await login({ email: formData.email, password: formData.password });
            } else {
                if (formData.password !== formData.password_confirmation) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }
                await register({ name: formData.name, email: formData.email, password: formData.password, password_confirmation: formData.password_confirmation });
            }
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20">
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 max-w-md w-full border border-cyan-500/20 reveal">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-gray-400 mt-2">{isLogin ? 'Login to your account' : 'Register to get started'}</p>
                </div>

                {error && <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-6 text-red-400 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />}
                    <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                    <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                    {!isLogin && <input type="password" placeholder="Confirm Password" value={formData.password_confirmation} onChange={e => setFormData({...formData, password_confirmation: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />}
                    
                    <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Please wait...' : (isLogin ? 'Login →' : 'Register →')}</button>
                    
                    {/* Forgot Password Link - SIRF LOGIN MODE MEIN DIKHEGA */}
                    {isLogin && (
                        <div className="text-center mt-2">
                            <Link to="/forgot-password" className="text-cyan-500 hover:underline text-sm">
                                Forgot Password?
                            </Link>
                        </div>
                    )}
                </form>

                <div className="text-center mt-6">
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-cyan-500 hover:underline">
                        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;