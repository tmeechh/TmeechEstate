import  { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import SaveItem from '../component/SaveItem';

const SavedListings = () => {
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/'); // Redirect to home page if not signed in
      return;
    }


    const fetchSavedListings = async () => {
      try {
        const response = await fetch(`/api/user/saved-listings`, {
          credentials: 'include',
        });
        const data = await response.json();
        console.log('Fetched Saved Listings:', data); // Debug log

        if (response.ok) {
          setSavedListings(data);
        } else {
          setError(data.message || 'Failed to fetch saved listings');
        }
      } catch (error) {
        setError('An error occurred while fetching saved listings');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedListings();
  }, []);

  if (loading)
    return (
      <p>
        <Spinner />
      </p>
    );
  if (error)
    return (
      <div className="p-28 flex flex-col gap-2  items-center justify-center">
        {' '}
        <p className="flex gap-2  items-center justify-center text-2xl">
          <ExclamationCircleIcon className="w-9" /> Something went wrong !{' '}
        </p>{' '}
        <Link
          to="/"
          className="font-josefin hover:no-underline text-sm underline text-[#0c2875]"
        >
          Return to home page
        </Link>
      </div>
    );
  
    const saleListings = savedListings.filter(listing => listing.type === 'sale');
    const rentListings = savedListings.filter(listing => listing.type === 'rent');

  return (
    <div>
      <div className="flex flex-col xl:flex-row xl:px-16 px-10 py-10 gap-40">
        <div className="flex flex-col gap-10 col-span-1">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl">My Portfolio </h1>
            <h3 className="  ">{currentUser.username}</h3>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl">Saved Listings </h1>
            {saleListings.length > 0 && (
              <h3 className="">+{saleListings.length} Sale Listings</h3>
            )}
            {rentListings.length > 0 && (
              <h3 className="">+{rentListings.length} Rental Listings</h3>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
          {!loading && savedListings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <div className="flex justify-center items-center col-span-3 xl:col-span-4">
              <Spinner className="mx-auto" />
            </div>
          )}
          {!loading &&
            savedListings &&
            savedListings.map((listing) => (
              <SaveItem key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SavedListings;
