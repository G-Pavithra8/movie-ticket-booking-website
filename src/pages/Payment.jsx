import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import SuccessModal from '../components/SuccessModal';

const Payment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookingData, updateBooking, completeBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // UPI details
    upiId: '',
    // Card details
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    // PhonePay/GPay
    phoneNumber: '',
    // COD - no additional fields needed
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    if (paymentMethod === 'UPI' || paymentMethod === 'GPay' || paymentMethod === 'PhonePay') {
      if (paymentMethod === 'UPI' && !formData.upiId) {
        newErrors.upiId = 'UPI ID is required';
      } else if (paymentMethod === 'GPay' || paymentMethod === 'PhonePay') {
        if (!formData.phoneNumber) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
        }
      }
    }

    if (paymentMethod === 'Card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!formData.cardName) {
        newErrors.cardName = 'Cardholder name is required';
      }
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter in MM/YY format';
      }
      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    // Add spaces every 4 digits
    value = value.match(/.{1,4}/g)?.join(' ') || value;
    setFormData((prev) => ({ ...prev, cardNumber: value }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setFormData((prev) => ({ ...prev, expiryDate: value }));
  };

  const handleCVVChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setFormData((prev) => ({ ...prev, cvv: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    updateBooking({
  paymentMethod,
  paymentDetails: formData,
  userEmail: user.email,     // ⭐ FOR USER EMIAL ASSOCIATION
});


    completeBooking();
    setShowSuccess(true);
  };

  if (!bookingData.movie || bookingData.seats.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No booking data found</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#e50914] text-white rounded-lg hover:bg-[#ff9ba3] transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
              <div className="space-y-3 mb-6">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="GPay"
                    checked={paymentMethod === 'GPay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#ffb3ba] focus:ring-[#ffb3ba]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-gray-800">Google Pay</div>
                    <div className="text-sm text-gray-600">Pay using your Google Pay account</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="PhonePay"
                    checked={paymentMethod === 'PhonePay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#ffb3ba] focus:ring-[#ffb3ba]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-gray-800">PhonePe</div>
                    <div className="text-sm text-gray-600">Pay using your PhonePe account</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#e50914] focus:ring-[#e50914]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-gray-800">UPI</div>
                    <div className="text-sm text-gray-600">Pay using any UPI app</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#e50914] focus:ring-[#e50914]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-gray-800">Debit/Credit Card</div>
                    <div className="text-sm text-gray-600">Pay using your card</div>
                  </div>
                </label>

          
              </div>
              {errors.paymentMethod && (
                <p className="text-red-600 text-sm mt-2">{errors.paymentMethod}</p>
              )}
            </div>

            {/* Payment Details Form */}
            {paymentMethod && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {(paymentMethod === 'GPay' || paymentMethod === 'PhonePay') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914] ${
                          errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>
                  )}

                  {paymentMethod === 'UPI' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="yourname@upi"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914] ${
                          errors.upiId ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.upiId && (
                        <p className="text-red-600 text-sm mt-1">{errors.upiId}</p>
                      )}
                    </div>
                  )}

                  {paymentMethod === 'Card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914] ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914] ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cardName && (
                          <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914] ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.expiryDate && (
                            <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleCVVChange}
                            placeholder="123"
                            maxLength="4"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914] ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.cvv && (
                            <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === 'COD' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        You will pay cash at the theater counter. Please arrive 15 minutes before
                        the showtime.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#e50914] text-white rounded-lg font-semibold hover:bg-[#ff9ba3] transition-colors"
                  >
                    Complete Payment
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h2>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Movie</p>
                  <p className="font-medium text-gray-800">{bookingData.movie.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-800">
                    {new Date(bookingData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Showtime</p>
                  <p className="font-medium text-gray-800">{bookingData.showtime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seats</p>
                  <p className="font-medium text-gray-800">
                    {bookingData.seats.sort().join(', ')}
                  </p>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-[#e50914]">₹{bookingData.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <SuccessModal
          onClose={() => {
            setShowSuccess(false);
            navigate('/orders');
          }}
        />
      )}
    </div>
  );
};

export default Payment;
