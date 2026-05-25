// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await api.post('/reset-password', {
                token,
                password,
                password_confirmation: passwordConfirmation
            });
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
        setLoading(false);
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center py-20">
                <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 max-w-md w-full border border-cyan-500/20 text-center">
                    <i className="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
                    <h2 className="text-2xl font-bold text-white mb-2">Invalid Link</h2>
                    <p className="text-gray-400 mb-6">No reset token provided. Please request a new password reset.</p>
                    <Link to="/forgot-password" className="text-cyan-500 hover:underline">Request New Reset Link →</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-20">
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 max-w-md w-full border border-cyan-500/20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Reset <span className="text-cyan-500">Password</span></h2>
                    <p className="text-gray-400 mt-2">Enter your new password</p>
                </div>

                {error && <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-6 text-red-400 text-center">{error}</div>}
                {success && <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-6 text-green-400 text-center">✅ Password reset successful! Redirecting to login...</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        value={passwordConfirmation} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)} 
                        className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" 
                        required 
                    />
                    
                    <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
                        {loading ? 'Please wait...' : 'Reset Password →'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link to="/login" className="text-cyan-500 hover:underline">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;