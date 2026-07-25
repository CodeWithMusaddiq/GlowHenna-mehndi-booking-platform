const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    designTypes: {
      type: [String],
      enum: ['Basic', 'Bridal', 'Arabic', 'Festival', 'Floral'],
      required: [true, 'At least one design type is required'],
    },
    priceRange: {
      min: {
        type: Number,
        required: [true, 'Minimum price is required'],
      },
      max: {
        type: Number,
        required: [true, 'Maximum price is required'],
      },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    sampleImages: {
      type: [String],
      default: [],
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;