const express = require('express');
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const validateRequest = require('../middleware/validateRequest');
const { bookingLimiter } = require('../middleware/rateLimiters');
const {
  bookingBody,
  bookingStatusBody,
  idParams,
} = require('../validators/requestSchemas');

const router = express.Router();

router.post('/', protect, bookingLimiter, validateRequest(bookingBody, 'body'), createBooking);
router.get('/', protect, requireRole('admin'), getAllBookings);
router.get('/user', protect, getUserBookings);
router.get('/:id', protect, validateRequest(idParams, 'params'), getBookingById);
router.put(
  '/:id',
  protect,
  validateRequest(idParams, 'params'),
  validateRequest(bookingStatusBody, 'body'),
  updateBookingStatus
);

module.exports = router;