import React, { useEffect, useState } from 'react';
import GlobalApi from '../Services/GlobalAPI';
import HrMovieCard from '../components/HrMovieCard';
import { useNavigate } from 'react-router-dom';

function SeriesPage() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    GlobalApi.getTrendingVideos()
      .then((resp) => {
        const tvShows = resp.data.results.filter(item => item.media_type === 'tv');
        setSeries(tvShows);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/series/${id}`); // ✅ Navigating to SeriesTrailerPage
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-6 sm:px-8 md:px-16">
      <h1 className="text-3xl font-bold mb-6">Trending Series</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading series...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {series.map((show) => (
            <div
              key={show.id}
              tabIndex={0}
              role="button"
              onClick={() => handleCardClick(show.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick(show.id);
              }}
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
            >
              <HrMovieCard Movie={show} />
              <p className="mt-2 text-center text-sm font-semibold">
                {show.name || show.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SeriesPage;
