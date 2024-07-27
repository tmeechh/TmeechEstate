import { MagnifyingGlassIcon as FaSearch } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Hamburger from './Hamburger';

const Header = ({ onSignIn }) => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log('currentUser:', currentUser);

  return (
    <div className="bg-slate-400 shadow-md ">
      <nav className="flex items-center justify-between px-8 py-3 md:hidden">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-200">Tmeech</span>
            <span className="text-slate-500">Estate</span>
          </h1>
        </Link>
        <Hamburger onSignIn={onSignIn} />
      </nav>
      <div className="hidden md:flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-200">Tmeech</span>
            <span className="text-slate-500">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent h-3 outline-none w-24 sm:w-52"
          />
          <FaSearch className="text-slate-500 w-4" />
        </form>
        <ul className="flex gap-4 text-white items-center">
          <Link to="/">
            {' '}
            <li className="hidden sm:inline cursor-pointer  rounded px-[6px] py-[5px] border-slate-900  hover:text-slate-500 hover:opacity-90">
              Home
            </li>{' '}
          </Link>
          <Link to="/about">
            {' '}
            <li className="hidden sm:inline cursor-pointer  rounded px-[6px] py-[5px]  border-slate-900 hover:text-slate-500 hover:opacity-90">
              About
            </li>{' '}
          </Link>
          <div>
            {currentUser ? (
              <Link to="profile" className="flex gap-1 items-center">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
                <p className="text-sm text-slate-200">{currentUser.username}</p>
              </Link>
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

export default Header;
