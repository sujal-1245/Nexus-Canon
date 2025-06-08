import React, { useState, useEffect, useRef } from "react";
import GlobalApi from "../Services/GlobalAPI";
import MovieCard from "../components/MovieCard";
import { FaSearch, FaTimes } from "react-icons/fa";
import debounce from "lodash.debounce";
import MoviesPage from "./MoviesPage";
import SeriesPage from "./SeriesPage";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef();

  const fetchSuggestions = debounce(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const response = await GlobalApi.searchMulti(searchTerm);
      const filtered = response.data.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      ).slice(0, 6);
      setSuggestions(filtered);
    } catch (error) {
      console.error("Suggestion API error:", error);
      setSuggestions([]);
    }
    setLoadingSuggestions(false);
  }, 400);

  useEffect(() => {
    fetchSuggestions(query);
  }, [query]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoadingResults(true);
    setShowSuggestions(false);
    try {
      const response = await GlobalApi.searchMulti(query);
      const filtered = response.data.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );
      setResults(filtered);
    } catch (error) {
      console.error("Search API error:", error);
      setResults([]);
    }
    setLoadingResults(false);
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setResults([]);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (item) => {
    if (item.media_type === "movie") {
      window.location.href = `/trailer/${item.id}`;
    } else if (item.media_type === "tv") {
      window.location.href = `/series/${item.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-6 sm:px-8 md:px-16">
      <h1 className="text-3xl font-bold mb-6">Search Movies & TV Shows</h1>

      <form
        onSubmit={handleSearchSubmit}
        className="relative max-w-xl mx-auto mb-8"
        role="search"
      >
        <input
          type="search"
          placeholder="Search for movies or TV shows..."
          className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={query}
          ref={inputRef}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          aria-label="Search movies or TV shows"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute right-3 top-3 text-gray-400 hover:text-yellow-400 transition"
          >
            <FaTimes />
          </button>
        )}
        <button
          type="submit"
          aria-label="Submit search"
          className="absolute right-10 top-3 text-yellow-400 hover:text-yellow-500 transition"
        >
          <FaSearch />
        </button>

        {showSuggestions && suggestions.length > 0 && (
          <ul
            className="absolute z-20 w-full bg-zinc-800 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg"
            role="listbox"
            aria-label="Search suggestions"
          >
            {loadingSuggestions && (
              <li className="p-3 text-center text-gray-400">Loading...</li>
            )}
            {!loadingSuggestions &&
              suggestions.map((item) => (
                <li
                  key={item.id}
                  tabIndex={0}
                  role="option"
                  aria-selected="false"
                  className="flex items-center gap-3 p-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
                  onClick={() => handleSuggestionClick(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSuggestionClick(item);
                    }
                  }}
                >
                  <img
                    src={
                      item.poster_path
                        ? IMAGE_BASE_URL + item.poster_path
                        : "https://via.placeholder.com/40x60?text=No+Image"
                    }
                    alt={item.title || item.name}
                    className="w-10 h-14 rounded-md object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <span className="text-sm font-medium truncate">
                    {item.title || item.name}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </form>

      {loadingResults && (
        <p className="text-center text-gray-400">Searching...</p>
      )}

      {!loadingResults && results.length === 0 && query.trim() !== "" && (
        <p className="text-center text-gray-400">No results found for "{query}"</p>
      )}

      {!loadingResults && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((item) => (
            <div key={item.id} className="flex justify-center">
              <MovieCard Movie={item} />
            </div>
          ))}
        </div>
      )}

      {/* ✅ Show fallback content when no query */}
      {!query.trim() && results.length === 0 && (
        <div className="mt-12 space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Top Movies</h2>
            <MoviesPage />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Top TV Shows</h2>
            <SeriesPage />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
