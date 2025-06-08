import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlay, FaStar, FaRegStar } from "react-icons/fa6";
import { useWatchlist } from '../context/WatchlistContext';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function HrMovieCard({ Movie, disableWatchlist = false }) {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const inWatchlist = isInWatchlist(Movie);

  const handleClick = () => {
    navigate(`/trailer/${Movie.id}`);
  };

  const toggleWatchlist = (e) => {
    e.stopPropagation();
    inWatchlist ? removeFromWatchlist(Movie) : addToWatchlist(Movie);
  };

  return (
    <div
      className="hover:scale-110 transition-all duration-200 cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="relative">
        {/* 🌟 Watchlist Star Button */}
        {!disableWatchlist && (
          <div
            className="absolute top-2 right-2 z-10 text-yellow-400 text-lg hover:scale-125 transition-transform"
            onClick={toggleWatchlist}
            title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            {inWatchlist ? <FaStar /> : <FaRegStar />}
          </div>
        )}

        {/* 🎬 Poster Image */}
        <img
          className="w-[300px] h-[170px] rounded-xl object-cover border-white transition-all duration-200"
          src={IMAGE_BASE_URL + Movie.backdrop_path}
          alt={Movie.title || 'Movie poster'}
        />

        {/* ▶️ Play Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-80 transition duration-300 flex items-center justify-center rounded-xl">
          <span className="text-white opacity-100 text-4xl"><FaCirclePlay /></span>
        </div>
      </div>

      {/* 📺 Title */}
      <h2 className="py-2 text-white font-semibold">{Movie.title || Movie.name}</h2>
    </div>
  );
}

export default HrMovieCard;
