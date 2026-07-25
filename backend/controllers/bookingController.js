const Booking = require('../models/Booking');
const Artist = require('../models/Artist');
const Design = require('../models/Design');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Protected
const createBooking = async (req, res) => {
  try {
    const { artistId, designId, bookingDate, time, address, numberOfPeople } = req.body;

    // Basic validation
    if (!artistId || !designId || !bookingDate || !time || !address || !numberOfPeople) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if artist exists
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    // Check if design exists
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found',
      });
    }

    // Check for double booking (same artist, same date, same time)
    const existingBooking = await Booking.findOne({
      artistId,
      bookingDate: new Date(bookingDate),
      time,
      bookingStatus: { $ne: 'cancelled' }, // Don't count cancelled bookings
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Artist is already booked for this date and time',
      });
    }

    // Calculate total price using the price calculator
    const priceCalculator = require('../utils/priceCalculator');
    const festivalChecker = require('../utils/festivalChecker');

    const isFestival = festivalChecker(new Date(bookingDate));
    const totalPrice = priceCalculator({
      designBasePrice: design.basePrice,
      occasion: req.body.occasion || 'normal',
      numberOfHands: numberOfPeople,
      isFestival,
    });

    // Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      artistId,
      designId,
      bookingDate: new Date(bookingDate),
      time,
      address,
      numberOfPeople,
      totalPrice,
    });

    // Populate booking details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('userId', 'fullName email')
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category basePrice');

    res.status(201).json({
      success: true,
      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all bookings for logged-in user
// @route   GET /api/bookings/user
// @access  Protected
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category imageURL')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Protected
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'fullName email')
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category basePrice imageURL');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if booking belongs to logged-in user (or user is admin)
    if (booking.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Protected
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if booking belongs to logged-in user (or user is admin)
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking',
      });
    }

    // Validate booking status
    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (bookingStatus && !validStatuses.includes(bookingStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking status',
      });
    }

    // Update booking
    booking.bookingStatus = bookingStatus || booking.bookingStatus;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category');

    res.status(200).json({
      success: true,
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Protected (Admin)
const getAllBookings = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    const bookings = await Booking.find()
      .populate('userId', 'fullName email')
      .populate('artistId', 'name phone location')
      .populate('designId', 'designName category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings,
};