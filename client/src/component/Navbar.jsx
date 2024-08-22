import { MagnifyingGlassIcon as FaSearch, UserIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Hamburger from './Hamburger';
import { useEffect, useState } from 'react';

const Navbar = ({ onSignIn, onProfile }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isSticky, setIsSticky] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
     
      const scrollPosition = window.scrollY;
      const isLargeScreen = window.innerWidth >= 1280; // 1280px corresponds to 'xl' breakpoint in Tailwind
  
      if (isLargeScreen) {
        const threshold = window.innerHeight * 1.2; // 50% of the screen height
        if (scrollPosition > threshold) {
          setIsSticky(false); // Hide the navbar
        } else {
          setIsSticky(true); // Show the navbar
        }
      } else {
        setIsSticky(true); // Sticky all through on smaller screens
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  


  return (
<div className={`bg-[#021342] border-b border-slate-400 shadow-md ${isSticky ? 'sticky-navbar' : 'navbar-hidden'}`}>

      <nav className="flex items-center justify-between px-4 py-3 xl:hidden">
        <Link  to="/search">
          {' '}
          <FaSearch className=" text-slate-100 w-6" />
        </Link>
        <Link to="/">
          <h1 className="font-[900] text-xl sm:text-[24px] flex flex-wrap">
            <span className="font-josefin  text-slate-200">Tmeech</span>
            <span className="text-slate-500">Estate</span>
          </h1>
        </Link>

        <Hamburger onSignIn={onSignIn} onProfile={onProfile}/>
      </nav>

      <div className="hidden xl:flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-[900] text-md sm:text-[24px] flex flex-wrap">
            <span className="font-josefin text-[#F5F5F5]">Tmeech</span>
            <span className="text-gray-400">Estate</span>
          </h1>
        </Link>
       

        <ul className="flex gap-4 text-white items-center">
          <Link
            to={'/search'}
            className="text-white uppercase pt-1 cursor-pointer  text-[12px] lg:text-[14px] flex gap-1 hover:text-slate-300 relative link-hover-effect"
          >
            <FaSearch className=" w-4 lg:w-5" />
            <h3 className='font-josefin '>Search</h3>
          </Link>
          {/* <Link to="/">
            {' '}
            <li className="hidden sm:inline font-josefin uppercase cursor-pointer  text-[12px] lg:text-[14px]    relative link-hover-effect   hover:text-slate-300">
              Home
            </li>{' '}
          </Link> */}
          <Link to="/about">
            {' '}
            <li className="hidden sm:inline font-josefin uppercase cursor-pointer  text-[12px] lg:text-[14px]   relative link-hover-effect  hover:text-slate-300">
              About
            </li>{' '}
          </Link>
         
          <div>
            {currentUser ? (
              <div className='flex cursor-pointer items-center gap-4 '>

              <li  onClick={onProfile} className="flex gap-1 items-center">
                {/* <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
                <h3 className="text-sm font-josefin text-[#F5F5F5]">{currentUser.username}</h3> */}
                  <UserIcon className="w-6"/>
                </li>
                </div>
              
            ) : (
              <li
                onClick={onSignIn}
                className="cursor-pointer  font-josefin uppercase text-[14px]    px-[10px] py-[4px]   "
              >
                Join {''} / Log in
              </li>
            )}
          </div>
          <Link to="/sell-with-us">
            <li className='hidden sm:inline border border-amber-700 p-3 rounded font-josefin uppercase cursor-pointer  text-[12px] lg:text-[14px]    hover:text-slate-300'>
           sell with us 
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
