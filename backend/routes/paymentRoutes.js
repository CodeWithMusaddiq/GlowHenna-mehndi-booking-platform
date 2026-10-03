const express = require('express');
const {
  createPayment,
  getPaymentByBookingId,
  getAllPayments,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const validateRequest = require('../middleware/validateRequest');
const { bookingLimiter } = require('../middleware/rateLimiters');
const { paymentBody, bookingIdParams } = require('../validators/requestSchemas');

const router = express.Router();

router.post('/', protect, bookingLimiter, validateRequest(paymentBody, 'body'), createPayment);
router.get('/', protect, requireRole('admin'), getAllPayments);
router.get('/:bookingId', protect, validateRequest(bookingIdParams, 'params'), getPaymentByBookingId);

module.exports = router;