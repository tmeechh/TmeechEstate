import React from 'react';

const Search = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* LEFT */}
        <div className=" p-7 border-slate-500 border-b-2 md:border-r-2 md:min-h-screen">
          <form className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-[700]">
                Search Term:{' '}
              </label>
              <input
                type="text"
                placeholder="Search..."
                className=" outline-none border rounded-lg p-[10px] w-full"
              />
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-[700]">Type: </label>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="all" className="custom-checkbox" />
                <span>Rent & Sell</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="rent" className="custom-checkbox" />
                <span>Rent</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="sale" className="custom-checkbox" />
                <span>Sale</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="offer" className="custom-checkbox" />
                <span>Offer</span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-[700]">Amenities: </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="custom-checkbox"
                />
                <span>Parking</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="custom-checkbox"
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
                >
                  <option value="">Price high to low</option>
                  <option value="">Price Low to high</option>
                  <option value="">Latest</option>
                  <option value="">Oldest</option>
                </select>
                <span className="absolute text-[0.7rem] right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-800 ">
                  ▼
                </span>
              </div>
                      </div>
                      <button className='bg-slate-900 text-white p-3 rounded-lg hover:opacity-75 uppercase'>Search</button>
          </form>
        </div>
        {/* RIGHT */}
        <div className=" ">
          <h1 className='text-2xl font-semibold border-b p-3 text-slate-900 mt-5'>Search Results:</h1>
        </div>
      </div>
    </>
  );
};

export default Search;
