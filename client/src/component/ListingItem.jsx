import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ListingItem = ({ listing }) => {
    return (
      <div className='flex items-center justify-center '>
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] ">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          src={listing.imageUrls[0]}
          alt="listing cover"
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700 ">
            {listing.name}
          </p>
          <div className="flex gap-1 items-center ">
            {' '}
            <FaMapMarkerAlt className="text-green-700 w-4 h-[13px]" />
            <p className="truncate text-sm w-full text-gray-600">
              {listing.address}
            </p>
          </div>
          <p className="font-sans text-sm w-full text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
         
            {listing.priceUponRequest
    ? 'Price Upon Request'
    : listing.offer
    ? `$${listing.discountPrice.toLocaleString('en-US')}`
    : `$${listing.regularPrice.toLocaleString('en-US')}`}
  {listing.type === 'rent' && ` / ${listing.rentDuration}`}
                  </p>
                  <div className='text-slate-700 flex items-center gap-4'>
                      <div className="font-bold text-xs">
                      {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : '1 Bed'}
                      </div>

                      <div className='font-bold text-xs'>
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

export default ListingItem;
