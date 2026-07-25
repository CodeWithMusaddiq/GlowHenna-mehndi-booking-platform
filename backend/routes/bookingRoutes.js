const express = require('express');
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All booking routes are protected
router.post('/', protect, createBooking);
router.get('/', protect, getAllBookings);
router.get('/user', protect, getUserBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, updateBookingStatus);

module.exports = router;