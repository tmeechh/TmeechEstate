import { StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Hooks for accessing the Redux store and dispatching actions
import { updateUserSuccess } from '../redux/user/userSlice'; 

const SaveButton = ({ listingId, isSaved, onSaveStatusChange, onSignIn }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
    const { currentUser } = useSelector((state) => state.user);

  const handleClick = async () => {
    if (!currentUser) {
      // If the user is not logged in, trigger the sign-in modal
      if (onSignIn) {
        onSignIn();
      }
      return; // Exit the function to prevent further actions
    }

    setLoading(true);
    try {
      const method = isSaved ? 'DELETE' : 'POST';
      // console.log(
      //   `Sending ${method} request to /api/user/${
      //     isSaved ? 'unsave-listing' : 'save-listing'
      //   }/${listingId}`
      // );
  
      const response = await fetch(
        `/api/user/${isSaved ? 'unsave-listing' : 'save-listing'}/${listingId}`,
        {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        throw new Error('Failed to save/unsave listing');
      }
  
      // Now we define `data` after confirming the response is ok
      const data = await response.json();
      console.log('Response data:', data);
  
      // Assuming `data` contains the updated user object or saved listings array
      const updatedSavedListings = isSaved
        ? currentUser.savedListings.filter((id) => id !== listingId)
        : [...currentUser.savedListings, listingId];
  
      const updatedUser = {
        ...currentUser,
        savedListings: updatedSavedListings,
      };
  
      // Dispatch the updated user to the store
      dispatch(updateUserSuccess(updatedUser));
  
      // Trigger the onSaveStatusChange callback
      if (onSaveStatusChange) {
        onSaveStatusChange(!isSaved);
      }
    } catch (error) {
      console.error('Error saving/unsaving listing:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex uppercase text-[12px] font-josefin gap-2 font-[400] items-center"
    >
      <StarIcon
        className={`w-4 ${isSaved ? 'text-amber-700' : 'text-gray-400'}`}
      />
      {/* {loading ? 'Processing...' : isSaved ? 'saved' : 'Save'} */}
    </button>
  );
};

export default SaveButton;
