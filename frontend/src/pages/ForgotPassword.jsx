import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.post('/forgot-password', { email });
            setMessage('✅ OTP sent to your email!');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Email not found');
        }
        setLoading(false);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.post('/verify-otp', { email, otp });
            setMessage('✅ OTP verified!');
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        }
        setLoading(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.post('/reset-password', { email, password, password_confirmation: passwordConfirmation });
            setMessage('✅ Password reset successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20 bg-gray-100">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Reset <span className="text-cyan-500">Password</span></h2>
                    <p className="text-gray-500 mt-2">
                        {step === 1 && 'Enter your email to receive OTP'}
                        {step === 2 && 'Enter the OTP sent to your email'}
                        {step === 3 && 'Enter your new password'}
                    </p>
                </div>

                {message && (
                    <div className="bg-green-100 border border-green-400 rounded-lg p-3 mb-6 text-green-700 text-center">
                        {message}
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-100 border border-red-400 rounded-lg p-3 mb-6 text-red-700 text-center">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="w-full p-4 bg-gray-100 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-800 mb-4" 
                            required 
                        />
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-4 rounded-xl transition duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send OTP →'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <input 
                            type="text" 
                            placeholder="Enter OTP" 
                            value={otp} 
                            onChange={e => setOtp(e.target.value)} 
                            className="w-full p-4 bg-gray-100 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-800 mb-4" 
                            required 
                        />
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-4 rounded-xl transition duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP →'}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <input 
                            type="password" 
                            placeholder="New Password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            className="w-full p-4 bg-gray-100 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-800 mb-4" 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={passwordConfirmation} 
                            onChange={e => setPasswordConfirmation(e.target.value)} 
                            className="w-full p-4 bg-gray-100 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-800 mb-4" 
                            required 
                        />
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-4 rounded-xl transition duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Resetting...' : 'Reset Password →'}
                        </button>
                    </form>
                )}

                <div className="text-center mt-6">
                    <Link to="/login" className="text-cyan-500 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;