import React, { useState } from 'react';
import { CgCloseR, CgMenuRight } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
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
                          
              <ul className="flex flex-col gap-4 text-[18px]">
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/about" onClick={toggleMenu}>About</Link>
                <Link to="/profile" onClick={toggleMenu}>
                  {currentUser ? (
                    <div className="flex  items-center gap-2">
                    
                      <img
                        className="rounded-full h-7 w-7 object-cover"
                        src={currentUser.avatar}
                        alt="profile"
                      />
                     <p className='text-[14px]'>{currentUser.username}</p>
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
