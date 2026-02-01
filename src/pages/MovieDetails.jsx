import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl } from '../services/movieApi';
import { useAuth } from '../context/AuthContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(id);
        if (data) {
          setMovie(data);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  const handleBookTickets = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/book-tickets/${id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffb3ba] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error || 'Movie not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#ffb3ba] text-white rounded-lg hover:bg-[#ff9ba3] transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE – CONTENT */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
              </span>
              <span>•</span>
              <span>{movie.vote_count?.toLocaleString() || 0} votes</span>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {movie.overview || 'No overview available.'}
            </p>
          </div>

          {/* DETAILS */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Movie Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{formatRuntime(movie.runtime)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Release Date</p>
                <p className="font-medium">{formatDate(movie.release_date)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Genre</p>
                <p className="font-medium">
                  {movie.genres?.map(g => g.name).join(', ') || 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Language</p>
                <p className="font-medium">
                  {movie.spoken_languages?.map(l => l.name).join(', ') ||
                    movie.original_language?.toUpperCase() ||
                    'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – POSTER + BUTTON */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg mb-6"
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/500x750?text=No+Image';
              }}
            />

            <button
              onClick={handleBookTickets}
              className="w-full py-3 bg-[#e50914] text-white rounded-lg font-semibold hover:bg-[#ff6b6b] transition-colors text-lg"
            >
              Book Tickets
            </button>

            {!isAuthenticated && (
              <p className="text-sm text-gray-500 text-center mt-3">
                Please login to book tickets
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  </div>
);

};

export default MovieDetails;
