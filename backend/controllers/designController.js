const Design = require('../models/Design');

// @desc    Create a new design (Admin only)
// @route   POST /api/designs
// @access  Protected (Admin)
const createDesign = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    const { designName, category, imageURL, suitableHandSize, basePrice } = req.body;

    // Basic validation
    if (!designName || !category || !imageURL || !suitableHandSize || !basePrice) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Create design
    const design = await Design.create({
      designName,
      category,
      imageURL,
      suitableHandSize,
      basePrice,
    });

    res.status(201).json({
      success: true,
      data: design,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all designs with optional filters
// @route   GET /api/designs
// @access  Public
const getAllDesigns = async (req, res) => {
  try {
    const { category, handSize } = req.query;

    // Build filter object
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (handSize) {
      filter.suitableHandSize = handSize;
    }

    const designs = await Design.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: designs.length,
      data: designs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get designs by category
// @route   GET /api/designs/category/:type
// @access  Public
const getDesignsByCategory = async (req, res) => {
  try {
    const { type } = req.params;

    // Validate category
    const validCategories = ['Basic', 'Bridal', 'Arabic', 'Festival', 'Floral'];
    if (!validCategories.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Must be: Basic, Bridal, Arabic, Festival, or Floral',
      });
    }

    const designs = await Design.find({ category: type }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: designs.length,
      data: designs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single design by ID
// @route   GET /api/designs/:id
// @access  Public
const getDesignById = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found',
      });
    }

    res.status(200).json({
      success: true,
      data: design,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update design (Admin only)
// @route   PUT /api/designs/:id
// @access  Protected (Admin)
const updateDesign = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found',
      });
    }

    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedDesign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete design (Admin only)
// @route   DELETE /api/designs/:id
// @access  Protected (Admin)
const deleteDesign = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found',
      });
    }

    await Design.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Design deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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