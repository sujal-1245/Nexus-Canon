import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalApi from '../Services/GlobalAPI';
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function SeriesTrailerPage() {
  const { tvId } = useParams();
  const [show, setShow] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const [showRes, trailerRes, creditsRes, similarRes] = await Promise.all([
          GlobalApi.getTVShowDetails(tvId),
          GlobalApi.getTVShowTrailer(tvId),
          GlobalApi.getTVShowCredits(tvId),
          GlobalApi.getSimilarTVShows(tvId),
        ]);

        setShow(showRes.data);
        setCast(creditsRes.data.cast?.slice(0, 10) || []);
        setSimilarShows(similarRes.data.results?.slice(0, 10) || []);

        // Find YouTube trailer
        const trailer = trailerRes.data.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        setVideoKey(trailer ? trailer.key : null);
      } catch (err) {
        console.error(err);
        setError('Failed to load TV show data.');
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [tvId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-yellow-400 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">
        {error || 'TV Show not found.'}
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full text-white bg-black overflow-x-hidden"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL + show.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />

      <div className="relative z-10 px-6 md:px-16 py-12 max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full shadow-md transition"
        >
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-[0_0_40px_#FFD70044] border border-white/20"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-md tracking-wide">
            {show.name}
          </h1>

          {videoKey ? (
            <div className="relative w-full pb-[56.25%] mb-8 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1&modestbranding=1`}
                title={`${show.name} Trailer`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              />
            </div>
          ) : (
            <p className="mb-8 text-center text-gray-300 font-medium">Trailer not available</p>
          )}

          <p className="text-lg leading-relaxed text-gray-200 mb-6">
            {show.overview || 'No description available.'}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            {show.first_air_date && (
              <div>
                <span className="text-yellow-400 font-semibold">First Air Date:</span> {show.first_air_date}
              </div>
            )}
            {show.vote_average !== undefined && (
              <div>
                <span className="text-yellow-400 font-semibold">Rating:</span> ⭐ {show.vote_average.toFixed(1)}
              </div>
            )}
            {show.number_of_seasons && (
              <div>
                <span className="text-yellow-400 font-semibold">Seasons:</span> {show.number_of_seasons}
              </div>
            )}
            {show.number_of_episodes && (
              <div>
                <span className="text-yellow-400 font-semibold">Episodes:</span> {show.number_of_episodes}
              </div>
            )}
          </div>

          {show.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {show.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-sm hover:scale-105 transition-transform"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {cast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Top Cast</h2>
            <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
              {cast.map((member) => (
                <div key={member.id} className="w-[100px] flex-shrink-0 text-center">
                  <img
                    src={member.profile_path ? `https://image.tmdb.org/t/p/w185${member.profile_path}` : '/placeholder.png'}
                    alt={member.name}
                    className="rounded-full w-20 h-20 object-cover mx-auto border-2 border-yellow-500"
                  />
                  <p className="text-sm mt-2 text-white font-semibold truncate">{member.name}</p>
                  <p className="text-xs text-gray-400 truncate">{member.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {similarShows.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Similar Shows</h2>
            <div className="flex scrollbar-hide overflow-x-auto gap-6 pb-4">
              {similarShows.map((sm) => (
                <div
                  key={sm.id}
                  onClick={() => navigate(`/series/${sm.id}`)}
                  className="cursor-pointer w-[160px] flex-shrink-0 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={IMAGE_BASE_URL + sm.poster_path}
                    alt={sm.name}
                    className="rounded-lg shadow-md w-full h-[240px] object-cover"
                  />
                  <p className="text-sm mt-2 text-center text-white font-medium truncate">{sm.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeriesTrailerPage;
