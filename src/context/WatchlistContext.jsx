// src/context/WatchlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load watchlist from localStorage:', error);
      return [];
    }
  });

  // Save watchlist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    } catch (error) {
      console.error('Failed to save watchlist to localStorage:', error);
    }
  }, [watchlist]);

  const addToWatchlist = (item) => {
    if (!watchlist.some((i) => i.id === item.id && i.media_type === item.media_type)) {
      setWatchlist([...watchlist, item]);
    }
  };

  const removeFromWatchlist = (item) => {
    setWatchlist(watchlist.filter((i) => i.id !== item.id || i.media_type !== item.media_type));
  };

  const isInWatchlist = (item) => {
    return watchlist.some((i) => i.id === item.id && i.media_type === item.media_type);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
