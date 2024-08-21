import { useEffect, useState } from 'react';

import Spinner from '../Spinner';
import { toast } from 'sonner';

const ForgotPassword = ({ swapPass, onClose, handleShowReset }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [Otploading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [message, setMessage] = useState('');

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
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
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
        onClose();
        handleShowReset(email, otp);
        // navigate('/reset-password', { state: { email, otp } });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        // Reuse the same endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Pass the email to resend the OTP
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('OTP has been resent.');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // Effect to handle cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);

      // Clear the timer when cooldown reaches 0 or when component unmounts
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  // Function to format cooldown time in MM:SS format
  const formatCooldown = () => {
    const minutes = Math.floor(cooldown / 60);
    const seconds = cooldown % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    // Disable vertical scrolling
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';

    // Cleanup function to reset the overflow style
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <div className=" fixed top-0 left-0 bottom-0 z-[3000] bg-opacity-90 w-screen   bg-black/80 shadow-lg  flex  lg:p-12 mx-auto">
      <div className=" mx-auto overflow-y-auto sm:h-[60vh] h-[100vh] overflow-hidden bg-white my-auto w-full   lg:w-[30vw] sm:w-[60vh]">
      <div className="lg:w-[90%] mx-auto p-12   flex flex-col items-center">
        {!otpSent ? (
          <form onSubmit={handleEmailSubmit} className="flex w-full gap-6 flex-col ">
            <h1 className="text-2xl md:text-3xl text-center font-semibold">
              Forgot Password
            </h1>

            <p className="sm:text-[16px] text-[14px] text-center whitespace-nowrap">
              Enter your email to receive an OTP.
            </p>
            <input
              className="border-b border-[#333333] bg-transparent   outline-none"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              disabled={loading}
              className="cursor-pointer hover:opacity-90 bg-[#081d57] text-white p-2 lg:p-3 text-sm lg:text-[16px]  uppercase"
            >
              {loading ? (
                <Spinner className="w-6 h-6 border-white mt-0 mb-0 mx-auto " />
              ) : (
                'Send OTP'
              )}
            </button>
            <div className="flex gap-1 sm:text-[16px] text-[14px]">
              {' '}
              <p> Remember your password? </p>
              <span
                onClick={() => swapPass()}
                className="text-blue-700 cursor-pointer"
              >
                Sign in
              </span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="flex w-full gap-6 flex-col ">
            <h1 className="text-2xl md:text-3xl text-center font-semibold">
              Enter OTP
            </h1>
            <input
              className="border-b border-[#333333] bg-transparent   outline-none"
              type="text"
              min={0}
              max={4}
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              disabled={Otploading}
              className="cursor-pointer hover:opacity-90 bg-[#081d57] text-white p-2 lg:p-3 text-sm lg:text-[16px]  uppercase"
            >
              {Otploading ? (
                <Spinner className="w-6 h-6 border-white mt-0 mb-0 mx-auto " />
              ) : (
                'Verify OTP'
              )}
            </button>
            <div className="flex gap-1 text-center text-[12px] lg:text-[16px]">
              <p className="font-sans text-[#333333]">
                {' '}
                Do not receive an OTP?
              </p>
              <button
                onClick={cooldown > 0 || resendLoading ? null : handleResendOtp}
                disabled={cooldown > 0 || resendLoading}
                className={`text-blue-700 ${
                  resendLoading || cooldown > 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                {resendLoading
                  ? 'Resending...'
                  : cooldown > 0
                  ? `Resend OTP (${formatCooldown()})`
                  : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}
        </div>
       </div>
      </div>
      
  );
};

export default ForgotPassword;
