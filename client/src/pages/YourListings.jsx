import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import Spinner from '../Spinner';

const YourListings = () => {
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux store

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const res = await fetch(
          `/api/user/listings/${currentUser._id}?sort=createdAt&order=desc`
        );

        const data = await res.json();
        if (data.success === false) {
          setError(true);
        } else {
          setUserListings(data);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, [currentUser._id]);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      {error && (
        <div className="text-center my-7">
          <p className="mb-4 text-2xl">Something went wrong!!</p>
        </div>
      )}
      {!loading && !error && userListings.length === 0 && (
        <div className="text-center my-7">
          <p className="text-2xl">No listings found</p>
        </div>
      )}
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4 mx-24 mb-12">
          <h1 className="text-center mt-7 text-3xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex justify-between items-center border border-[#CBD5E1] rounded-lg p-3 gap-3"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  className="cursor-pointer h-16 w-16 object-contain rounded-[6%]"
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                />
              </Link>
              <Link
                className="flex-1 text-slate-700 font-semibold hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourListings;
