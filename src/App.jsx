import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Slider from './components/Slider.jsx';
import ProductionHouse from './components/ProductionHouse.jsx';
import GenreMovieList from './components/GenreMovieList.jsx';
import TrailerPage from './components/TrailerPage.jsx';
import SeriesTrailerPage from './components/SeriesTrailerPage.jsx';

import SearchPage from './pages/SearchPage.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import SeriesPage from './pages/SeriesPage.jsx';

import { WatchlistProvider } from './context/WatchlistContext'; // ✅ Wrap app in context

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <div className="min-h-screen w-screen bg-zinc-900 text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
            <Header />
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <Slider />
                    <ProductionHouse />
                    <GenreMovieList />
                  </>
                }
              />

              {/* Movie Trailer Page */}
              <Route path="/trailer/:movieId" element={<TrailerPage />} />

              {/* TV Series Trailer Page */}
              <Route path="/series/:tvId" element={<SeriesTrailerPage />} />

              {/* Header Navigation Pages */}
              <Route path="/search" element={<SearchPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/series" element={<SeriesPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </WatchlistProvider>
  );
}

export default App;
