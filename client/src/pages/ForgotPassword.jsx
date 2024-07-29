import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [Otploading, setOtpLoading] = useState(false);
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/reset-password', { state: { email, otp } });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 z-10 bg-opacity-90 w-screen bg-black/80 shadow-lg flex p-12 mx-auto">
      <div className="mx-auto bg-slate-200 my-auto rounded-xl px-7 py-10 md:px-12 lg:px-16 flex flex-col items-center">
        {!otpSent ? (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl text-center font-semibold">Forgot Password</h1>
            <p className='text-[14px] text-center'>Enter your email to receive an OTP <br />for password reset.</p>
            <input
              className="border p-2 lg:p-3 rounded-xl outline-none"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button  disabled={loading} className="cursor-pointer hover:opacity-90 bg-slate-900 text-white p-2 lg:p-3 text-sm lg:text-[16px] rounded-xl uppercase">
            {loading ? 'Loading...' : 'Send OTP'}
            </button>
            {message && <p className="text-red-500 mt-5">{message}</p>}
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl text-center font-semibold">Enter OTP</h1>
            <input
              className="border p-2 lg:p-3 rounded-xl outline-none"
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button disabled={Otploading} className="cursor-pointer hover:opacity-90 bg-slate-900 text-white p-2 lg:p-3 text-sm lg:text-[16px] rounded-xl uppercase">
            {Otploading ? 'Verifying...' : 'Verify OTP'}
            </button>
            {message && <p className="text-red-500 mt-5">{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
