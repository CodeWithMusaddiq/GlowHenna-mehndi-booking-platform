const Design = require('../models/Design');
const ApiError = require('../middleware/apiError');

const createDesign = async (req, res, next) => {
  try {
    const design = await Design.create(req.body);
    res.status(201).json({ success: true, data: design });
  } catch (error) {
    next(error);
  }
};

const getAllDesigns = async (req, res, next) => {
  try {
    const { category, handSize } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (handSize) filter.suitableHandSize = handSize;

    const designs = await Design.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: designs.length, data: designs });
  } catch (error) {
    next(error);
  }
};

const getDesignsByCategory = async (req, res, next) => {
  try {
    const validCategories = ['Basic', 'Bridal', 'Arabic', 'Festival', 'Floral'];
    if (!validCategories.includes(req.params.type)) {
      throw new ApiError(400, 'Invalid design category', 'VALIDATION_ERROR');
    }

    const designs = await Design.find({ category: req.params.type }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: designs.length, data: designs });
  } catch (error) {
    next(error);
  }
};

const getDesignById = async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      throw new ApiError(404, 'Design not found', 'NOT_FOUND');
    }
    res.status(200).json({ success: true, data: design });
  } catch (error) {
    next(error);
  }
};

const updateDesign = async (req, res, next) => {
  try {
    const design = await Design.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!design) {
      throw new ApiError(404, 'Design not found', 'NOT_FOUND');
    }
    res.status(200).json({ success: true, data: design });
  } catch (error) {
    next(error);
  }
};

const deleteDesign = async (req, res, next) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) {
      throw new ApiError(404, 'Design not found', 'NOT_FOUND');
    }
    res.status(200).json({ success: true, message: 'Design deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDesign,
  getAllDesigns,
  getDesignsByCategory,
  getDesignById,
  updateDesign,
  deleteDesign,
};
