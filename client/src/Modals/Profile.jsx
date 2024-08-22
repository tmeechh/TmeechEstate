import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
 
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../Spinner';
import { toast } from 'sonner';

import {
  XMarkIcon,
} from '@heroicons/react/24/solid';

//firebase image storage
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('images/.*')

const Profile = ({ onClose }) => {
  const allowedUserIds = import.meta.env.VITE_ALLOWED_USER_IDS
  ? import.meta.env.VITE_ALLOWED_USER_IDS.split(',')
  : [];

  const fileRef = useRef(null);
  const { currentUser, loading} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  // const [showListingError, setShowListingError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  // const [loadingListing, setLoadingListing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error('Upload error:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleCombinedClick = () => {
    onClose();
    handleDeleteUser();
  };
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast.success('Profile updated successfully');
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      onClose();
      navigate('/');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
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
    <div  onClick={onClose} className=" fixed top-0 left-0 bottom-0 z-[3000] bg-opacity-90 w-screen   bg-black/80 shadow-lg  flex  lg:p-12 mx-auto">
      <div onClick={(e) => e.stopPropagation()}  className=" mx-auto overflow-y-auto lg:h-[70vh] h-[100vh] overflow-hidden bg-white my-auto w-full   lg:w-[40vw]">
        <div className='lg:w-[90%] mx-auto p-12   flex flex-col items-center'>
        <div className="flex justify-between  w-full  pb-7">
          <h1 className="text-xl md:text-2xl text-center font-semibold whitespace-nowrap text-[#333333]">
            Profile
          </h1>
          <button onClick={onClose} className="">
           <XMarkIcon className='w-6 h-6'/>
          </button>
        </div> 
        <form onSubmit={handleSubmit} className="flex w-full gap-6 flex-col ">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            className="rounded-full h-12 w-12 object-cover cursor-pointer self-center "
            src={formData.avatar || currentUser.avatar}
            alt="profile"
          />

          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700 text-[10px]">Error image upload(max 2mb)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700 text-[10px]">
                Image Successfully uploaded
              </span>
            ) : (
              ''
            )}
          </p>

          <input
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            className="border-b border-[#333333] bg-transparent   outline-none"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            className="border-b border-[#333333] bg-transparent  w-full  outline-none"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
            className="border-b border-[#333333] bg-transparent w-full outline-none"
          />
          <button
            disabled={loading.updateUser}
            className="bg-[#081d57] text-white  p-3 uppercase hover:opacity-85 disabled:opacity-80"
          >
            {loading.updateUser ? (
              <Spinner className="w-6 h-6 mt-0 mb-0 border-white mx-auto " />
            ) : (
              'update'
            )}
            </button>
            {error && <p className="text-red-600 text-center">{error}</p>}
            {allowedUserIds.includes(currentUser._id) && (
              <Link
              onClick={onClose}
                className="bg-green-700 text-white p-3 r uppercase text-center hover:opacity-85"
                to={'/create-listing'}
              >
                Create Listing
              </Link>
            )}
        </form>
        <div className=" flex justify-between w-full mt-5">
            <span
             onClick={handleCombinedClick}
            className="text-red-700 cursor-pointer"
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            Sign out
          </span>
        </div>
          {allowedUserIds.includes(currentUser._id) && (
            <div  onClick={onClose} className="my-12 flex items-center text-center justify-center text-lg">
              <Link
               
                to="/your-listings"
                className=" text-[14px] lg:text-[16px] py-1 px-2 bg-[#081d57] text-white  "
              >
                View Your Listings
              </Link>
            </div>
          )}
          </div>
      </div>
    </div>
  );
};

export default Profile;
