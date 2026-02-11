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
  useEffect(() => {
  filterMovies();
}, [movies, selectedLanguage, selectedGenre, searchQuery]);

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

  const filterMovies = () => {
    let filtered = [...movies];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(movie =>
        movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply language filter
    if (selectedLanguage) {
      filtered = filtered.filter(movie =>
        movie.original_language?.toLowerCase() === selectedLanguage.toLowerCase() ||
        movie.spoken_languages?.some(lang => 
          lang.name?.toLowerCase() === selectedLanguage.toLowerCase()
        )
      );
    }

    // Apply genre filter
    if (selectedGenre) {
      filtered = filtered.filter(movie => {
        // Check if genre_ids array includes the selected genre (for string-based genres)
        if (Array.isArray(movie.genre_ids)) {
          return movie.genre_ids.some(genre => 
            genre?.toLowerCase() === selectedGenre.toLowerCase() ||
            (typeof genre === 'string' && genre.toLowerCase().includes(selectedGenre.toLowerCase()))
          );
        }
        // Check if genres array includes the selected genre
        if (Array.isArray(movie.genres)) {
          return movie.genres.some(genre => 
            genre?.name?.toLowerCase() === selectedGenre.toLowerCase() ||
            (typeof genre === 'string' && genre.toLowerCase().includes(selectedGenre.toLowerCase())) ||
            (typeof genre === 'object' && genre.name?.toLowerCase() === selectedGenre.toLowerCase())
          );
        }
        return false;
      });
    }

    setFilteredMovies(filtered);
  };

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
