/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CgCloseR } from 'react-icons/cg';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../component/OAuth';
import Spinner from '../Spinner';
import { toast } from 'sonner';


const SignIn = ({ onClose, swapModal }) => {
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
      toast.success('Welcome Back');
      console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);// max-w-lg
    }
  };

  // console.log(formData);
  return (
    <div className=" fixed top-0 left-0 bottom-0 z-[3000] bg-opacity-90 w-screen   bg-black/80 shadow-lg  flex  p-12 mx-auto">
      <div className=" mx-auto bg-slate-200 my-auto rounded-xl px-7 py-10 md:px-12 lg:px-16  flex flex-col items-center ">
        <div className="flex justify-between gap-28 md:gap-20 lg:gap-[165px]  pb-7">
          <h1 className="text-2xl md:text-3xl text-center font-semibold whitespace-nowrap text-[#333333]">
            Sign In
          </h1>
          <button onClick={onClose} className="">
            <CgCloseR className="text-[20px] text-[#333333]" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 lg:p-3 lg:w-[300px] rounded-xl outline-none"
            id="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <input
            className="border p-2 lg:p-3 rounded-xl outline-none"
            id="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="cursor-pointer hover:opacity-90 disabled:opacity-80  bg-[#081d57] text-white p-2 lg:p-3 text-sm lg:text-[16px] rounded-xl uppercase"
          >
            {loading ?  <Spinner className="w-6 h-6 mt-0 mb-0 mx-auto " /> : 'sign in'}
          </button>
          <OAuth onClose={onClose} />
        </form>
        <div className="flex flex-col justify-between items-center mt-5">
          <div className="flex gap-1 text-[12px] lg:text-[16px]">
            <p className='font-sans text-[#333333]'> Do not have an account?</p>
            <span onClick={() => swapModal()} className="text-blue-700 cursor-pointer">
              Sign up
            </span>
          </div>

          <div onClick={onClose} className="hover:underline text-[#333333] hover:text-gray-600 text-[12px] lg:text-[16px]">
            <Link to={'/forgot-password'}>Forgot Password?</Link>
          </div>
        </div>
        {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
      </div>
    </div>
  );
};

export default SignIn;
