import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import ListingItem from '../component/ListingItem';

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort_order: 'created_at',
    order: 'desc',
  });
  //   const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings);

  useEffect(() => {
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
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListing = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListing();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* LEFT */}
        <div className=" p-7 border-slate-500 border-b-2 md:border-r-2 md:min-h-screen">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-[700]">
                Search Term:{' '}
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className=" outline-none border rounded-lg p-[10px] w-full"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-[700]">Type: </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="custom-checkbox cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.type === 'all'}
                />
                <span>Rent & Sell</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="custom-checkbox cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="custom-checkbox cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.type === 'sale'}
                />
                <span>Sale</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="custom-checkbox cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span>Offer</span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-[700]">Amenities: </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="custom-checkbox cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="custom-checkbox cursor-pointer"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-[700]">Sort: </label>
              <div className="relative  ">
                <select
                  className="border rounded-lg p-3 pr-8 outline-none appearance-none"
                  id="sort_order"
                  onChange={handleChange}
                  defaultValue={'created_at_desc'}
                >
                  <option value="regularPrice_desc">Price high to low</option>
                  <option value="regularPrice_asc">Price Low to high</option>
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_asc">Oldest</option>
                </select>
                <span className="absolute text-[0.7rem] right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-800 ">
                  ▼
                </span>
              </div>
            </div>
            <button className="bg-slate-900 text-white p-3 rounded-lg hover:opacity-75 uppercase">
              Search
            </button>
          </form>
        </div>
        {/* RIGHT */}
        <div className=" flex-1">
          <h1 className="text-2xl flex items-center font-semibold border-b border-slate-300 p-3 text-slate-900 mt-5">
            Search Results:
          </h1>
          <div className="p-7 flex flex-wrap gap-4">
            {!loading && listings.length === 0 && (
              <p className="text-xl text-slate-700">No listing found!</p>
            )}
            {loading && (
              <div className="flex items-center justify-center flex-1">
                <Spinner />
              </div>
            )}
            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
