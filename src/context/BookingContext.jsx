import React, { createContext, useState, useContext, useCallback } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    movie: null,
    showtime: null,
    date: null,
    seats: [],
    totalAmount: 0,
    paymentMethod: null,
    paymentDetails: null,
  });

  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const updateBooking = useCallback((data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  }, []);

  const calculateTotal = useCallback((seats, pricePerSeat = 300) => {
    return seats.length * pricePerSeat;
  }, []);

  const resetBooking = () => {
    setBookingData({
      movie: null,
      showtime: null,
      date: null,
      seats: [],
      totalAmount: 0,
      paymentMethod: null,
      paymentDetails: null,
    });
    setIsBookingComplete(false);
  };

  const completeBooking = () => {
    setIsBookingComplete(true);
    // Save to localStorage for orders page
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now().toString(),
      ...bookingData,
      bookingDate: new Date().toISOString(),
      status: 'Completed',
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        updateBooking,
        calculateTotal,
        resetBooking,
        completeBooking,
        isBookingComplete,
        setIsBookingComplete,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
