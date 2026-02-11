import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';


import { fetchMovies, searchMovies } from '../services/movieApi';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch movies on mount
  useEffect(() => {
    loadMovies();
  }, []);

  // Filter movies when filters or search change

  const loadMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies();
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterMovies = useCallback(() => {
  let filtered = [...movies];

  // Search filter
  if (searchQuery.trim()) {
    filtered = filtered.filter(movie =>
      movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Language filter
  if (selectedLanguage) {
    filtered = filtered.filter(movie =>
      movie.original_language?.toLowerCase() === selectedLanguage.toLowerCase() ||
      movie.spoken_languages?.some(lang =>
        lang.name?.toLowerCase() === selectedLanguage.toLowerCase()
      )
    );
  }

  // Genre filter
  if (selectedGenre) {
    filtered = filtered.filter(movie => {
      if (Array.isArray(movie.genre_ids)) {
        return movie.genre_ids.some(genre =>
          genre?.toLowerCase() === selectedGenre.toLowerCase()
        );
      }

      if (Array.isArray(movie.genres)) {
        return movie.genres.some(genre =>
          genre?.name?.toLowerCase() === selectedGenre.toLowerCase()
        );
      }

      return false;
    });
  }

  setFilteredMovies(filtered);

}, [movies, selectedLanguage, selectedGenre, searchQuery]);

useEffect(() => {
  filterMovies();
}, [filterMovies]);


  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      loadMovies();
    }
  };

  const clearFilters = () => {
    setSelectedLanguage('');
    setSelectedGenre('');
    setSearchQuery('');
    loadMovies();
  };

  return (
    <MovieContext.Provider
      value={{
        movies: filteredMovies,
        loading,
        error,
        selectedLanguage,
        selectedGenre,
        searchQuery,
        setSelectedLanguage,
        setSelectedGenre,
        handleSearch,
        clearFilters,
        loadMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
