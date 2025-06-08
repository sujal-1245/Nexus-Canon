import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaStar, FaBars, FaTimes } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { HiMiniPlayCircle } from "react-icons/hi2";
import { MdMovie } from "react-icons/md";
import { GiTv } from "react-icons/gi";

function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menu = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Search", icon: <FcSearch />, path: "/search" },
    { name: "Watchlist", icon: <FaStar />, path: "/watchlist" },
    { name: "Movies", icon: <MdMovie />, path: "/movies" },
    { name: "Series", icon: <GiTv />, path: "/series" }
  ];

  return (
    <>
      <div className="bg-zinc-900 px-4 py-3 w-full shadow-md z-50 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Disney+" className="w-28 sm:w-20 object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 cursor-pointer 
                  hover:underline underline-offset-8 
                  ${location.pathname === item.path ? "text-blue-400" : "text-white"}`}
              >
                {item.icon}
                <span className="text-sm sm:text-base">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Avatar - Desktop */}
          <div className="hidden md:block">
            <img
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="User Profile"
            />
          </div>

          {/* Hamburger - Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-xl">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-zinc-800/90 backdrop-blur-lg rounded-2xl px-6 py-3 flex gap-6 justify-between items-center shadow-lg z-[999]">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-xl p-2 rounded-full transition 
                ${location.pathname === item.path ? "text-blue-400 bg-zinc-700" : "text-white hover:bg-zinc-700"}
              `}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Header;
