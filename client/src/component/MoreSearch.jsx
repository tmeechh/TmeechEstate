import useVisibility from './useVisibility';

import { Link } from 'react-router-dom';

const MoreSearch = ({ listing }) => {
  const { ref, isVisible } = useVisibility({
    threshold: 0.1, // Adjust this value if needed
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center mb-4 ${
        isVisible ? 'animate-fade-in' : ''
      }`}
    >
      {/* <h1 className='text-2xl my-12'>Continue Your Search</h1> */}
      <div className="bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden rounded-lg w-[300px] sm:w-[400px] xl:w-[300px]">
        <Link to={`/listing/${listing._id}`}>
          <div>
            <img
              className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
              src={listing.imageUrls[0]}
              alt="listing cover"
            />
            <div className="bg-slate-600 w-full text-center  text-white text-[8px] sm:text-[10px] ">
              Tmeech<span className="text-slate-500">Estate</span>® Listing
            </div>
          </div>
          <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700 ">
              {listing.address}
            </p>

            <p className="text-slate-500 mt-2 font-semibold">
           
              {listing.priceUponRequest
    ? 'Price Upon Request'
    : listing.offer
    ? `$${listing.discountPrice.toLocaleString('en-US')}`
    : `$${listing.regularPrice.toLocaleString('en-US')}`}
  {listing.type === 'rent' && ` / ${listing.rentDuration}`}
            </p>
            <div className="text-slate-700 flex items-center gap-4">
              <div className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}
              </div>

              <div className="font-bold text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : '1 Bath'}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MoreSearch;
