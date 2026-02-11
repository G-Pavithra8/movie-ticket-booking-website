// OMDb API Configuration
const API_KEY = process.env.REACT_APP_OMDB_API_KEY || '7806e5b0';
const BASE_URL = 'https://www.omdbapi.com';



export const getImageUrl = (poster) => {
  if (!poster || poster === 'N/A') {
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return poster;
};

export const getGenreName = (genre) => {
  return genre || 'Unknown';
};

// Convert OMDb movie to our format
const convertOMDbMovie = (omdbMovie) => {
  const genres = omdbMovie.Genre ? omdbMovie.Genre.split(',').map(g => g.trim()) : [];
  const languages = omdbMovie.Language ? omdbMovie.Language.split(',').map(l => l.trim()) : [];
  
  return {
    id: omdbMovie.imdbID,
    title: omdbMovie.Title,
    poster_path: omdbMovie.Poster,
    backdrop_path: omdbMovie.Poster,
    overview: omdbMovie.Plot || 'No description available.',
    vote_average: parseFloat(omdbMovie.imdbRating) || 0,
    vote_count: parseInt(omdbMovie.imdbVotes?.replace(/,/g, '')) || 0,
    original_language: languages[0] || omdbMovie.Language?.split(',')[0]?.trim() || 'English',
    genre_ids: genres, // Array of genre strings
    genres: genres.map(genre => ({ name: genre })),
    spoken_languages: languages.map(lang => ({ name: lang })),
    runtime: parseInt(omdbMovie.Runtime?.replace(' min', '')) || 0,
    release_date: omdbMovie.Released || omdbMovie.Year,
    year: omdbMovie.Year,
    director: omdbMovie.Director,
    actors: omdbMovie.Actors,
    imdbID: omdbMovie.imdbID,
  };
};

// Fetch popular movies (using search with popular terms)
export const fetchMovies = async () => {
  try {
    // Search for popular movies
    const searchTerms = [
      'movie',
      'action',
      'drama',
      'comedy',
      'thriller',
      '2023',
      '2024',
      'bollywood',
      'tamil',
      'telugu',
    ];

    const searchPromises = searchTerms.slice(0, 3).map(term =>
      fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(term)}&type=movie&page=1`)
        .then(res => res.json())
        .then(data => data.Search || [])
        .catch(() => [])
    );

    const results = await Promise.all(searchPromises);
    const allMovies = results.flat();

    // Remove duplicates by imdbID
    const uniqueMovies = Array.from(
      new Map(allMovies.map(movie => [movie.imdbID, movie])).values()
    );

    // Fetch detailed info for each movie
    const moviesWithDetails = await Promise.all(
      uniqueMovies.slice(0, 20).map(async (movie) => {
        try {
          const detailResponse = await fetch(
            `${BASE_URL}/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`
          );
          const details = await detailResponse.json();
          if (details.Response === 'True') {
            return convertOMDbMovie(details);
          }
          return convertOMDbMovie(movie);
        } catch (err) {
          console.error('Error fetching movie details:', err);
          return convertOMDbMovie(movie);
        }
      })
    );

    return moviesWithDetails.filter(movie => movie.title);
  } catch (error) {
    console.error('Error fetching movies:', error);
    // Return mock data if API fails
    return getMockMovies();
  }
};

// Search movies
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );
    const data = await response.json();

    if (data.Response === 'False' || !data.Search) {
      return [];
    }

    // Fetch details for each result
    const moviesWithDetails = await Promise.all(
      data.Search.slice(0, 20).map(async (movie) => {
        try {
          const detailResponse = await fetch(
            `${BASE_URL}/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`
          );
          const details = await detailResponse.json();
          if (details.Response === 'True') {
            return convertOMDbMovie(details);
          }
          return convertOMDbMovie(movie);
        } catch (err) {
          console.error('Error fetching movie details:', err);
          return convertOMDbMovie(movie);
        }
      })
    );

    return moviesWithDetails.filter(movie => movie.title);
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// Fetch movie details by ID (IMDb ID)
export const fetchMovieDetails = async (movieId) => {
  try {
    const url = `${BASE_URL}/?apikey=${API_KEY}&i=${movieId}&plot=full`;
    console.log('Fetching movie details from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('OMDb API response:', data);
    
    if (data.Response === 'True') {
      return convertOMDbMovie(data);
    } else {
      console.error('OMDb API error:', data.Error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    // Return a fallback movie object if API fails
    return {
      id: movieId,
      title: 'Movie',
      overview: 'Movie details are currently unavailable.',
      poster_path: 'https://via.placeholder.com/500x750?text=No+Image',
      backdrop_path: 'https://via.placeholder.com/500x750?text=No+Image',
      vote_average: 0,
      vote_count: 0,
      original_language: 'English',
      genre_ids: [],
      genres: [],
      spoken_languages: [{ name: 'English' }],
      runtime: 0,
      release_date: new Date().toISOString().split('T')[0],
    };
  }
};

// Mock data fallback
const getMockMovies = () => {
  return [
    {
      id: 'tt4849438',
      title: 'Baahubali 2: The Conclusion',
      poster_path: 'https://m.media-amazon.com/images/M/MV5BYmJhZmJlYTItZmZlNy00MGY0LTg0ZGMtNWFkYWU5NTA2YTNhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
      backdrop_path: 'https://m.media-amazon.com/images/M/MV5BYmJhZmJlYTItZmZlNy00MGY0LTg0ZGMtNWFkYWU5NTA2YTNhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
      overview: 'When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers.',
      vote_average: 8.2,
      vote_count: 15000,
      original_language: 'Telugu',
      genre_ids: ['Action', 'Drama'],
      genres: [{ name: 'Action' }, { name: 'Drama' }],
      spoken_languages: [{ name: 'Telugu' }, { name: 'Tamil' }],
      runtime: 167,
      release_date: '2017-04-28',
    },
    {
      id: 'tt8178634',
      title: 'RRR',
      poster_path: 'https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyNjEtNDg1ODg2ZGEzMWE1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      backdrop_path: 'https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyNjEtNDg1ODg2ZGEzMWE1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      overview: 'A fictional story about two legendary revolutionaries and their journey away from home.',
      vote_average: 8.0,
      vote_count: 12000,
      original_language: 'Telugu',
      genre_ids: ['Action', 'Drama'],
      genres: [{ name: 'Action' }, { name: 'Drama' }],
      spoken_languages: [{ name: 'Telugu' }, { name: 'Tamil' }],
      runtime: 187,
      release_date: '2022-03-25',
    },
    {
      id: 'tt15398776',
      title: 'Jawan',
      poster_path: 'https://m.media-amazon.com/images/M/MV5BNzZmOTU4NGQtY2E4NC00OGQ5LWE1M2YtMDQ2NzE1ZDYxNDJiXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg',
      backdrop_path: 'https://m.media-amazon.com/images/M/MV5BNzZmOTU4NGQtY2E4NC00OGQ5LWE1M2YtMDQ2NzE1ZDYxNDJiXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg',
      overview: 'A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society.',
      vote_average: 7.8,
      vote_count: 10000,
      original_language: 'Hindi',
      genre_ids: ['Action', 'Thriller'],
      genres: [{ name: 'Action' }, { name: 'Thriller' }],
      spoken_languages: [{ name: 'Hindi' }],
      runtime: 169,
      release_date: '2023-09-07',
    },
  ];
};
