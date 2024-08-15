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

            {/* <div className="text-slate-700 flex flex-col items-start gap-4"> */}
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
            {/* </div> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MoreSearch;
