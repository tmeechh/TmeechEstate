import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import ListingItem from '../component/ListingItem';
import CustomSelect from '../component/CustomSelect';
// import { debounce } from 'lodash';

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
    sort: 'random',
    order: '',
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const options = [
    { value: 'random', label: 'Exclusive(Default)' },
    { value: 'regularPrice_desc', label: 'Price high to low' },
    { value: 'regularPrice_asc', label: 'Price low to high' },
    { value: 'createdAt_desc', label: 'Latest' },
    { value: 'createdAt_asc', label: 'Oldest' },
  ];

  const handleSortChange = (value) => {
    const [sort, order] = value.split('_');
    setSidebardata((prev) => ({
      ...prev,
      sort: sort || 'random',
      order: order || '',
    }));
  };

  useEffect(() => {
    // Extract URL parameters
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const typeFromUrl = urlParams.get('type') || 'all'; 
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
  
    setSidebardata({
      searchTerm: searchTermFromUrl,
      type: typeFromUrl,
      parking: parkingFromUrl === 'true',
      furnished: furnishedFromUrl === 'true',
      offer: offerFromUrl === 'true',
      sort: sortFromUrl || 'random',
      order: orderFromUrl || '',
    });
  
    // Trigger fetchListing only if coming from the home page with a search term
    if (searchTermFromUrl) {
      fetchListing(searchTermFromUrl);
    }
  }, [location.search]);


  

  // Function to fetch listings based on sidebardata

  const fetchListing = async (searchTermOverride) => {
    setLoadingSearch(true);
    setLoading(true);
    setShowMore(false);
  
    const queryParams = {
      searchTerm: searchTermOverride || sidebardata.searchTerm,
      type: sidebardata.type !== 'all' ? sidebardata.type : 'all',
      offer: sidebardata.offer ? sidebardata.offer.toString() : undefined,
      furnished: sidebardata.furnished ? sidebardata.furnished.toString() : undefined,
      parking: sidebardata.parking ? sidebardata.parking.toString() : undefined,
      sort: sidebardata.sort,
      order: sidebardata.order,
      limit: 9,
      startIndex: 0,
    };
  
    const searchQuery = new URLSearchParams(queryParams).toString();
    
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
      const [sort, order] = value.includes('_')
        ? value.split('_')
        : [value, ''];
      setSidebardata({
        ...sidebardata,
        sort: sort || 'random',
        order: order || '',
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
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 60; // Adjust this based on your navbar height
      const scrollPosition = window.scrollY;

      if (scrollPosition >= navbarHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="p-7 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div
              className={`flex flex-col gap-10 xl:flex-row-reverse justify-between bg-white w-[100%] py-[30px] p-[1rem] left-0 right-0 ${
                isSticky ? 'fixed-bg ' : 'sticky-active '
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-5 flex-wrap items-center">
                  {/* Rent & Sell Buttons */}
                  <button
                    id="all"
                    className={`border p-2 cursor-pointer ${
                      sidebardata.type === 'all'
                        ? 'bg-[#081d57] text-white'
                        : 'bg-transparent'
                    }`}
                    onClick={() =>
                      setSidebardata({
                        ...sidebardata,
                        type: 'all',
                        sort: 'random',
                        order: '',
                      })
                    } // Reset to default
                  >
                    <p className="font-sans text-[15px]">Rent & Sell</p>
                  </button>

                  <div className="">
                    <button
                      id="rent"
                      className={`border px-3 py-1  cursor-pointer  ${
                        sidebardata.type === 'rent'
                          ? 'bg-[#081d57] text-white'
                          : 'bg-transparent'
                      }`}
                      onClick={() =>
                        setSidebardata({ ...sidebardata, type: 'rent' })
                      }
                    >
                      <p className="font-sans text-[15px]">Rent</p>
                    </button>

                    <button
                      id="sale"
                      className={`border px-3 py-1  cursor-pointer ${
                        sidebardata.type === 'sale'
                          ? 'bg-[#081d57] text-white'
                          : 'bg-transparent'
                      }`}
                      onClick={() =>
                        setSidebardata({ ...sidebardata, type: 'sale' })
                      }
                    >
                      <p className="font-sans text-[15px]">Sale</p>
                    </button>
                  </div>
                  {/* Offer Button */}
                  <button
                    id="offer"
                    className={`border px-3 py-1   cursor-pointer ${
                      sidebardata.offer
                        ? 'bg-[#081d57] text-white '
                        : 'bg-transparent'
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

                  {/* Amenities Buttons */}
                  <button
                    id="parking"
                    className={`border px-3 py-1   cursor-pointer ${
                      sidebardata.parking
                        ? ' bg-[#081d57]  text-white '
                        : 'bg-transparent'
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
                    className={`border px-3 py-1   cursor-pointer ${
                      sidebardata.furnished
                        ? 'bg-[#081d57]  text-white'
                        : 'bg-transparent'
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

              <div className="flex flex-col gap-5 lg:gap-9">
                <div className="flex items-center border-b border-slate-500 xl:w-[160%]">
                  <FaSearch className="w-6 h-6 text-gray-500 cursor-pointer" />

                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      id="searchTerm"
                      className="outline-none w-full pl-2 pr-10"
                      value={sidebardata.searchTerm}
                      onChange={handleChange}
                      placeholder="Country, City, or Address"
                    />

                    {sidebardata.searchTerm && (
                      <button
                        type="submit"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 w-10 h-10 flex items-center justify-center"
                      >
                        <ArrowLongRightIcon className="text-slate-500 w-8 h-8" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-5 lg:gap-9">
                    <div className="flex items-center gap-2">
                      <label className="font-[700] text-[#333333]">Sort:</label>
                      <CustomSelect
                        options={options}
                        selectedValue={
                          sidebardata.sort + '_' + sidebardata.order
                        }
                        onChange={handleSortChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Bottom */}
        <div className="xl:mt-28 mt-44">
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
            <div className="p-7 text-center w-full">
              <button
                onClick={onShowMoreClick}
                className=" text-green-700 hover:underline "
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
