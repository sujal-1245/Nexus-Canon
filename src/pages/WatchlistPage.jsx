import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard'; // Unified layout

function WatchlistPage() {
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();

  const movies = watchlist.filter(item => item.media_type === 'movie');
  const tvShows = watchlist.filter(item => item.media_type === 'tv');

  const renderGrid = (items, type) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item) => (
        <div key={item.id} className="flex justify-center">
          <MovieCard
            Movie={item}
            onCardClick={() =>
              type === 'tv'
                ? navigate(`/series/${item.id}`) // ✅ Correct route
                : navigate(`/trailer/${item.id}`)
            }
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-6 sm:px-8 md:px-16">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>

      {movies.length === 0 && tvShows.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Your watchlist is empty.</p>
      ) : (
        <>
          {movies.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Movies</h2>
              {renderGrid(movies, 'movie')}
              <div className="my-8" />
            </>
          )}

          {tvShows.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">TV Shows</h2>
              {renderGrid(tvShows, 'tv')}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default WatchlistPage;
