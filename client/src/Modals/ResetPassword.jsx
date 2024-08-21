import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import { toast } from 'sonner';

const ResetPassword = ({ email, otp, onClose }) => {
  // const { state } = useLocation();
  // const { email, otp } = state || {};
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
        toast.success('Password reset successful');
        onClose();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <form onSubmit={handlePasswordReset} className="flex w-full gap-6 flex-col ">
          <h1 className="text-2xl md:text-3xl text-center font-semibold">
            Reset Password
          </h1>
          <input
             className="border-b border-[#333333] bg-transparent   outline-none"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
             className="border-b border-[#333333] bg-transparent   outline-none"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="cursor-pointer hover:opacity-90 bg-[#081d57] text-white p-2 lg:p-3 text-sm lg:text-[16px]  uppercase"
          >
            {loading ? (
              <Spinner className="w-6 h-6 border-white mt-0 mb-0 mx-auto " />
            ) : (
              'Reset Password'
            )}
          </button>

          {/* {message && <p className="text-red-500 mt-5">{message}</p>} */}
          </form>
          </div>
      </div>
    </div>
  );
};

export default ResetPassword;
