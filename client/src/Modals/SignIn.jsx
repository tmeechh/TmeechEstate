/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { signInSuccess } from '../redux/user/userSlice';
import OAuth from '../component/OAuth';
import Spinner from '../Spinner';
import { toast } from 'sonner';

const SignIn = ({ onClose, swapModal, onForgot }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    // Disable vertical scrolling
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';

    // Cleanup function to reset the overflow style
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const handleChange = (e) => {
    setError('');
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();

        let errorMessage = 'An error occurred';
        if (res.status === 404) {
          errorMessage =
            'We were not able to find the supplied email and/or password. Please try again. Registration is required. Please use the links below if you have forgotten your password, or if you need to sign up.';
        } else if (res.status === 401) {
          errorMessage = 'Wrong credentials!';
        } else {
          errorMessage = errorData.message || 'An error occurred';
        }

        setLoading(false);
        setError(errorMessage); // Set error message to display
        return;
      }

      const data = await res.json();
      setLoading(false);
      dispatch(signInSuccess(data));
      onClose();
      toast.success('Welcome Back');
      navigate('/');
      console.log(data);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setLoading(false);
      setError(error.message || 'An unexpected error occurred'); // Set error message to display
    }
  };

  // console.log(formData);
  return (
    <div
      onClick={onClose}
      className=" fixed top-0 left-0 bottom-0 z-[3000] bg-opacity-90 w-screen   bg-black/80 shadow-lg  flex  lg:p-12 mx-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" mx-auto overflow-y-auto sm:h-[70vh] h-[100vh] overflow-hidden bg-white my-auto w-full   lg:w-[40vw] sm:w-[60vh]"
      >
        <div className="lg:w-[90%] mx-auto p-12   flex flex-col items-center">
          <div className="flex justify-between  w-full  pb-7">
            <h1 className="text-xl md:text-2xl text-center font-semibold whitespace-nowrap text-[#333333]">
              Sign In
            </h1>
            <button onClick={onClose} className="">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full gap-6 flex-col ">
            <input
              className="border-b border-[#333333] bg-transparent   outline-none"
              required
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              className="border-b border-[#333333] bg-transparent   outline-none"
              required
              id="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className=" hover:opacity-90 disabled:opacity-80  bg-[#081d57] text-white p-2 lg:p-3 text-sm lg:text-[16px]  uppercase"
            >
              {loading ? (
                <Spinner className="w-6 h-6 border-white mt-0 mb-0 mx-auto " />
              ) : (
                'sign in'
              )}
            </button>
            <OAuth onClose={onClose} />

            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>
          <div className="flex flex-col justify-between items-center mt-5">
            <div className="flex gap-1 text-[12px] lg:text-[16px]">
              <p className="font-josefin text-[#333333]">
                {' '}
                Do not have an account?
              </p>
              <span
                onClick={() => swapModal()}
                className="text-blue-700 font-josefin cursor-pointer"
              >
                Sign up
              </span>
            </div>

            <div
              onClick={onClose}
              className="hover:underline  text-[#333333] hover:text-gray-600 text-[12px] lg:text-[16px]"
            >
              <Link className="font-josefin" onClick={onForgot}>
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
