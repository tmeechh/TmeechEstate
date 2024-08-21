/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { XMarkIcon } from '@heroicons/react/24/solid';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../component/OAuth';
import Spinner from '../Spinner';
import { toast } from 'sonner';

const SignIn = ({ onClose, swapModal, onForgot }) => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));

      onClose();
      navigate('/');
      // toast.success('Welcome Back');
      console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message); // max-w-lg
    }
  };

  // console.log(formData);
  return (
    <div onClick={onClose} className=" fixed top-0 left-0 bottom-0 z-[3000] bg-opacity-90 w-screen   bg-black/80 shadow-lg  flex  lg:p-12 mx-auto">
      <div onClick={(e) => e.stopPropagation()} className=" mx-auto overflow-y-auto sm:h-[70vh] h-[100vh] overflow-hidden bg-white my-auto w-full   lg:w-[40vw] sm:w-[60vh]">
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
              id="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
            />
            <input
              className="border-b border-[#333333] bg-transparent   outline-none"
              id="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="cursor-pointer hover:opacity-90 disabled:opacity-80  bg-[#081d57] text-white p-2 lg:p-3 text-sm lg:text-[16px]  uppercase"
            >
              {loading.signIn ? (
                <Spinner className="w-6 h-6 border-white mt-0 mb-0 mx-auto " />
              ) : (
                'sign in'
              )}
            </button>
            <OAuth onClose={onClose} />
          </form>
          <div className="flex flex-col justify-between items-center mt-5">
            <div className="flex gap-1 text-[12px] lg:text-[16px]">
              <p className="font-sans text-[#333333]">
                {' '}
                Do not have an account?
              </p>
              <span
                onClick={() => swapModal()}
                className="text-blue-700 cursor-pointer"
              >
                Sign up
              </span>
            </div>

            <div
              onClick={onClose}
              className="hover:underline text-[#333333] hover:text-gray-600 text-[12px] lg:text-[16px]"
            >
              <Link onClick={onForgot}>Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
