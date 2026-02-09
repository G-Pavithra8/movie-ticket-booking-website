import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import { BookingProvider } from './context/BookingContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import BookTickets from './pages/BookTickets';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Help from './pages/Help';
import Login from './pages/Login';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Signup from './pages/Signup';
import './styles/theme.css';
import './styles/layout.css';
import ChatBot from './components/ChatBot';



import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <AuthProvider>
      <MovieProvider>
        <BookingProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Header onSidebarToggle={toggleSidebar} />
              <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
              <main className="flex-1 pt-28 md:pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                  <Route path="/book-tickets/:id" element={<BookTickets />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  

                </Routes>
              </main>
              <ChatBot />
              <Footer />
            </div>
          </Router>
        </BookingProvider>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
