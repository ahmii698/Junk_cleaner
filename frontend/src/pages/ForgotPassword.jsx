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
        <div className="min-h-screen flex items-center justify-center py-20">
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 max-w-md w-full border border-cyan-500/20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Reset <span className="text-cyan-500">Password</span></h2>
                    <p className="text-gray-400 mt-2">
                        {step === 1 && 'Enter your email to receive OTP'}
                        {step === 2 && 'Enter the OTP sent to your email'}
                        {step === 3 && 'Enter your new password'}
                    </p>
                </div>

                {message && <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-6 text-green-400 text-center">{message}</div>}
                {error && <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-6 text-red-400 text-center">{error}</div>}

                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white mb-4" required />
                        <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Sending...' : 'Send OTP →'}</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white mb-4" required />
                        <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Verifying...' : 'Verify OTP →'}</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <input type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white mb-4" required />
                        <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white mb-4" required />
                        <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Resetting...' : 'Reset Password →'}</button>
                    </form>
                )}

                <div className="text-center mt-6">
                    <Link to="/login" className="text-cyan-500 hover:underline">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;