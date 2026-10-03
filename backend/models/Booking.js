const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: [true, 'Artist ID is required'],
    },
    designId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Design',
      required: [true, 'Design ID is required'],
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking date is required'],
    },
    time: {
      type: String,
      required: [true, 'Booking time is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    numberOfPeople: {
      type: Number,
      required: [true, 'Number of people is required'],
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: 0,
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index(
  { artistId: 1, bookingDate: 1, time: 1 },
  {
    unique: true,
    partialFilterExpression: {
      bookingStatus: { $in: ['pending', 'confirmed'] },
    },
    name: 'unique_active_artist_booking_slot',
  }
);
// Supports the user's booking history, which is sorted newest first.
bookingSchema.index({ userId: 1, createdAt: -1 });
// Supports the admin booking list sorted newest first.
bookingSchema.index({ createdAt: -1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;