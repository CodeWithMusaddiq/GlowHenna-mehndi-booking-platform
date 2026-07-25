import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(location.state?.booking || null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (!booking) {
      navigate('/booking');
    }
  }, [booking, navigate]);

  const handlePayment = async () => {
    try {
      setProcessing(true);
      setError(null);

      const response = await api.post('/api/payment', {
        bookingId: booking._id,
      });

      setPayment(response.data.data);
      setSuccess(true);

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Payment failed. Please try again.'
      );
      console.error('Payment error:', err);
    } finally {
      setProcessing(false);
    }
  };

  if (!booking) {
    return null;
  }

  if (success && payment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4 animate-bounce">
                <svg
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Payment Successful! 🎉
              </h2>
              <p className="text-gray-600">
                Your payment has been processed successfully
              </p>
            </div>

            {/* Payment Details */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border-2 border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Payment Details
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono font-medium text-sm">
                    {payment.transactionId}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="font-medium">
                    {new Date(payment.paymentDate).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{payment.amount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                    {payment.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Booking Information
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Artist:</span>
                  <span className="font-medium">
                    {booking.artistId?.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Design:</span>
                  <span className="font-medium">
                    {booking.designId?.designName}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{booking.time}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium text-right max-w-xs">
                    {booking.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Print Receipt
              </button>
            </div>

            {/* Confirmation Message */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                📧 A confirmation email has been sent to your registered email address.
                The artist will contact you 24 hours before the appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Payment
          </h1>
          <p className="text-gray-600">
            Review your booking and proceed with payment
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Payment Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Booking Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Booking Summary
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Artist:</span>
                <span className="font-medium">{booking.artistId?.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Design:</span>
                <span className="font-medium">
                  {booking.designId?.designName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                  {booking.designId?.category}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">
                  {new Date(booking.bookingDate).toLocaleDateString()} at {booking.time}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-medium text-right max-w-xs">
                  {booking.address}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Number of People:</span>
                <span className="font-medium">{booking.numberOfPeople}</span>
              </div>

              <div className="pt-4 border-t border-gray-300 flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-3xl font-bold text-pink-600">
                  ₹{booking.totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Note */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              ℹ️ This is a demo payment. In production, this would integrate with
              a real payment gateway (Razorpay, Stripe, etc.)
            </p>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              `Pay ₹${booking.totalPrice}`
            )}
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => navigate('/booking')}
            className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;