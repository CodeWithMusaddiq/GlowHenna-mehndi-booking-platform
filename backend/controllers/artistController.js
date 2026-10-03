const Artist = require('../models/Artist');
const ApiError = require('../middleware/apiError');

const createArtist = async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
};

const getAllArtists = async (req, res, next) => {
  try {
    const { location, designType } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 60;
    const filter = {};

    if (location) {
      const escapedLocation = location.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.location = { $regex: escapedLocation, $options: 'i' };
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
    next(error);
  }
};

const getArtistById = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      throw new ApiError(404, 'Artist not found', 'NOT_FOUND');
    }
    res.status(200).json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
};

const updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!artist) {
      throw new ApiError(404, 'Artist not found', 'NOT_FOUND');
    }
    res.status(200).json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
};

const deleteArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      throw new ApiError(404, 'Artist not found', 'NOT_FOUND');
    }
    res.status(200).json({ success: true, message: 'Artist deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};
