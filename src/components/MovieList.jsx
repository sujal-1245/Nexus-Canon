import React, { useEffect, useRef, useState } from 'react';
import GlobalApi from "../Services/GlobalAPI";
import MovieCard from './MovieCard';
import HrMovieCard from './HrMovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { useWatchlist } from '../context/WatchlistContext';  // <-- import context

function MovieList({ genreId, index_ }) {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef(null);

  // Use watchlist context methods
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    getMovieByGenreId();
  }, []);

  const getMovieByGenreId = () => {
    GlobalApi.getMovieByGenreId(genreId).then(resp => {
      setMovieList(resp.data.results);
    });
  };

  const slideRight = (element) => {
    element.scrollLeft += 500;
  };

  const slideLeft = (element) => {
    element.scrollLeft -= 500;
  };

  return (
    <div className='relative'>
      <IoChevronBackOutline
        onClick={() => slideLeft(elementRef.current)}
        className={`text-[50px] text-white p-2 z-10 cursor-pointer hidden md:block absolute ${index_ % 3 === 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
      />

      <div
        ref={elementRef}
        className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth pt-4 px-3 pb-4"
      >
        {movieList.map((item, index) => {
          const isSmallScreen = window.innerWidth < 630;
          const modValue = isSmallScreen ? 1 : 3;
          

          const commonProps = {
             Movie: item,
    disableWatchlist: true,
          };

          return (
            <div
              key={item.id || index}
              className={`flex-shrink-0 ${index_ % modValue === 0 ? 'w-[300px]' : 'w-[180px]'}`}
            >
              {index_ % modValue === 0 ? (
                <HrMovieCard {...commonProps} />
              ) : (
                <MovieCard {...commonProps} />
              )}
            </div>
          );
        })}
      </div>

      <IoChevronForwardOutline
        onClick={() => slideRight(elementRef.current)}
        className={`text-[50px] text-white hidden md:block p-2 cursor-pointer z-10 top-0 absolute right-0 ${index_ % 3 === 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
      />
    </div>
  );
}

export default MovieList;
