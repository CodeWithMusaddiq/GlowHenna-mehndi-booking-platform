const Artist = require('../models/Artist');

// @desc    Create a new artist (Admin only)
// @route   POST /api/artists
// @access  Protected (Admin)
const createArtist = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    const { name, phone, location, designTypes, priceRange, sampleImages } = req.body;

    // Basic validation
    if (!name || !phone || !location || !designTypes || !priceRange) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Create artist
    const artist = await Artist.create({
      name,
      phone,
      location,
      designTypes,
      priceRange,
      sampleImages: sampleImages || [],
    });

    res.status(201).json({
      success: true,
      data: artist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all artists with optional filters
// @route   GET /api/artists
// @access  Public
const getAllArtists = async (req, res) => {
  try {
    const { location, designType } = req.query;
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 60, 1), 100);

    // Build filter object
    let filter = {};

    if (location) {
      filter.location = { $regex: location, $options: 'i' }; // Case-insensitive search
    }

    if (designType) {
      filter.designTypes = designType;
    }

    const total = await Artist.countDocuments(filter);
    const artists = await Artist.find(filter)
      .sort({ rating: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: total,
      page,
      limit,
      data: artists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single artist by ID
// @route   GET /api/artists/:id
// @access  Public
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    res.status(200).json({
      success: true,
      data: artist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update artist (Admin only)
// @route   PUT /api/artists/:id
// @access  Protected (Admin)
const updateArtist = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedArtist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete artist (Admin only)
// @route   DELETE /api/artists/:id
// @access  Protected (Admin)
const deleteArtist = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    await Artist.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Artist deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};