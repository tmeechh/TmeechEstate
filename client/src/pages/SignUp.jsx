import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../component/OAuth';
import { CgCloseR } from 'react-icons/cg';
import Spinner from '../Spinner';
import { toast } from 'sonner';


const SignUp = ({ onClose, swapModal, handleShowSignIn }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      toast.success('Sign up successful');
      onClose(); 
      handleShowSignIn(); 
      console.log(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.message)
      // setError(error.message);
    }
  };
  //flex justify-between items-center

  // console.log(formData);
  return (
    <div className="fixed top-0 left-0 bottom-0 z-[3000] bg-opacity-90 w-screen   bg-black/80 shadow-lg  flex  p-12 mx-auto">
      <div className=" mx-auto bg-slate-200 my-auto rounded-xl px-7 py-10 md:px-12 lg:px-16  flex flex-col items-center">
        <div className="flex justify-between gap-24 lg:gap-[165px] md:gap-20 pb-7">
          <h1 className="text-2xl md:text-[28px] lg:text-3xl text-center font-semibold ">
            Sign Up
          </h1>
          <button onClick={() => onClose()} className="">
            <CgCloseR className="text-[20px] " />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 lg:p-3 lg:w-[300px] rounded-xl outline-none"
            id="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            className="border p-2 lg:p-3 rounded-lg outline-none"
            id="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <input
            className="border p-2 lg:p-3 rounded-lg outline-none"
            id="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="cursor-pointer hover:opacity-90 disabled:opacity-80  bg-slate-900 text-white p-2 lg:p-3 text-sm lg:text-[16px] rounded-xl   uppercase"
          >
            {loading ?  <Spinner className="w-6 h-6 mt-0 mb-0 mx-auto " /> : 'sign up'}
          </button>
          <OAuth onClose={onClose} />
        </form>
        <div className="flex gap-2 mt-5 text-[12px] lg:text-[16px]">
          <p>Have an account?</p>
          <span onClick={() => swapModal()} className="text-blue-700 cursor-pointer">
            Sign in
          </span>
        </div>
        {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
      </div>
    </div>
  );
};

export default SignUp;
