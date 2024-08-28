import useVisibility from './useVisibility';
import { useEffect, useState } from 'react';
import SaveButton from './SaveButton.jsx';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MoreSearch = ({ listing }) => {
  const { ref, isVisible } = useVisibility({
    threshold: 0.1, // Adjust this value if needed
  });
  const { currentUser } = useSelector((state) => state.user);

  const [isSaved, setIsSaved] = useState(false);


  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!currentUser) {
        // If there's no user signed in, don't fetch the saved status
        return;
      }
  
      try {
        const res = await fetch(`/api/user/check-saved/${listing._id}`);
        const data = await res.json();
        setIsSaved(data.isSaved);
      } catch (error) {
        console.error('Failed to fetch saved status:', error);
      }
    };
  
    checkSavedStatus();
  }, [listing._id, currentUser]); // Also depend on currentUser to refetch when the user signs in or out
  

  const handleSaveStatusChange = (newStatus) => {
    setIsSaved(newStatus);
  };


  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center mb-4 ${
        isVisible ? 'animate-fade-in' : ''
      }`}
    >
      <div className="bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden rounded-lg w-[300px] sm:w-[400px] xl:w-[350px]  ">
        <Link to={`/listing/${listing._id}`}>
          <div>
            <img
              className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
              src={listing.imageUrls[0]}
              alt="listing cover"
            />
            <div className="bg-[#081d57] w-full text-center  text-white text-[8px] sm:text-[10px] ">
              Tmeech<span className="text-slate-500">Estate</span>® Listing
            </div>
          </div>
          <div className="p-3 flex flex-col gap-2 w-full">
            <div className="h-[90px] ">
              <p className="text-lg font-semibold text-[#333333]">
                {listing.address}
              </p>
            </div>

           
              <p className="text-slate-500 mt-2 font-semibold">
                {listing.priceUponRequest
                  ? 'Price Upon Request'
                  : listing.offer
                  ? `$${listing.discountPrice.toLocaleString('en-US')}`
                  : `$${listing.regularPrice.toLocaleString('en-US')}`}
                {listing.type === 'rent' && ` / ${listing.rentDuration}`}
            </p>
            <div className='flex gap-3 '>
              <div className="text-[#333333] mt-2 font-semibold">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}
              </div>

              <div className="text-[#333333] mt-2 font-semibold">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : '1 Bath'}
              </div>
              </div>
              <div className="flex justify-between  items-center">
          <p className="text-sm font-sans pt-2 text-slate-600">Marketed By TmmechEstate</p>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent the click from triggering the Link
            }}
          >
            <SaveButton
              listingId={listing._id}
              isSaved={isSaved}
              onSaveStatusChange={handleSaveStatusChange}
            />
          </button>
        </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MoreSearch;
