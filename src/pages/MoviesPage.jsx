import React, { useEffect, useState } from 'react';
import GlobalApi from '../Services/GlobalAPI';
import MovieCard from '../components/MovieCard';
import { useWatchlist } from '../context/WatchlistContext'; // ✅ Import context

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Use context methods
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    GlobalApi.getTrendingVideos()
      .then((resp) => {
        setMovies(resp.data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-6 sm:px-8 md:px-16">
      <h1 className="text-3xl font-bold mb-6">Trending Movies</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              Movie={movie}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
              isInWatchlist={isInWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesPage;
