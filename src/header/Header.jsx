import { MagnifyingGlassIcon as FaSearch } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-slate-900 shadow-md ">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
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
            className="bg-transparent outline-none w-24 sm:w-60"
          />
          <FaSearch className="text-slate-500 w-5" />
        </form>
        <ul className="flex gap-4 text-white">
          <Link to="/">
            {' '}
            <li className="hidden sm:inline cursor-pointer hover:text-slate-500 hover:underline">
              Home
            </li>{' '}
          </Link>
          <Link to="/about">
            {' '}
            <li className="hidden sm:inline cursor-pointer hover:text-slate-500 hover:underline">
              About
            </li>{' '}
          </Link>
          <Link to="sign-in">
            {' '}
            <li className="cursor-pointer hover:text-slate-500 ">
              Sign in
            </li>{' '}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
