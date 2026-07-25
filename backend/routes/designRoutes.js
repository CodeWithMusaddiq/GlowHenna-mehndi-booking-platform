const express = require('express');
const {
  createDesign,
  getAllDesigns,
  getDesignsByCategory,
  getDesignById,
  updateDesign,
  deleteDesign,
} = require('../controllers/designController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllDesigns);
router.get('/category/:type', getDesignsByCategory);
router.get('/:id', getDesignById);

// Protected routes (Admin only - role check happens in controller)
router.post('/', protect, createDesign);
router.put('/:id', protect, updateDesign);
router.delete('/:id', protect, deleteDesign);

module.exports = router;