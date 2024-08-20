import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import Spinner from '../Spinner';


const OAuth = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleGoogleClick = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      onClose();
      navigate('/');
      toast.success('Welcome Back');
    } catch (error) {
      toast.error('Could not sign in with google'), error;
    } finally {
      setIsLoading(false);
    }
  };

  const btnText = isLoading ? <Spinner className="w-6 h-6 border-white mt-0 mb-0 mx-auto " />  : ' Continue with google';





  // const handleFacebookLogin = () => {
  //   window.open('/api/auth/facebook', '_self');
  // };


  return (
    <>
      <button
        disabled={isLoading}
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white text-sm lg:text-[16px] p-2 lg:p-3 rounded-xl uppercase hover:opacity-95"
      >
        {btnText}
      </button>
      {/* <button
        onClick={handleFacebookLogin}
        className="bg-[#4267B2] text-white p-2 lg:p-3 text-sm lg:text-[16px] rounded-xl uppercase w-full text-center"
      >
        Continue with Facebook
      </button> */}
    </>
  );
};

export default OAuth;
