const Booking = require('../models/Booking');
const Artist = require('../models/Artist');
const Design = require('../models/Design');
const ApiError = require('../middleware/apiError');
const priceCalculator = require('../utils/priceCalculator');
const festivalChecker = require('../utils/festivalChecker');

const createBooking = async (req, res, next) => {
  try {
    const { artistId, designId, bookingDate, time, address, numberOfPeople, occasion } = req.body;
    const date = new Date(`${bookingDate}T00:00:00.000Z`);

    const [artist, design] = await Promise.all([
      Artist.findById(artistId),
      Design.findById(designId),
    ]);

    if (!artist) {
      throw new ApiError(404, 'Artist not found', 'NOT_FOUND');
    }
    if (!design) {
      throw new ApiError(404, 'Design not found', 'NOT_FOUND');
    }

    const existingBooking = await Booking.findOne({
      artistId,
      bookingDate: date,
      time,
      bookingStatus: { $ne: 'cancelled' },
    });
    if (existingBooking) {
      throw new ApiError(
        409,
        'Artist is already booked for this date and time',
        'BOOKING_SLOT_TAKEN'
      );
    }

    const totalPrice = priceCalculator({
      designBasePrice: design.basePrice,
      occasion,
      numberOfHands: numberOfPeople,
      isFestival: festivalChecker(date),
    });

    const booking = await Booking.create({
      userId: req.user._id,
      artistId,
      designId,
      bookingDate: date,
      time,
      address,
      numberOfPeople,
      totalPrice,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('userId', 'fullName email')
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category basePrice');

    res.status(201).json({ success: true, data: populatedBooking });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.artistId) {
      return next(new ApiError(
        409,
        'Artist is already booked for this date and time',
        'BOOKING_SLOT_TAKEN'
      ));
    }
    next(error);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category imageURL')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'fullName email')
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category basePrice imageURL');

    if (!booking) {
      throw new ApiError(404, 'Booking not found', 'NOT_FOUND');
    }
    if (booking.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Not authorized to view this booking', 'FORBIDDEN');
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      throw new ApiError(404, 'Booking not found', 'NOT_FOUND');
    }
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Not authorized to update this booking', 'FORBIDDEN');
    }

    booking.bookingStatus = req.body.bookingStatus;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category');
    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.artistId) {
      return next(new ApiError(
        409,
        'Artist is already booked for this date and time',
        'BOOKING_SLOT_TAKEN'
      ));
    }
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'fullName email')
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings,
};
