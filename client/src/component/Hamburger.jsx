import React, { useState } from 'react';
import { CgCloseR, CgMenuRight } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Hamburger = ({ onSignIn }) => {
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
            <CgCloseR className="text-[30px] text-white/70" />
          </button>
          <div className="flex ">
            <div className="flex   gap-4 items-start p-4">
              <ul className="flex  flex-col-reverse gap-4 text-[18px]">
                <Link className="hover:underline" to="/" onClick={toggleMenu}>
                  Home
                </Link>
                <Link
                  className="hover:underline"
                  to="/about"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <div onClick={toggleMenu}>
                  {currentUser ? (
                    <Link to="/profile" className="flex  items-center gap-2">
                      <img
                        className="rounded-full h-7 w-7 object-cover"
                        src={currentUser.avatar}
                        alt="profile"
                      />
                      <p className="text-sm">{currentUser.username}</p>
                    </Link>
                  ) : (
                    <p
                      onClick={() => {
                        toggleMenu();
                        onSignIn();
                      }}
                      className="text-sm cursor-pointer bg-slate-700 px-3 py-1 rounded-lg"
                    >
                      Sign In
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
