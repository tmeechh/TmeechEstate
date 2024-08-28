import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SaveButton from './SaveButton.jsx';

const SaveItem = ({ listing }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const res = await fetch(`/api/user/check-saved/${listing._id}`);
        const data = await res.json();
        setIsSaved(data.isSaved);
      } catch (error) {
        console.error('Failed to fetch saved status:', error);
      }
    };
    checkSavedStatus();
  }, [listing._id]);

  const handleSaveStatusChange = (newStatus) => {
    setIsSaved(newStatus);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-md hover:shadow-xl mb-6 transition-shadow overflow-hidden  w-[370px]">
        <Link to={`/listing/${listing._id}`}>
          <img
            className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
            src={listing.imageUrls[0]}
            alt="listing cover"
          />

          <div className="p-3 flex flex-col gap-2 w-full">
            <p className="text-[18px] text-wrap w-fit  h-[90px]  text-gray-600">
              {listing.address}
            </p>

            <p className="text-[#333333] mt-2 font-semibold">
              {listing.priceUponRequest
                ? 'Price Upon Request'
                : listing.offer
                ? `$${listing.discountPrice.toLocaleString('en-US')}`
                : `$${listing.regularPrice.toLocaleString('en-US')}`}
              {listing.type === 'rent' && ` / ${listing.rentDuration}`}
            </p>
            <div className="text-slate-600 flex items-center gap-4">
              <div className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}
              </div>

              <div className="font-bold text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : '1 Bath'}
              </div>
            </div>
            <div className="flex justify-between  items-center">
              <p className="text-sm font-sans pt-2 text-slate-600">
                Marketed By TmmechEstate
              </p>
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

export default SaveItem;
