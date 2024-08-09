import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import { FaShare } from 'react-icons/fa';
import Contact from '../component/Contact.jsx';
import { PhotoIcon } from '@heroicons/react/24/solid';
import MoreSearch from '../component/MoreSearch.jsx';

const Listing = ({ handleShowPhotos }) => {
  SwiperCore.use([Navigation, Pagination]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [isOpen, setIsOpen] = useState({
    details: false,
    utilities: false,
    features: false,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [listings, setListings] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const formattedPriceDifference =
    listing && listing.regularPrice && listing.discountPrice !== undefined
      ? (listing.regularPrice - listing.discountPrice).toLocaleString('en-US')
      : 'N/A';

  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId} `);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  useEffect(() => {
    const fetchListings = async () => {
      setLoadingMore(true);
      try {
        const res = await fetch('/api/listing/getmoresearch');
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoadingMore(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <main>
      {loading && <Spinner />}
      {error && (
        <div className="text-center my-7">
          <p className="mb-4  text-2xl">Something went wrong!!</p>
          <Link
            className="text-blue-500 text-center hover:underline text-xl"
            to="/"
          >
            Return to Homepage
          </Link>
        </div>
      )}
      {listing && !loading && !error && (
        <div>
          <div className="bg-slate-600 w-full text-center  text-white text-[8px] sm:text-[10px] ">
            Tmeech<span className="text-slate-500">Estate</span>® Listing
          </div>
          <div className="relative h-[92vh] w-full mx-auto rounded-b-lg">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${listing.imageUrls[0]})`,
                filter: 'brightness(80%)', // Adjust brightness as needed
                backgroundAttachment: 'fixed',
              }}
            ></div>
            <div className="relative text-white mx-12 hidden lg:flex lg:gap-6 lg:flex-col-reverse xl:flex-row justify-between xl:items-center pt-[29rem] xl:pt-[26rem] 1xl:pt-[38rem] animate-fade-in">
              <p className="text-3xl text-wrap w-[40%]">{listing.address}</p>

              <button
                onClick={() => handleShowPhotos(listing.imageUrls)}
                className="flex cursor-pointer gap-2 items-center bg-white p-2 text-gray-600 rounded border border-amber-700 w-fit"
              >
                <PhotoIcon className="w-5" />
                <p className="text-[17px]"> {listing.imageUrls.length}</p>
                <p className="uppercase">
                  {listing.imageUrls.length === 1 ? 'photo' : 'photos'}
                </p>
              </button>
            </div>
          </div>

          <div className="fixed  top-[13%] right-[3%] z-10 border rounded-full w-10 sm:w-12 h-10 sm:h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] text-[12px] sm: z-10 rounded-md bg-slate-100 p-1 sm:p-2 ">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-5xl mx-auto p-3 my-7 gap-4">
            <div className="xl:flex flex-row-reverse items-center justify-between mt-12">
              <button
                onClick={() => handleShowPhotos(listing.imageUrls)}
                className="flex cursor-pointer gap-2 text-center items-center bg-white p-2 text-gray-600 rounded border border-amber-700 w-fit lg:w-[90px] mb-3 xl:mb-0"
              >
                <div className="flex items-center gap-1 justify-center w-full">
                  <PhotoIcon className="w-5" />
                  <p className="text-[17px]">{listing.imageUrls.length}</p>
                </div>
              </button>{' '}
              <p className="uppercase lg:hidden">
                {listing.imageUrls.length === 1 ? 'photo' : 'photos'}
              </p>
              <p className="sm:text-2xl text-[22px] font-semibold">
                {listing.address}
              </p>
            </div>

            <div className="flex  font-semibold    flex-wrap gap-6 sm:gap-6 items-center ">
              <div className="font-sans  gap-1 whitespace-nowrap ">
                <p className="text-amber-700 uppercase text-[12px]">Price</p>
                {listing.priceUponRequest
                  ? 'Price Upon Request'
                  : listing.offer
                  ? `$${listing.discountPrice.toLocaleString('en-US')}`
                  : `$${listing.regularPrice.toLocaleString('en-US')}`}
                {listing.type === 'rent' && ` / ${listing.rentDuration}`}
              </div>
              <div className="font-sans  gap-1 whitespace-nowrap ">
                <p className="text-amber-700 uppercase text-[12px]">
                  {' '}
                  {listing.bedrooms > 1 ? ` Bedrooms` : ' Bedroom'}
                </p>
                {listing.bedrooms}
              </div>
              <div className="font-sans gap-1 whitespace-nowrap ">
                <p className="text-amber-700 uppercase text-[12px]">
                  {listing.bathrooms > 1 ? ` Bathrooms` : ' Bathroom'}
                </p>
                {listing.bathrooms}
              </div>
              {listing.squareFootage && (
                <div className="font-sans gap-1 whitespace-nowrap ">
                  <p className="text-amber-700 uppercase text-[12px]">
                    Interior
                  </p>
                  {listing.squareFootage.toLocaleString('en-US')} Sq Ft
                </div>
              )}
              {listing.acre && (
                <div className="font-sans  gap-1 whitespace-nowrap ">
                  <p className="text-amber-700 uppercase text-[12px]">
                    Exterior
                  </p>
                  {listing.acre} Acre(s)
                </div>
              )}
            </div>

            <div className=" flex gap-4 mt-4">
              <p className="bg-red-900 cursor-text w-full max-w-[200px] text-white text-center p-1 rounded-md text-[12px] sm:text-[16px] flex items-center justify-center">
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {!listing.priceUponRequest && listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-2 rounded-md cursor-text text-[12px] sm:text-[16px]">
                  {`$${formattedPriceDifference}`} Discount
                </p>
              )}
            </div>
            <p className="text-[22px] font-[500] mt-5 sm:mt-10 text">
              {listing.name}
            </p>
            <div>
              <p
                className={`font-sans text-slate-800 tracking-wide leading-relaxed ${
                  isExpanded ? '' : 'line-clamp-12'
                }`}
              >
                <span className="font-josefin font-semibold text-black">
                  Description -{' '}
                </span>
                {listing.description}
              </p>
              {listing.description &&
                listing.description.split(' ').length > 100 && ( // Adjust this length as needed
                  <button
                    className="mt-2 text-slate-600 underline font-[1000] "
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                )}
            </div>

            {/* Table */}
            <h1 className="text-2xl lg:text-4xl text-center mt-32 mb-4">
              Amenities & Lot Features
            </h1>
            <div className="w-full flex   items-center justify-center">
              <table className=" w-full ml-[6rem]   bg-white mb-6 hidden lg:table ">
                <thead className=" text-amber-700 text-[10px] sm:text-[16px]">
                  <tr>
                    <th className="w-1/3 text-left py-3 px-4  font-bold ">
                      Listing Details
                    </th>
                    <th className="w-1/3 text-left py-3 px-4  font-bold whitespace-nowrap">
                      Utilities & Building
                    </th>
                    <th className="w-1/3 text-left py-3 px-4  font-bold ">
                      Features
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400  whitespace-nowrap">
                        Property Id
                      </h3>
                      <p className="uppercase font-sans text-[14px]">
                        {listing.propertyId}
                      </p>
                    </td>

                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400 ">
                        Lots size unit{' '}
                      </h3>
                      <p className="font-sans text-[14px]">Acre(s)</p>
                    </td>

                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      <>
                        <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400 ">
                          Amenities
                        </h3>
                        <p className="font-sans text-[14px]">
                          {listing.parking ? 'Parking spot, ' : ''}
                          {''}
                          {listing.furnished ? 'Furnished' : ''}
                        </p>
                      </>
                    </td>
                  </tr>

                  <tr className="">
                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400  whitespace-nowrap">
                        Listing Price
                      </h3>
                      <p className="font-sans text-[14px]">
                        {' '}
                        ${' '}
                        {listing.priceUponRequest
                          ? 'Price Upon Request'
                          : listing.offer
                          ? listing.discountPrice.toLocaleString('en-US')
                          : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' &&
                          ` / ${listing.rentDuration}`}
                      </p>
                    </td>

                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      {listing.acre && (
                        <>
                          <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400 ">
                            Lots size{' '}
                          </h3>
                          <p className="font-sans text-[14px]">
                            {listing.acre}
                          </p>
                        </>
                      )}
                    </td>

                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400 ">
                        Bathrooms{' '}
                      </h3>
                      <p className="font-sans text-[14px]">
                        {listing.bathrooms}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      <h3 className="uppercase  font-josefin text-[10px] sm:text-[16px] text-slate-400 ">
                        Marketed by{' '}
                      </h3>
                      <p className="font-sans text-[14px]">Tmeech Estate</p>
                    </td>
                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      {listing.squareFootage && (
                        <>
                          <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400 ">
                            TOTAL SQFT{' '}
                          </h3>
                          <p className="font-sans text-[14px]">
                            {listing.squareFootage}{' '}
                          </p>
                        </>
                      )}
                    </td>
                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400 ">
                        Bedrooms{' '}
                      </h3>
                      <p className="font-sans text-[14px]">
                        {listing.bedrooms}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400 ">
                        Status{' '}
                      </h3>
                      <p className="font-sans text-[14px]">{listing.status}</p>
                    </td>
                    <td className="w-1/3 text-left py-3 px-4 text-[10px] sm:text-[16px]">
                      {listing.yearBuilt && (
                        <>
                          <h3 className="uppercase font-josefin text-[10px] sm:text-[16px] text-slate-400 ">
                            Year Built
                          </h3>
                          <p className="font-sans text-[14px]">
                            {listing.yearBuilt}
                          </p>
                        </>
                      )}
                    </td>
                    <td className="w-1/3 text-left py-3 px-4"></td>
                  </tr>
                </tbody>
              </table>

              {/* small screen table */}
              <div className="block w-full  lg:hidden">
                <div className="border-b">
                  <button
                    onClick={() => toggleSection('details')}
                    className="w-full text-left py-4 px-4 flex justify-between items-center"
                  >
                    <span className="font-bold text-amber-700 text-[16px]">
                      Listing Details
                    </span>
                    <span className="text-amber-700 text-[24px]">
                      {isOpen.details ? '-' : '+'}
                    </span>
                  </button>
                  {isOpen.details && (
                    <div className="px-4 py-2 gap-4 flex flex-col">
                      <p className="gap-2">
                        <div className="uppercase text-[14px] text-slate-400 font-semibold">
                          Listing Price{' '}
                        </div>
                        ${' '}
                        {listing.priceUponRequest
                          ? 'Price Upon Request'
                          : listing.offer
                          ? listing.discountPrice.toLocaleString('en-US')
                          : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' &&
                          ` / ${listing.rentDuration}`}
                      </p>

                      <p className="gap-2">
                        <div className="uppercase text-[14px] text-slate-400 font-semibold">
                          Marketed by
                        </div>
                        Tmeech Estate
                      </p>
                      <p className="gap-2">
                        <div className="uppercase text-[14px] text-slate-400 font-semibold">
                          Status:{' '}
                        </div>
                        {listing.status}
                      </p>
                    </div>
                  )}
                </div>
                <div className="border-b">
                  <button
                    onClick={() => toggleSection('utilities')}
                    className="w-full text-left py-4 px-4 flex justify-between items-center"
                  >
                    <span className="font-bold text-amber-700 text-[16px]">
                      Utilities & Building
                    </span>
                    <span className="text-amber-700 text-[24px]">
                      {isOpen.utilities ? '-' : '+'}
                    </span>
                  </button>
                  {isOpen.utilities && (
                    <div className="px-4 py-2  flex flex-col gap-4">
                      {listing.squareFootage && (
                        <p className="gap-2">
                          <div className="uppercase text-[14px] text-slate-400 font-semibold">
                            Total SqFt
                          </div>
                          {listing.squareFootage}
                        </p>
                      )}

                      {listing.yearBuilt && (
                        <p className="gap-2">
                          <div className="uppercase text-[14px] text-slate-400 font-semibold">
                            Year Built{' '}
                          </div>
                          {listing.yearBuilt}
                        </p>
                      )}
                      <p className="gap-2">
                        <div className="uppercase text-[14px] text-slate-400 font-semibold">
                          Lot Size Unit
                        </div>
                        Acre(s)
                      </p>

                      {listing.acre && (
                        <p className="gap-2">
                          <div className="uppercase text-[14px] text-slate-400 font-semibold">
                            Lot Size
                          </div>
                          {listing.acre}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="border-b">
                  <button
                    onClick={() => toggleSection('features')}
                    className="w-full text-left py-4 px-4 flex justify-between items-center"
                  >
                    <span className="font-bold text-amber-700 text-[16px]">
                      Features
                    </span>
                    <span className="text-amber-700 text-[24px]">
                      {isOpen.features ? '-' : '+'}
                    </span>
                  </button>
                  {isOpen.features && (
                    <div className="px-4 py-2  flex flex-col gap-4">
                      <p className="gap-2">
                        <div className="uppercase text-[14px] text-slate-400 font-semibold">
                          Amenities{' '}
                        </div>
                        {listing.parking ? 'Parking spot' : ''},{' '}
                        {listing.furnished ? 'Furnished' : ''}
                      </p>

                      <p className="gap-2">
                        <div className="uppercase text-[14px] text-slate-400 font-semibold">
                          Bedrooms
                        </div>
                        {listing.bedrooms}
                      </p>
                      <p className="gap-2">
                        <div className="uppercase text-[14px] text-slate-400 font-semibold">
                          Bathrooms
                        </div>
                        {listing.bathrooms}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="text-white bg-slate-900 rounded-lg uppercase p-2 hover:opacity-75"
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>

          <div className="flex flex-col pb-12 pt-[5rem]  bg-slate-600 items-center mt-20 text-white ">
            {loadingMore ? (
              ''
            ) : (
              <>
                <h1 className="  text-2xl lg:text-4xl">
                  Continue Your Search{' '}
                </h1>
                <div className="h-[4rem] mb-[2rem] border-r  border-amber-700"></div>
                <div className="hidden xl:block w-full mx-72 mb-12">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    className="swiper-container"
                  >
                    {listings.map((listing) => (
                      <SwiperSlide key={listing._id}>
                        <MoreSearch listing={listing} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="hidden lg:block xl:hidden w-full">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    navigation
                    pagination={{ clickable: true }}
                    className="swiper-container"
                  >
                    {listings.map((listing) => (
                      <SwiperSlide key={listing._id}>
                        <MoreSearch listing={listing} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="flex flex-col items-center lg:hidden">
                  {listings.slice(0, showMore ? 9 : 3).map((listing) => (
                    <MoreSearch key={listing._id} listing={listing} />
                  ))}
                  {!showMore && listings.length > 3 && (
                    <button
                      onClick={() => setShowMore(true)}
                      className="mt-4 px-4 py-2 underline text-white rounded"
                    >
                      Show More
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
