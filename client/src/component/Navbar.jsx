import { MagnifyingGlassIcon as FaSearch } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Hamburger from './Hamburger';
import { useEffect, useState } from 'react';

const Navbar = ({ onSignIn }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isSticky, setIsSticky] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const middleOfPage = document.documentElement.scrollHeight / 2;
      if (scrollPosition < middleOfPage) {
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
    <div className={`bg-slate-600 shadow-md ${isSticky ? 'sticky-navbar' : ''}`}>
      <nav className="flex items-center justify-between px-4 py-3 md:hidden">
        <Link  to="/search">
          {' '}
          <FaSearch className=" text-slate-100 w-6" />
        </Link>
        <Link to="/">
          <h1 className="font-[900] text-xl sm:text-xl flex flex-wrap">
            <span className="font-josefin  text-slate-200">Tmeech</span>
            <span className="text-slate-500">Estate</span>
          </h1>
        </Link>

        <Hamburger onSignIn={onSignIn} />
      </nav>

      <div className="hidden md:flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-[900] text-md sm:text-xl flex flex-wrap">
            <span className="font-josefin text-slate-200">Tmeech</span>
            <span className="text-slate-500">Estate</span>
          </h1>
        </Link>
        {/* <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-[12px] rounded-lg flex   items-center "
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent search h-3 outline-none w-24 sm:w-52"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="">
            <FaSearch className="text-slate-500 w-4" />
          </button>
        </form> */}

        <ul className="flex gap-4 text-white items-center">
          <Link
            to={'/search'}
            className="text-white text-[14px] lg:text-[16px] flex gap-1 hover:text-slate-300 relative link-hover-effect"
          >
            <FaSearch className=" w-4 lg:w-5" />
            <h3>Search</h3>
          </Link>
          <Link to="/">
            {' '}
            <li className="hidden sm:inline cursor-pointer  text-[14px] lg:text-[16px]  rounded px-[6px] py-[5px] border-slate-900  relative link-hover-effect   hover:text-slate-300">
              Home
            </li>{' '}
          </Link>
          <Link to="/about">
            {' '}
            <li className="hidden sm:inline cursor-pointer  text-[14px] lg:text-[16px]  rounded px-[6px] py-[5px]  border-slate-900 relative link-hover-effect  hover:text-slate-300">
              About
            </li>{' '}
          </Link>
          <div>
            {currentUser ? (
              <div className='flex  items-center gap-4 '>

              <Link to="profile" className="flex gap-1 items-center">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
                <h3 className="text-sm text-slate-200">{currentUser.username}</h3>
                </Link>
                </div>
              
            ) : (
              <li
                onClick={onSignIn}
                className="cursor-pointer bg-gray-500  rounded-xl  px-[10px] py-[4px] border border-slate-500  "
              >
                Sign in
              </li>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
