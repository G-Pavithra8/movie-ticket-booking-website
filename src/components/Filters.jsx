import React from 'react';
import { useMovies } from '../context/MovieContext';

const Filters = () => {
  const {
    selectedLanguage,
    selectedGenre,
    setSelectedLanguage,
    setSelectedGenre,
    clearFilters,
  } = useMovies();

  const languages = [ 'English', 'Hindi'];
  const genres = [
    { id: 'Action', name: 'Action' },
    { id: 'Comedy', name: 'Comedy' },
    { id: 'Drama', name: 'Drama' },
    { id: 'Thriller', name: 'Thriller' },
    { id: 'Romance', name: 'Romance' },
    { id: 'Horror', name: 'Horror' },
    { id: 'Sci-Fi', name: 'Science Fiction' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        {(selectedLanguage || selectedGenre) && (
          <button
            onClick={clearFilters}
            className="text-sm text-[#ff9ba3] hover:text-[#ffb3ba] transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Language Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Language</h3>
        <div className="space-y-2">
          {languages.map((lang) => (
            <label
              key={lang}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <input
                type="radio"
                name="language"
                value={lang}
                checked={selectedLanguage === lang}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-4 h-4 text-[#ffb3ba] focus:ring-[#ffb3ba] border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{lang}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Genre Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Genre</h3>
        <div className="space-y-2">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <input
                type="radio"
                name="genre"
                value={genre.id}
                checked={selectedGenre === genre.id}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-4 h-4 text-[#ffb3ba] focus:ring-[#ffb3ba] border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Filters;
