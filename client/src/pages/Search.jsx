import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import ListingItem from '../component/ListingItem';

import {
  MagnifyingGlassIcon as FaSearch,
  ArrowLongRightIcon,
} from '@heroicons/react/24/solid';

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Extract URL parameters
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true',
        furnished: furnishedFromUrl === 'true',
        offer: offerFromUrl === 'true',
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }
  }, [location.search]);

  // Function to fetch listings based on sidebardata
  const fetchListing = async () => {
    setLoadingSearch(true);
    setLoading(true);
    setShowMore(false);
    const searchQuery = new URLSearchParams(sidebardata).toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length > 8) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    setListings(data);
    setLoadingSearch(false);
    setLoading(false);
  };

  useEffect(() => {
    // Fetch listings only if filters are set or search term is changed via form submission
    if (
      Object.values(sidebardata).some(
        (value) => value !== '' && value !== false
      )
    ) {
      fetchListing();
    }
  }, [
    sidebardata.type,
    sidebardata.parking,
    sidebardata.furnished,
    sidebardata.offer,
    sidebardata.sort,
    sidebardata.order,
  ]);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === 'all' || id === 'rent' || id === 'sale') {
      setSidebardata({ ...sidebardata, type: id });
    }

    if (id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: value });
    }

    if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setSidebardata({
        ...sidebardata,
        [id]: checked || checked === 'true' ? true : false,
      });
    }

    if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebardata({
        ...sidebardata,
        sort: sort || 'createdAt',
        order: order || 'desc',
      });
    }
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchListing();
    const urlParams = new URLSearchParams(sidebardata).toString();
    navigate(`/search?${urlParams}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) { 
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  } 

  return (
    <>
      <div className="flex flex-col">
        <div className="p-7 border-slate-300 border-b">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 sm:flex-row justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex gap-5 flex-wrap items-center">
                  {/* Rent & Sell Buttons */}
                  <button
                    id="all"
                    className={`relative p-2  cursor-pointer link-active-effect ${
                      sidebardata.type === 'all' ? 'active' : 'bg-transparent '
                    }`}
                    onClick={() =>
                      setSidebardata({ ...sidebardata, type: 'all' })
                    }
                  >
                    <p className="font-sans text-[15px]">Rent & Sell</p>
                  </button>

                  <button
                    id="rent"
                    className={`relative p-2  cursor-pointer link-active-effect ${
                      sidebardata.type === 'rent' ? 'active' : 'bg-transparent'
                    }`}
                    onClick={() =>
                      setSidebardata({ ...sidebardata, type: 'rent' })
                    }
                  >
                    <p className="font-sans text-[15px]">Rent</p>
                  </button>

                  <button
                    id="sale"
                    className={`relative p-2  cursor-pointer link-active-effect ${
                      sidebardata.type === 'sale' ? 'active' : 'bg-transparent'
                    }`}
                    onClick={() =>
                      setSidebardata({ ...sidebardata, type: 'sale' })
                    }
                  >
                    <p className="font-sans text-[15px]">Sale</p>
                  </button>

                  {/* Offer Button */}
                  <button
                    id="offer"
                    className={`relative p-2  cursor-pointer link-active-effect ${
                      sidebardata.offer ? 'active ' : 'bg-transparent'
                    }`}
                    onClick={() =>
                      setSidebardata({
                        ...sidebardata,
                        offer: !sidebardata.offer,
                      })
                    }
                  >
                    <p className="font-sans text-[15px]">Offer</p>
                  </button>
                </div>
                <div>
                  <h1 className="text-xl mb-3">Amenities</h1>
                  <div className="flex gap-5 flex-wrap items-center">
                    {/* Amenities Buttons */}
                    <button
                      id="parking"
                      className={`relative p-2  cursor-pointer link-active-effect ${
                        sidebardata.parking ? '  active ' : 'bg-transparent'
                      }`}
                      onClick={() =>
                        setSidebardata({
                          ...sidebardata,
                          parking: !sidebardata.parking,
                        })
                      }
                    >
                      <p className="font-sans text-[15px]">Parking</p>
                    </button>

                    <button
                      id="furnished"
                      className={`relative p-2  cursor-pointer link-active-effect ${
                        sidebardata.furnished ? 'active' : 'bg-transparent'
                      }`}
                      onClick={() =>
                        setSidebardata({
                          ...sidebardata,
                          furnished: !sidebardata.furnished,
                        })
                      }
                    >
                      <p className="font-sans text-[15px]">Furnished</p>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="font-[700]">Sort: </label>
                <div className="relative">
                  <select
                    className="border rounded-lg p-3 pr-8 outline-none appearance-none cursor-pointer"
                    id="sort_order"
                    onChange={handleChange}
                    defaultValue={'createdAt_desc'}
                  >
                    <option value="createdAt_desc">Exclusive(Default)</option>
                    <option value="createdAt_desc">Latest</option>
                    <option value="createdAt_asc">Oldest</option>
                    <option value="regularPrice_desc">Price high to low</option>
                    <option value="regularPrice_asc">Price low to high</option>
                  </select>
                  <span className="absolute text-[0.7rem] right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-800">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center border-slate-600 border-b sm:w-[40%] lg:w-[30%] gap-2">
              <FaSearch className="w-6 h-6 text-gray-600 cursor-pointer" />
              <input
                type="text"
                id="searchTerm"
                className="outline-none flex-1"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="relative overflow-hidden p-1 transition-transform duration-300 ease-in-out hover:translate-x-3 hover:scale-110"
              >
                <ArrowLongRightIcon className="text-slate-600 w-4 md:w-7 h-8" />
              </button>
            </div>
          </form>
        </div>
        {/* RIGHT */}
        <div className=" ">
          <h1 className="text-2xl flex items-center font-semibold  border-slate-300 p-3 text-slate-900 mt-5">
            Search Results:
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3   2xl:grid-cols-5 gap-4 p-4">
            {!loading && listings.length === 0 && (
              <p className="text-xl text-slate-700">No listing found!</p>
            )}
            {loading && (
              <div className="flex justify-center items-center col-span-3 xl:col-span-4">
                <Spinner className="mx-auto" />
              </div>
            )}
            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}

           
          </div>
          {!loading && showMore && (
              <button
                onClick={onShowMoreClick}
                className=" text-green-700 hover:underline p-7 text-center w-full"
              >
                Show More
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default Search;
