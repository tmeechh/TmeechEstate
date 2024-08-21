import { useEffect, useState } from 'react';

import OAuth from '../component/OAuth';

import Spinner from '../Spinner';
import { toast } from 'sonner';
import {
  XMarkIcon,
} from '@heroicons/react/24/solid';

const SignUp = ({ onClose, swapModal, handleShowSignIn }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);



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
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);

      onClose();
      // toast.success('Sign up successful');
      handleShowSignIn();
      console.log(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      // setError(error.message);
    }
  };
  //flex justify-between items-center

  // console.log(formData);
  return (
    <div onClick={onClose} className=" fixed top-0 left-0 bottom-0 z-[3000] bg-opacity-90 w-screen   bg-black/80 shadow-lg  flex  lg:p-12 mx-auto">

      <div onClick={(e) => e.stopPropagation()} className=" mx-auto overflow-y-auto sm:h-[70vh] h-[100vh] overflow-hidden bg-white my-auto w-full   lg:w-[40vw] sm:w-[60vh]">
      <div className='lg:w-[90%] mx-auto p-12   flex flex-col items-center'>
       <div className="flex justify-between  w-full  pb-7">
       <h1 className="text-xl md:text-2xl text-center font-semibold whitespace-nowrap text-[#333333]">
            Sign Up
          </h1>
          <button onClick={onClose} className="">
           <XMarkIcon className='w-6 h-6'/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full gap-6 flex-col ">
          <input
            className="border-b border-[#333333] bg-transparent   outline-none"
            id="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />
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
            className="cursor-pointer hover:opacity-90 disabled:opacity-80  bg-[#081d57] text-white p-2 lg:p-3 text-sm lg:text-[16px]    uppercase"
          >
            {loading ? (
              <Spinner className="w-6 h-6 border-white mt-0 mb-0 mx-auto " />
            ) : (
              'sign up'
            )}
          </button>
          <OAuth onClose={onClose} />
        </form>
        <div className="flex gap-2 mt-5 text-[12px] lg:text-[16px]">
          <p className="text-[#333333]">Have an account?</p>
          <span
            onClick={() => swapModal()}
            className="text-blue-700 cursor-pointer"
          >
            Sign in
          </span>
          </div>
          </div>
        {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
      </div>
    </div>
  );
};

export default SignUp;
