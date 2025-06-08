import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../Services/GlobalAPI";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const ScreenWidth = window.innerWidth;

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.getTrendingVideos()
      .then((resp) => setMovieList(resp.data.results))
      .catch((err) => console.error("API Error:", err));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const el = elementRef.current;
      if (!el) return;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += ScreenWidth - 50;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sliderRight = () => {
    elementRef.current.scrollLeft += ScreenWidth - 50;
  };

  const sliderLeft = () => {
    elementRef.current.scrollLeft -= ScreenWidth - 50;
  };

  const handleCardClick = (id) => {
    navigate(`/trailer/${id}`);
  };

  return (
    <div className="relative w-full mt-4">
      <HiChevronLeft
        className="hidden md:block text-white absolute text-[30px] left-2 top-1/2 -translate-y-1/2 cursor-pointer z-10"
        onClick={sliderLeft}
      />

      <HiChevronRight
        className="hidden md:block text-white absolute text-[30px] right-2 top-1/2 -translate-y-1/2 cursor-pointer z-10"
        onClick={sliderRight}
      />

      <div
        className="flex overflow-x-auto w-full gap-4 py-4 scrollbar-hide scroll-smooth"
        ref={elementRef}
      >
        {movieList.map((item, index) => (
          <img
            key={index}
            src={IMAGE_BASE_URL + item.backdrop_path}
            className="w-auto md:h-[280px] sm:h-[200px] object-cover rounded-lg flex-shrink-0 hover:scale-102 hover:shadow-[0_0_5px_4px_rgba(59,130,246,0.8)] transition-transform duration-300 ease-in-out cursor-pointer"
            alt={item.title || item.name}
            onClick={() => handleCardClick(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(item.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
