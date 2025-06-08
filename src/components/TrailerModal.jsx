import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalApi from '../Services/GlobalAPI';

function TrailerModal({ movieId, videoKey, onClose }) {
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const [detailsRes, creditsRes] = await Promise.all([
          GlobalApi.getMovieDetails(movieId),
          GlobalApi.getMovieCredits(movieId),
        ]);
        setDetails(detailsRes.data);
        setCast(creditsRes.data.cast.slice(0, 5));
      } catch (err) {
        console.error('Error loading movie info:', err);
      }
    };

    if (movieId) fetchMovieInfo();
  }, [movieId]);

  // Focus trap + ESC close
  useEffect(() => {
    const keyListener = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab') {
        // Basic focus trap inside modal
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', keyListener);
    // Lock scrolling behind modal
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', keyListener);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {videoKey && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="trailer-title"
          ref={modalRef}
        >
          <motion.div
            className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto scroll-smooth"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <div className="relative">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1`}
                title={`${details?.title || 'Movie'} Trailer`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                frameBorder="0"
              />
              <button
                onClick={onClose}
                aria-label="Close trailer modal"
                className="absolute top-3 right-3 text-white text-2xl bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
              >
                ✕
              </button>
            </div>

            <div className="text-white p-5 space-y-3">
              <h2 id="trailer-title" className="text-2xl font-bold">
                {details?.title}
              </h2>
              <p className="text-sm text-gray-300">
                ⭐ {details?.vote_average?.toFixed(1)} / 10 — {details?.release_date}
              </p>
              <p className="text-md">{details?.overview}</p>
              {cast.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mt-4">Top Cast</h3>
                  <div className="flex gap-4 mt-2">
                    {cast.map((actor) => (
                      <div key={actor.id} className="text-center text-sm">
                        <img
                          className="w-16 h-16 rounded-full object-cover mx-auto"
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : 'https://via.placeholder.com/64x64?text=?'
                          }
                          alt={actor.name || 'Actor image'}
                          loading="lazy"
                        />
                        <p>{actor.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TrailerModal;
