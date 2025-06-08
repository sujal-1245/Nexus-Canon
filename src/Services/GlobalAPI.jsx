import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '9525916b27838b7022bf01cd0f1c496b';

// Base URLs
const movieByGenreBaseURL = `${API_URL}/discover/movie?api_key=${API_KEY}`;
const trendingBaseURL = `${API_URL}/trending/all/day?api_key=${API_KEY}`;

// Functions returning axios promises
const getTrendingVideos = () => axios.get(trendingBaseURL);

const getMovieByGenreId = (id) => axios.get(`${movieByGenreBaseURL}&with_genres=${id}`);

const getMovieDetails = (movieId) =>
  axios.get(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`);

const getMovieCredits = (movieId) =>
  axios.get(`${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);

const getMovieTrailer = (movieId) =>
  axios.get(`${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);

const getSimilarMovies = (movieId) =>
  axios.get(`${API_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);

const getTrendingTVShows = () =>
  axios.get(`${API_URL}/trending/tv/day?api_key=${API_KEY}`);

const getTVShowDetails = (tvId) =>
  axios.get(`${API_URL}/tv/${tvId}?api_key=${API_KEY}`);

const getTVShowCredits = (tvId) =>
  axios.get(`${API_URL}/tv/${tvId}/credits?api_key=${API_KEY}`);

const getTVShowTrailer = (tvId) =>
  axios.get(`${API_URL}/tv/${tvId}/videos?api_key=${API_KEY}`);

const getSimilarTVShows = (tvId) =>
  axios.get(`${API_URL}/tv/${tvId}/similar?api_key=${API_KEY}`);

// ✅ NEW: Multi-Search API (movies, shows, people, etc.)
const searchMulti = (query) =>
  axios.get(`${API_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);

export default {
  getTrendingVideos,
  getMovieByGenreId,
  getMovieDetails,
  getMovieCredits,
  getMovieTrailer,
  getSimilarMovies,
  getTrendingTVShows,
  getTVShowDetails,
  getTVShowCredits,
  getTVShowTrailer,
  getSimilarTVShows,
  searchMulti, // 🔍 Added here for search support
};
