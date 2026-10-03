const mongoose = require('mongoose');

const designSchema = new mongoose.Schema(
  {
    designName: {
      type: String,
      required: [true, 'Design name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Basic', 'Bridal', 'Arabic', 'Festival', 'Floral'],
      required: [true, 'Design category is required'],
    },
    imageURL: {
      type: String,
      required: [true, 'Design image URL is required'],
    },
    suitableHandSize: {
      type: String,
      enum: ['small', 'medium', 'large'],
      required: [true, 'Suitable hand size is required'],
    },
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Supports the unfiltered list and each existing optional filter + createdAt sort.
designSchema.index({ createdAt: -1 });
designSchema.index({ category: 1, createdAt: -1 });
designSchema.index({ suitableHandSize: 1, createdAt: -1 });
designSchema.index({ category: 1, suitableHandSize: 1, createdAt: -1 });

const Design = mongoose.model('Design', designSchema);

module.exports = Design;