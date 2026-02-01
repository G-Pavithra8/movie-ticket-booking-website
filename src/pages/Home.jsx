import React from 'react';
import Filters from '../components/Filters';
import MovieCard from '../components/MovieCard';
import { useMovies } from '../context/MovieContext';

const Home = () => {
  const { movies, loading, error } = useMovies();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffb3ba] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Filters */}
        <div className="w-full lg:w-1/4">
          <Filters />
        </div>

        {/* Right Section - Movies Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Now Showing
            </h1>
            <p className="text-gray-600">
              {movies.length} {movies.length === 1 ? 'movie' : 'movies'} available
            </p>
          </div>

          {movies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-2">No movies found</p>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
