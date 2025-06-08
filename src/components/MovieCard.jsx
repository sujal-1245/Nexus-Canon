import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlay, FaStar, FaRegStar } from "react-icons/fa6";
import { useWatchlist } from '../context/WatchlistContext';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ Movie, disableWatchlist = false, onCardClick = null }) {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const inWatchlist = isInWatchlist(Movie);

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(Movie);
    } else {
      navigate(`/trailer/${Movie.id}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCardClick();
    }
  };

  const toggleWatchlist = (e) => {
    e.stopPropagation();
    inWatchlist ? removeFromWatchlist(Movie) : addToWatchlist(Movie);
  };

  return (
    <div
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Play trailer for ${Movie.title || 'this movie'}`}
      className="relative group cursor-pointer outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg w-fit"
    >
      {/* ⭐ Rating Badge */}
      <div className="absolute top-2 left-2 bg-yellow-400 text-black font-semibold px-2 py-1 rounded-md text-xs z-10 shadow-md">
        ⭐ {Movie.vote_average?.toFixed(1)}
      </div>

      {/* 🌟 Watchlist Star Button */}
      {!disableWatchlist && (
        <div
          className="absolute top-2 right-2 z-10 cursor-pointer text-yellow-400 text-lg hover:scale-125 transition-transform"
          onClick={toggleWatchlist}
          title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          {inWatchlist ? <FaStar /> : <FaRegStar />}
        </div>
      )}

      {/* 🎬 Poster Image */}
      <img
        className="w-[110px] sm:w-[200px] md:w-[350px] mt-5 h-[300px] rounded-lg object-cover 
        hover:border-[3px] border-gray-500 group-hover:scale-110 transition-all duration-300 ease-in-out"
        src={IMAGE_BASE_URL + Movie.poster_path}
        alt={Movie.title || 'Movie poster'}
        loading="lazy"
      />

      {/* ▶️ Play Overlay */}
      <div className="absolute inset-0 rounded-lg bg-black bg-opacity-100 opacity-0 group-hover:opacity-50 transition duration-300 flex items-center justify-center pointer-events-none">
        <span className="text-white text-5xl select-none">
          <FaCirclePlay />
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
