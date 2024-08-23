import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import {
  MagnifyingGlassIcon as FaSearch,
  ArrowLongRightIcon,
} from '@heroicons/react/24/solid';
import home from '../assets/home.png';
import meech from '../assets/meech.png';
import sec from '../assets/sec.png';
import ListingItem from '../component/ListingItem';
import Footer from '../component/Footer';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  const navigate = useNavigate('');

  // Handle search submission from home page
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value.trim();
    if (searchTerm) {
      navigate(`/search?searchTerm=${searchTerm}`);
    }
  };

  SwiperCore.use([Autoplay, Pagination]);
  // console.log( saleListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top  bg-[#F5F5F5] bg-[#021a5e]*/}
      <div className="bg-[#081d57]">
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
          <h1 className="font-bold text-3xl text-gray-200 lg:text-6xl">
            Discover your new <span className="text-gray-500 ">ideal</span>{' '}
            <br /> home with simplicity
          </h1>

          <div className="text-gray-400 text-xs sm:text-sm">
            Tmeech Estate is the top choice to find your new ideal home.
            <br />
            Explore a vast selection of properties waiting for you.
          </div>
          <div>
            {/* <form
              className="mt-12"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center border-b border-slate-200 sm:w-[60%]">
                <FaSearch className="w-6 h-6 text-gray-200 cursor-pointer" />

                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    id="searchTerm"
                    className="outline-none w-full pl-2 pr-10 text-white bg-transparent"
                    placeholder="Country, City, or Address"
                  />

                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 w-10 h-10 flex items-center justify-center"
                  >
                    <ArrowLongRightIcon className="text-slate-200 w-8 h-8" />
                  </button>
                </div>
              </div>
            </form> */}

            <Link
              to="/search"
              className="bg-[#021342] font-josefin uppercase text-[10px] lg:text-[13px] rounded-xl flex gap-2 lg:gap-3 w-fit items-center p-2 lg:py-3 lg:px-4 text-white"
            >
             Explore Listings
             {' '}
              <ArrowLongRightIcon className="w-6 lg:w-8 lg:h-7 h-5 lg:mb-[-27px] mb-[-20px]  transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 flex items-center justify-center" />
            </Link>
            {/* <TestComponent/> */}
          </div>
        </div>
        <div></div>
      </div>

      {/* swiper */}
      <Swiper
        className="custom-swiper"
        pagination={{
          clickable: true,
          bulletClass: 'custom-swiper-pagination-bullet',
          bulletActiveClass: 'custom-swiper-pagination-bullet-active',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]})  center no-repeat `,
                  backgroundSize: 'cover',
                  filter: 'brightness(55%)',
                }}
                className="xl:h-[95vh] lg:h-[80vh] md:h-[65vh] h-[60vh]"
              ></div>
              <Link
                className=" fixed gap-6 sm:mx-16 mx-8 flex flex-col items-start top-10 text-white  animate-fade-in"
                to={`/listing/${listing._id}`}
              >
                <div className="xl:text-[48px]  lg:text-[45px] md:text-[35px]">
                  {listing.address.split(' ').slice(-2, -1)}
                </div>
                <div className="flex gap-3 items-center mt-[-20px] xl:mt-[0]">
                  <div className="lg:text-[20px] md:text-[16px] text-[14px]">
                    {listing.address.split(' ').slice(-1)}
                  </div>

                  <span className="inline-block lg:w-2 lg:h-2 w-1 h-1 bg-amber-500 rounded-full"></span>
                  <p className="font-sans  lg:text-[20px] md:text-[16px] text-[14px]">
                    {listing.priceUponRequest
                      ? 'Price Upon Request'
                      : listing.offer
                      ? `$${listing.discountPrice.toLocaleString('en-US')}`
                      : `$${listing.regularPrice.toLocaleString('en-US')}`}
                    {listing.type === 'rent' && ` / ${listing.rentDuration}`}
                  </p>
                </div>
                <div className="gap-3 items-center flex mt-[-20px] lg:text-[16px] md:text-[13px] text-[12px]">
                  <button className="uppercase font-josefin">
                    See details{' '}
                  </button>
                  <ArrowLongRightIcon className="relative overflow-hidden transition-transform duration-300 ease-in-out hover:translate-x-3 hover:scale-110 w-7 h-8" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* about */}
      <div className="mt-12 mb-12">
        <div className="flex flex-col xl:flex-row items-center  max-w-6xl mx-auto p-10 xl:gap-2 gap-12">
          <div className="md:w-[60%] md:ml-[80px] w-full flex flex-col gap-12">
            <h2 className="lg:text-3xl text-2xl w-full md:w-[90%] xl:ml-[0] text-[#333333] font-josefin  lg:ml-[-13rem] md:ml-[-10rem]">
              For those who desire a remarkable home and lifestyle, there is
              only TmeechEstate.
            </h2>
            <div className="flex gap-3 items-center">
              <div className="lg:w-[4rem] w-[8rem]  xl:mb-[6rem] lg:mb-[3.7rem] mb-[4rem] hidden sm:block  border-b  border-amber-700"></div>
              <p className="font-sans flex flex-wrap text-slate-500 xl:w-[61%] lg:w-[80%] w-full text-[14px] lg:text-[16px]">
                Rooted in tradition and committed to advancing the luxury real
                estate market, TmeechEstate provides unparalleled experiences
                through a global network of elite agents.
              </p>
            </div>
          </div>
          <div className="xl:w-[45%] lg:w-[50%]">
            <img
              src={home}
              alt="img"
              className="md:h-[20rem] w-[80vh] sm:max-w-6xl mx-auto "
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row-reverse mx-auto items-center max-w-6xl justify-between gap-10 md:my-28">
        <div className="border-b xl:w-[180%] md:mb-7 xl:mb-0 w-[90vw] border-t  border-amber-700">
          <div className="flex items-center justify-center  py-8 flex-col gap-7 ">
            <div className="uppercase flex flex-col items-center gap-3">
              <h1 className="text-[#333333] md:text-6xl text-3xl font-sans">
                910
              </h1>
              <p className="text-gray-500 text-[14px] sm:text-[16px]">
                Offices <br className="hidden sm:block " /> Worldwide
              </p>
            </div>
            <div className="uppercase flex flex-col items-center gap-3">
              <h1 className="text-[#333333] md:text-6xl text-3xl font-sans">
                42
              </h1>
              <p className="text-gray-500 text-[14px] sm:text-[16px]">
                countries & <br className="hidden sm:block " /> Territories
              </p>
            </div>
            <div className="uppercase flex flex-col items-center gap-3">
              <h1 className="text-[#333333] md:text-6xl text-3xl font-sans">
                18,400
              </h1>
              <p className="text-gray-500 text-[14px] sm:text-[16px]">
                Sales <br className="hidden sm:block " />
                associates
              </p>
            </div>
            <div className=" flex flex-col gap-3 items-center">
              <h1 className="text-[#333333] md:text-6xl text-3xl whitespace-nowrap font-sans">
                $88 Billion
              </h1>
              <p className="text-gray-500 uppercase text-[14px] sm:text-[16px]">
                Annual <br className="hidden sm:block " /> sales(usd)
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:mx-12  mx-12 gap-7">
          <div className="xl:w-[45%]  md:w-[60%] ">
            <img
              src={meech}
              alt="about"
              className="md:h-[26rem] sm:max-w-6xl w-[100vh]  mx-auto"
            />
          </div>
          <div className="flex gap-3 items-center xl:ml-0 lg:ml-16 w-full">
            <div className="md:w-[4rem] w-[8rem] md:ml-24 lg:ml-0  xl:mb-[17rem] lg:mb-[12rem] md:mb-[19rem] mb-[4rem] hidden sm:block  border-b  border-amber-700"></div>
            <div className="font-sans flex flex-wrap lg:w-[80%] sm:w-[60%] xl:w-[60%] text-[16px]  text-slate-500 ">
              <h1 className="text-2xl text-[#333333] my-7">Our Story</h1>A
              singular network of agents upholds the legacy of the world most
              enduring tastemaker. Embodying a spirit of innovation, an
              exceptional luxury real estate company under the Tmeech name was
              established in 2024. Beyond exquisite properties and the
              personalized service of our agents, only one brand delivers a
              lifestyle tailored to you. With a global portfolio of homes, our
              website offers the ability to search property listings worldwide,
              including an extensive selection of luxury residences—houses,
              condos, townhomes, villas, and more.
              <Link
                to="/about"
                className="uppercase text-[#081d57] flex items-center gap-2 font-josefin mt-5"
              >
                see details
                <ArrowLongRightIcon className=" w-8 h-6 mb-[-20px]  transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 flex items-center justify-center" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* listings result */}
      <div className="max-w-full mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="p-7 my-5">
              <h2 className="text-2xl  font-josefin font-semibold text-[#333333]">
                Recent offers
              </h2>
              <Link
                className="text-sm text-amber-700 hover:underline"
                to={'/search?offer=true'}
              >
                Show more offers
              </Link>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3   2xl:grid-cols-5 gap-4 p-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      {rentListings && rentListings.length > 0 && (
        <div className=" bg-[#081d57] my-12 ">
          <div className="p-7 my-5">
            <h2 className="text-2xl mt-10 font-josefin  font-semibold text-gray-200">
              Recent rental additions{' '}
            </h2>
            <Link
              className="text-sm text-gray-100 underline hover:no-underline"
              to={'/search?type=rent'}
            >
              Show more rental additions
            </Link>
          </div>
          <div className="mb-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3   2xl:grid-cols-5 gap-4 p-4">
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

      {saleListings && saleListings.length > 0 && (
        <div className="">
          <div className="p-7 my-5">
            <h2 className="text-2xl font-josefin font-semibold text-[#333333]">
              Recent sale additions{' '}
            </h2>
            <Link
              className="text-sm text-amber-700 hover:underline"
              to={'/search?offer=true'}
            >
              Show more sale additions
            </Link>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3   2xl:grid-cols-5 gap-4 p-4">
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center sm:mx-auto mx-12 gap-5 my-16 mb-24">
        <h1 className="text-3xl pb-16 pt-10">Lets get in touch</h1>
        <Link to="/sell-with-us" className="flex flex-col  gap-5  ">
          <img src={sec} alt="sell" />
          <p className="text-[#081d57] sm:text-[20px]">
            Do you want to list your home?
          </p>
          <div className="uppercase text-[12px] sm:text-[16px] text-[#081d57] flex items-center gap-2 font-josefin ">
            see details
            <ArrowLongRightIcon className=" w-8 h-6 mb-[-20px]  transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 flex items-center justify-center" />
          </div>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
