const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// @desc    Create/Simulate payment for a booking
// @route   POST /api/payment
// @access  Protected
const createPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required',
      });
    }

    // Check if booking exists
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if booking belongs to logged-in user
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to make payment for this booking',
      });
    }

    // Check if payment already exists for this booking
    const existingPayment = await Payment.findOne({ bookingId });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: 'Payment already exists for this booking',
      });
    }

    // Generate a fake transaction ID (simulate payment gateway)
    const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 10000)}`;

    // Create payment
    const payment = await Payment.create({
      bookingId,
      amount: booking.totalPrice,
      transactionId,
      paymentStatus: 'paid', // Simulating successful payment
      paymentDate: new Date(),
    });

    // Update booking payment status
    booking.paymentStatus = 'paid';
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get payment details by booking ID
// @route   GET /api/payment/:bookingId
// @access  Protected
const getPaymentByBookingId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ bookingId: req.params.bookingId }).populate(
      'bookingId',
      'bookingDate time totalPrice bookingStatus paymentStatus'
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found for this booking',
      });
    }

    // Check if booking belongs to logged-in user (or user is admin)
    const booking = await Booking.findById(payment.bookingId._id);
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this payment',
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all payments (Admin only)
// @route   GET /api/payment
// @access  Protected (Admin)
const getAllPayments = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    const payments = await Payment.find()
      .populate({
        path: 'bookingId',
        populate: [
          { path: 'userId', select: 'fullName email' },
          { path: 'artistId', select: 'name phone' },
          { path: 'designId', select: 'designName category' },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPaymentByBookingId,
  getAllPayments,
};