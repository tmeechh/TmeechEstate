import React, { useEffect, useState } from 'react';
import { CgCloseR, CgMenuRight } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Hamburger = ({ onSignIn, onProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <button
        className="text-gray-500 outline-none focus:text-gray-600"
        onClick={toggleMenu}
      >
        <CgMenuRight className="text-4xl font-semibold" />
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 bottom-0 z-10 bg-opacity-90 w-screen h-screen bg-black/80 text-white font-semibold text-[18px] shadow-lg">
          <button onClick={toggleMenu} className="absolute top-4 right-5">
          <XMarkIcon className="w-7 h-7" />
          </button>
          <div className="flex ">
            <div className="flex   gap-4 items-start p-4">
              <ul className="flex  flex-col-reverse gap-4 text-[18px]">
                <Link
                  to="/sell-with-us"
                  onClick={toggleMenu}
                  className="  border border-amber-700 p-2 rounded font-josefin uppercase cursor-pointer  text-[12px] lg:text-[14px]    hover:text-slate-300"
                >
                  sell with us
                </Link>
                <Link
                  className="hover:underline font-josefin text-[14px] "
                  to="/"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  className="hover:underline font-josefin text-[14px]"
                  to="/about"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <div onClick={toggleMenu}>
                  {currentUser ? (
                    <div className="flex flex-col gap-3">
                      <li onClick={onProfile} className="flex  items-center gap-2">
                        {/* <img
                          className="rounded-full h-7 w-7 object-cover"
                          src={currentUser.avatar}
                          alt="profile"
                        /> */}
                          <UserIcon className="w-6"/>
                        {/* <p className="text-sm">{currentUser.username}</p> */}
                      </li>
                    </div>
                  ) : (
                    <p
                      onClick={onSignIn}
                      className="hover:underline text-[14px]   "
                    >
                      Join {''} / Log in
                    </p>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
