const express = require('express');
const {
  createPayment,
  getPaymentByBookingId,
  getAllPayments,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All payment routes are protected
router.post('/', protect, createPayment);
router.get('/', protect, getAllPayments);
router.get('/:bookingId', protect, getPaymentByBookingId);

module.exports = router;