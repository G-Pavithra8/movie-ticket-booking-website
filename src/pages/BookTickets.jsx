import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl } from '../services/movieApi';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

const BookTickets = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { bookingData, updateBooking, calculateTotal } = useBooking();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState('');

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtimes, setShowtimes] = useState(['10:00 AM', '1:30 PM', '4:00 PM', '7:00 PM', '10:30 PM']);

  // Generate dates for next 7 days
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      });
    }
    return dates;
  };
const theatres = [
  'INOX Cinemas',
  'PVR Cinemas',
  'AGS Cinemas',
  'SPI Sathyam',
  'Rohini Silver Screens',
  'Sathyam Cinemas',
  'Escape Cinemas',
  'Mayajaal Cinemas',
  'Ega Cinemas',
  'S2 Cinemas',
];


  // Seat layout (10 rows, 12 seats per row)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 12;
  const [seatLayout, setSeatLayout] = useState(() => {
    // Initialize seat layout (some seats are already booked)
    const layout = {};
    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        // Randomly mark some seats as booked (for demo)
        layout[seatId] = {
          id: seatId,
          row: row,
          number: i,
          isBooked: Math.random() > 0.85,
          isSelected: false,
        };
      }
    });
    return layout;
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // If movie is already in booking data, use it
    if (bookingData.movie && bookingData.movie.id === id) {
      setMovie(bookingData.movie);
      setLoading(false);
      return;
    }

    const loadMovie = async () => {
      setLoading(true);
      try {
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );
        
        const dataPromise = fetchMovieDetails(id);
        const data = await Promise.race([dataPromise, timeoutPromise]);
        
        if (data) {
          setMovie(data);
          updateBooking({ movie: data });
        } else {
          console.error('Movie not found');
          alert('Movie not found. Redirecting to home...');
          navigate('/');
        }
      } catch (err) {
        console.error('Error loading movie:', err);
        alert('Failed to load movie details. Please try again.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate, isAuthenticated]);

  const handleSeatClick = (seatId) => {
    const seat = seatLayout[seatId];
    if (seat.isBooked) return;

    setSeatLayout((prev) => ({
      ...prev,
      [seatId]: {
        ...prev[seatId],
        isSelected: !prev[seatId].isSelected,
      },
    }));

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const handleProceedToPayment = () => {
    if (!selectedDate || !selectedShowtime || selectedSeats.length === 0) {
      alert('Please select date, showtime, and at least one seat');
      return;
    }

    const totalAmount = calculateTotal(selectedSeats);
  updateBooking({
  date: selectedDate,
  theatre: selectedTheatre,
  showtime: selectedShowtime,
  seats: selectedSeats,
  totalAmount,
});


    navigate('/payment');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffb3ba] mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">Loading movie details...</p>
          <p className="text-sm text-gray-500">Please wait</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const availableDates = getAvailableDates();
  const totalAmount = calculateTotal(selectedSeats);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Movie Info Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-32 h-48 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
              }}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{movie.title}</h1>
              <p className="text-gray-600 mb-4">{movie.overview}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>Duration: {movie.runtime} min</span>
                <span>Language: {movie.spoken_languages?.[0]?.name || movie.original_language}</span>
                <span>Rating: ⭐ {movie.vote_average?.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Date, Time, Seats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Date</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedDate === date.value
                        ? 'border-[#e50914] bg-[#ffdfd3] text-[#ff9ba3]'
                        : 'border-gray-200 hover:border-[#e50914]'
                    }`}
                  >
                    <div className="text-sm font-medium">{date.label}</div>
                  </button>
                ))}
              </div>
            </div>
{/* Theatre Selection */}
{selectedDate && (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      Select Theatre
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {theatres.map((theatre) => (
        <button
          key={theatre}
          onClick={() => setSelectedTheatre(theatre)}
          className={`p-3 rounded-lg border-2 transition-colors text-left ${
            selectedTheatre === theatre
              ? 'border-[#e50914] bg-[#ffdfd3] text-[#e50914]'
              : 'border-gray-200 hover:border-[#e50914]'
          }`}
        >
          {theatre}
        </button>
      ))}
    </div>
  </div>
)}
            {/* Showtime Selection */}
            {selectedDate && selectedTheatre && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Showtime</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {showtimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedShowtime(time)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        selectedShowtime === time
                          ? 'border-[#e50914] bg-[#ffdfd3] text-[#ff9ba3]'
                          : 'border-gray-200 hover:border-[#e50914]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Seat Selection */}
            {selectedShowtime && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Seats</h2>
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-8 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#e50914] rounded"></div>
                      <span className="text-sm text-gray-600">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-400 rounded"></div>
                      <span className="text-sm text-gray-600">Booked</span>
                    </div>
                  </div>
                </div>

                {/* Screen */}
                <div className="text-center mb-6">
                  <div className="inline-block bg-gray-800 text-white px-8 py-2 rounded-t-lg">
                    SCREEN
                  </div>
                </div>

                {/* Seat Layout */}
                <div className="space-y-2 mb-4">
                  {rows.map((row) => (
                    <div key={row} className="flex items-center justify-center gap-1">
                      <span className="w-6 text-sm font-medium text-gray-600">{row}</span>
                      {Array.from({ length: seatsPerRow }, (_, i) => {
                        const seatId = `${row}${i + 1}`;
                        const seat = seatLayout[seatId];
                        return (
                          <button
                            key={seatId}
                            onClick={() => handleSeatClick(seatId)}
                            disabled={seat.isBooked}
                            className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                              seat.isBooked
                                ? 'bg-gray-400 cursor-not-allowed'
                                : seat.isSelected
                                ? 'bg-[#e50914] text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h2>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Movie</p>
                  <p className="font-medium text-gray-800">{movie.title}</p>
                </div>
                {selectedDate && (
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
                {selectedShowtime && (
                  <div>
                    <p className="text-sm text-gray-600">Showtime</p>
                    <p className="font-medium text-gray-800">{selectedShowtime}</p>
                  </div>
                )}
                {selectedSeats.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-medium text-gray-800">
                      {selectedSeats.sort().join(', ')}
                    </p>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Seats ({selectedSeats.length})</span>
                    <span className="text-gray-800">₹{selectedSeats.length * 300}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-[#e50914]">₹{totalAmount}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleProceedToPayment}
                disabled={!selectedDate || !selectedTheatre || !selectedShowtime || selectedSeats.length === 0}
                className="w-full py-3 bg-[#e50914] text-white rounded-lg font-semibold hover:bg-[#ff9ba3] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTickets;
