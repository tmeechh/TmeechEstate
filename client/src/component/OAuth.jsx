import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
      navigate('/');
      onClose();
    } catch (error) {
      console.log('Could not sign in with google'), error;
    } finally {
      setIsLoading(false);
    }
  };

  const btnText = isLoading ? 'Loading...' : ' Continue with google';

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
    </>
  );
};

export default OAuth;
