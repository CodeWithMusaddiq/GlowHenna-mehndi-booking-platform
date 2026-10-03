const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const ApiError = require('../middleware/apiError');

const createPayment = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new ApiError(404, 'Booking not found', 'NOT_FOUND');
    }
    if (booking.userId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized to make payment for this booking', 'FORBIDDEN');
    }

    const existingPayment = await Payment.findOne({ bookingId });
    if (existingPayment) {
      throw new ApiError(409, 'Payment already exists for this booking', 'PAYMENT_ALREADY_EXISTS');
    }

    const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const payment = await Payment.create({
      bookingId,
      amount: booking.totalPrice,
      transactionId,
      paymentStatus: 'paid',
      paymentDate: new Date(),
    });

    booking.paymentStatus = 'paid';
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
      data: payment,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.bookingId) {
      return next(new ApiError(409, 'Payment already exists for this booking', 'PAYMENT_ALREADY_EXISTS'));
    }
    next(error);
  }
};

const getPaymentByBookingId = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({ bookingId: req.params.bookingId })
      .populate('bookingId', 'userId bookingDate time totalPrice bookingStatus paymentStatus');

    if (!payment) {
      throw new ApiError(404, 'Payment not found for this booking', 'NOT_FOUND');
    }
    if (
      payment.bookingId.userId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      throw new ApiError(403, 'Not authorized to view this payment', 'FORBIDDEN');
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

const getAllPayments = async (req, res, next) => {
  try {
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

    res.status(200).json({ success: true, count: payments.length, data: payments });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPayment, getPaymentByBookingId, getAllPayments };
