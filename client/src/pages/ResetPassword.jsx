import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { state } = useLocation();
  const { email, otp } = state || {};
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password, confirmPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Password reset successful');
        navigate('/');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 z-10 bg-opacity-90 w-screen bg-black/80 shadow-lg flex p-12 mx-auto">
      <div className="mx-auto bg-slate-200 my-auto rounded-xl px-7 py-10 md:px-12 lg:px-16 flex flex-col items-center">
        <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl text-center font-semibold">Reset Password</h1>
          <input
            className="border p-2 lg:p-3 rounded-xl outline-none"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="border p-2 lg:p-3 rounded-xl outline-none"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button   disabled={loading} className="cursor-pointer hover:opacity-90 bg-slate-900 text-white p-2 lg:p-3 text-sm lg:text-[16px] rounded-xl uppercase">
          {loading ? 'Loading...' : 'Reset Password'}
          </button>
          {message && <p className="text-red-500 mt-5">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
