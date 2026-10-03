const express = require('express');
const {
  createDesign,
  getAllDesigns,
  getDesignsByCategory,
  getDesignById,
  updateDesign,
  deleteDesign,
} = require('../controllers/designController');
const { getDesignSuggestions } = require('../controllers/suggestionController');
const { protect } = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const validateRequest = require('../middleware/validateRequest');
const { suggestionLimiter } = require('../middleware/rateLimiters');
const {
  designCreateBody,
  designUpdateBody,
  designListQuery,
  idParams,
  suggestionQuery,
} = require('../validators/requestSchemas');

const router = express.Router();

// Public routes
router.get('/', validateRequest(designListQuery, 'query'), getAllDesigns);
router.get('/category/:type', getDesignsByCategory);
router.get('/suggestions', suggestionLimiter, validateRequest(suggestionQuery, 'query'), getDesignSuggestions);
router.get('/:id', validateRequest(idParams, 'params'), getDesignById);

router.post('/', protect, requireRole('admin'), validateRequest(designCreateBody, 'body'), createDesign);
router.put(
  '/:id',
  protect,
  requireRole('admin'),
  validateRequest(idParams, 'params'),
  validateRequest(designUpdateBody, 'body'),
  updateDesign
);
router.delete('/:id', protect, requireRole('admin'), validateRequest(idParams, 'params'), deleteDesign);

module.exports = router;